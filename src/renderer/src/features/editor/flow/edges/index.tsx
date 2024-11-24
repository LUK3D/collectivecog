import { BaseEdge, EdgeProps, getBezierPath, getSimpleBezierPath, getSmoothStepPath } from '@xyflow/react';

export default function ParticleEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }: EdgeProps) {
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
            className='stroke-blue-500'
            style={{
                stroke: '#3b82f6', // Blueprint-like color
                strokeWidth: 4,
                strokeLinecap: 'round',
            }}></BaseEdge>
    );
}
