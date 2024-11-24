import { BaseEdge, EdgeProps, getSmoothStepPath } from '@xyflow/react';

export default function ExecutionEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }: EdgeProps) {
    // Create a bezier path for a smoother, more natural flow.
    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
    });

    return (
        <BaseEdge
            id={id}
            path={edgePath}
            className='stroke-purple-500'
            style={{
                stroke: '#a855f7', // Blueprint-like color
                strokeWidth: 4,

                strokeLinecap: 'round',
            }}></BaseEdge>
    );
}
