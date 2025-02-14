import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { ILocalVideoTrack } from "agora-rtc-sdk-ng";
import VideoCompositingExtension from "agora-extension-video-compositor";

export type LiveRoleOpt =  "host";
interface RTCInterface {
  client: IAgoraRTCClient |null;
};

export class LiveRepo {
    readonly appId: string = String(process.env.AGORA_APP_ID);
    readonly role: LiveRoleOpt = "host"
    private channel: string = "";
    private token: string = "";
    private uid: number = 0;
    private cornerImage?: string;
    private rtc: RTCInterface = {
      client: null
    };
    private track?: ILocalVideoTrack;
    private layer1Track?: ILocalVideoTrack;
    private handleTrackStopped?: () => void;
    private compositor?: any;
    

    setProfile(channel: string, token: string, uid: number) {
      this.channel = channel;
      this.token = token;
      this.uid = uid;
    }

    onTrackStopped(event: () => void) {
      this.handleTrackStopped = event;
    }
    
    async start(): Promise<void> {

      this.init()
      await this.joinAsHost()
      await this.publishOnlyScreen()
      // if(!this.cornerImage)
      //   await this.publishOnlyScreen()
      // else
      //   await this.publishCustomScreen()
      this.registerEvent()
    }
  
    init() {
      this.rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8", role: this.role });
    }

    async joinAsHost(): Promise<void> {
      if(!this.rtc.client) return;
      await this.rtc.client.join(this.appId, this.channel, this.token, this.uid);
      this.rtc.client.setClientRole(this.role);
      
      console.log("Host joined and published tracks.");
    }

    // Screensharing your computer
    async publishOnlyScreen(): Promise<void> {
      if(!this.rtc.client) return
      try {
          const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
          this.track = AgoraRTC.createCustomVideoTrack({
              mediaStreamTrack: screenStream.getVideoTracks()[0]
          });

          // Publish screen-sharing stream
          await this.rtc.client.publish(this.track);

          console.log("Screen sharing started");
      } catch (error) {
          console.error("Failed to start screen sharing:", error);
      }
    }

    registerEvent() {
        if(!this.track) return
        this.track.getMediaStreamTrack().addEventListener("ended", () => {
            console.log("Screen sharing has been stopped");
            if(this.handleTrackStopped) this.handleTrackStopped()
        });
    }

    async unpublish(): Promise<void> {
      if(!this.track) return;
      this.track.stop()
      this.track.close()
      if(this.cornerImage) this.unpublishCompositor()
      console.log("Screen-sharing stopped")
    }

    unpublishCompositor(): void {
      if(this.compositor) this.compositor?.unpipe()

      if(this.track) this.track.unpipe();

      if(!this.layer1Track) return;
      this.layer1Track?.unpipe()
      this.layer1Track?.stop()
      this.layer1Track?.close()
    } 

    async stop(): Promise<void> {
      if(!this.rtc.client) return
      await this.rtc.client.leave()
    }

    setCornerImage(image: string): void {
      this.cornerImage = image
    }

    async extendCompositor(): Promise<void> {
      const extension = new VideoCompositingExtension();
      AgoraRTC.registerExtensions([extension])
      this.compositor = extension.createProcessor()
      await this.compositor.enable()

    }

    storeCornerImage(image: string): void {
      this.setCornerImage(image)
      this.extendCompositor()
    }

    async createMedia(): Promise<MediaStreamTrack> {
      if(!this.compositor) throw new Error("Compositor is empty")
      if(!this.cornerImage) throw new Error("Image is empty")
        
      const screenTrack = await AgoraRTC.createScreenVideoTrack({
        encoderConfig: { frameRate: 15 },
      }, "enable")

      const canvas = document.createElement("canvas");
      canvas.getContext("2d");

      this.layer1Track = screenTrack[0]

      const screenEndpoint = this.compositor.createInputEndpoint({
        x: 0,
        y: 0,
        width: 1280,
        height: 720,
        fit: "cover",
      })

      this.compositor.addImage(this.cornerImage, {
          x: 960,
          y: 0,
          width: 320,
          height: 180,
          fit: "cover",
      });
      
      this.layer1Track.pipe(screenEndpoint).pipe(this.layer1Track.processorDestination)      
      const media = canvas.captureStream().getVideoTracks()[0] 

      return media;
    }

    async publishCustomScreen(): Promise<void> {
      if(!this.rtc.client) return
      if(!this.compositor) throw new Error("Compositor is empty")
      const track = await this.createMedia()
      
      this.track = AgoraRTC.createCustomVideoTrack({
          mediaStreamTrack: track
      });
      this.compositor.setOutputOptions(1280, 720, 15);
      
      await this.compositor?.start()
      this.track.pipe(this.compositor).pipe(this.track.processorDestination)

      // Publish screen-sharing stream
      await this.rtc.client.publish(this.track);

      console.log("Screen sharing with brand logo started");
      try {
      } catch (error) {
          console.error("Failed to start screen sharing:", error);
      }
    }
  }