import PROJECT from "@/contents/project.json"

export const Achievement = ({ className = "" }: { className: string; }) => (
  <div 
    className={`bg-dark text-white min-w-[159px] max-w-[159px] h-[228px] flex flex-col items-center justify-center gap-4 ${className}`}
  >
    { Object.entries(PROJECT.achievement).map(obj => (
      <div
        key={obj[0]}
      >
        <div className="text-sm text-center font-medium">
          { obj[1].qty }
        </div>
        <div className="text-sm text-center mt-1">
          { obj[1].title }
        </div>
      </div>
    )) }
  </div>
)