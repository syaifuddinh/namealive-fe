export class MediaRepo {
    private video: HTMLVideoElement ;
    private screen?: MediaStream ;
    private canvas: HTMLCanvasElement ;
    private cornerImage?: string;

    constructor() {
        this.video = document.createElement("video")
        this.canvas = document.createElement("canvas")
        this.canvas.width = 1280
        this.canvas.height = 720
    }

    draw(): void {
        
    }

    setCornerImage(img: string): void {
        this.cornerImage = img
    }

    getScreensharingMedia(): Promise<MediaStream> {
        this.screen = screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });

        return this.screen
    }
    
}