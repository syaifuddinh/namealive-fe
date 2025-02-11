export const UnpublishButton = ({ 
    onClick,
    disabled
}: { 
    disabled: boolean;
    onClick: () => void ;
}) => (
    <button
        type="button"
        className={`text-white ${disabled ? "bg-gray cursor-not-allowed" : "bg-danger"} font-medium rounded px-4 py-3`}
        onClick={onClick}
    >
        STOP BROADCAST
    </button>
)