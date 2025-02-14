export const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex">
    <p className="font-medium w-[9rem]">
      { label }
    </p>

    <p className="">
      { children }
    </p>
</div>
)