// import { useCallback } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from '@xyflow/react';
import { Repeat2 } from 'lucide-react';
import { useEffect } from 'react';


export function LoopNode({ id, data }: NodeProps) {

    const rf = useReactFlow();

    useEffect(() => {
        rf.updateNode(id, { data: { ...data, action: 3 } });
    }, []);


    return (
        <div className=' relative flex flex-col  '>
            <Handle
                type="target"
                position={Position.Left}
                id="execution-socket"
                className='flex items-center justify-center'
            >
                <div className='w-[15px] h-[15px] min-w-[15px] min-h-[15px] rounded-full bg-white pointer-events-none border-purple-500 border-4'>
                </div>
            </Handle>

            <Handle type="source" position={Position.Right} className='flex items-center justify-center' id='execution-socket'>
                <div className='w-[15px] h-[15px] min-w-[15px]  min-h-[15px]    rounded-full bg-white pointer-events-none border-purple-500 border-4'>
                </div>
            </Handle>
            <Handle type="source" position={Position.Right} className='flex items-center justify-center mt-8' id='arg-socket-1'>
                <div className='w-[15px] h-[15px] min-w-[15px]  min-h-[15px]    rounded-full bg-white pointer-events-none border-purple-500 border-4'>
                </div>
            </Handle>
            <Handle
                type="target"
                position={Position.Left}
                id="arg-socket-2"
                className='flex items-center justify-center mt-8'
            >
                <div className='w-[15px] h-[15px] min-w-[15px] min-h-[15px] rounded-full bg-white pointer-events-none border-blue-500 border-4'>
                </div>
            </Handle>
            <Handle
                type="target"
                position={Position.Left}
                id="arg-socket-3"
                className='flex items-center justify-center mt-16'
            >
                <div className='w-[15px] h-[15px] min-w-[15px] min-h-[15px] rounded-full bg-white pointer-events-none border-blue-500 border-4'>
                </div>
            </Handle>
            <div className='flex flex-col rounded-md bg-white border-2 shadow-lg h-[170px]'>
                <div className='px-4 py-2 flex items-center min-w-[200px] max-w-[250px]'>
                    <div className='w-8 h-8 rounded-md bg-orange-500 flex items-center justify-center text-black mr-2'>
                        <Repeat2 />
                    </div>
                    <label className='font-bold' >Loop node</label>
                </div>
                <div className=' flex w-full border-t mt-1  px-4'>
                    <p className='text-xs max-w-[250px] text-slate-700 my-2 mb-4'>Runs the given node (n) times</p>
                </div>
                <div className='inputs flex flex-col px-4 pb-4'>

                </div>
            </div>

        </div>
    );
}