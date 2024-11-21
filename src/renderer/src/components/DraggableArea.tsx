export default function DraggableArea(
    { children, className }: { className?: string; children },
) {
    return (
        <div className={`${className} drag-area`}>
            {children}
        </div>
    );
}
