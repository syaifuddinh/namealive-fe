export const BroadcastButton = ({ 
    onClick,
    disabled
}: { 
    disabled: boolean;
    onClick: () => void ;
}) => (
    <button
        type="button"
        className={`text-white ${disabled ? "bg-gray cursor-not-allowed" : "bg-primary"} font-medium rounded px-4 py-3`}
        onClick={onClick}
    >
        BROADCAST TO PUBLIC
    </button>
)