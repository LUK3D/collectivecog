// import { useCallback } from 'react';
import { Handle, NodeProps, Position } from '@xyflow/react';
import { CirclePlay } from 'lucide-react';


export function StartNode({ }: NodeProps) {
    return (
        <>
            <div className=' relative flex flex-col  '>
                <div className='flex flex-col rounded-md bg-white border-2 shadow-lg'>
                    <div className='px-4 py-2 flex items-center min-w-[200px] max-w-[250px]'>
                        <div className='w-8 h-8 rounded-md bg-purple-500 flex items-center justify-center text-white mr-2'>
                            <CirclePlay />
                        </div>
                        <label className='font-bold' >Start</label>
                    </div>
                    <div className=' flex w-full border-t mt-1  px-4'>
                        <p className='text-xs max-w-[250px] text-slate-700 my-2'> This is the entry point of your module. Think about it as the main function of this module</p>
                    </div>
                </div>
                <Handle type="source" position={Position.Right} className='flex items-center justify-center' id='execution-socket'>
                    <div className='w-[15px] h-[15px] min-w-[15px]  min-h-[15px]    rounded-full bg-white pointer-events-none border-purple-500 border-4'>
                    </div>
                </Handle>
            </div>
        </>
    );
}