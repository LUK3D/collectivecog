// import { useCallback } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@renderer/components/ui/select";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { Globe } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export function RequestNode({ id, data }: NodeProps) {
    const [reuqestType, setReuqestType] = useState<string>("6");

    const rf = useReactFlow();

    useEffect(() => {
        rf.updateNode(id, { data: { ...data, action: parseInt(reuqestType) } });
    }, [reuqestType]);

    const onDataTypeChange = useCallback((e: string) => {
        setReuqestType(e);
    }, []);

    return (
        <div className=" relative flex flex-col  ">
            <Handle
                type="target"
                position={Position.Left}
                id="execution-socket"
                className="flex items-center justify-center"
            >
                <div className="w-[15px] h-[15px] min-w-[15px] min-h-[15px] rounded-full bg-white pointer-events-none border-purple-500 border-4">
                </div>
            </Handle>

            <Handle
                type="source"
                position={Position.Right}
                className="flex items-center justify-center"
                id="execution-socket"
            >
                <div className="w-[15px] h-[15px] min-w-[15px]  min-h-[15px]    rounded-full bg-white pointer-events-none border-purple-500 border-4">
                </div>
            </Handle>
            <Handle
                type="target"
                position={Position.Left}
                id="arg-socket-1"
                className="flex items-center justify-center mt-8"
            >
                <div className="w-[15px] h-[15px] min-w-[15px] min-h-[15px] rounded-full bg-white pointer-events-none border-blue-500 border-4">
                </div>
            </Handle>
            <Handle
                type="target"
                position={Position.Left}
                id="arg-socket-2"
                className="flex items-center justify-center mt-16"
            >
                <div className="w-[15px] h-[15px] min-w-[15px] min-h-[15px] rounded-full bg-white pointer-events-none border-blue-500 border-4">
                </div>
            </Handle>
            <Handle
                type="target"
                position={Position.Left}
                id="arg-socket-3"
                className="flex items-center justify-center mt-24"
            >
                <div className="w-[15px] h-[15px] min-w-[15px] min-h-[15px] rounded-full bg-white pointer-events-none border-blue-500 border-4">
                </div>
            </Handle>
            <div className="flex flex-col rounded-md bg-white border-2 shadow-lg h-[220px]">
                <div className="px-4 py-2 flex items-center min-w-[200px] max-w-[250px]">
                    <div className="w-8 h-8 rounded-md bg-orange-500 flex items-center justify-center text-black mr-2">
                        <Globe />
                    </div>
                    <label className="font-bold">Request node</label>
                </div>
                <div className=" flex w-full border-t mt-1  px-4">
                    <p className="text-xs max-w-[250px] text-slate-700 my-2 mb-4">
                        Make an HTTP Request
                    </p>
                </div>
                <div className="inputs flex flex-col p-4">
                    <Select
                        onValueChange={onDataTypeChange}
                        value={reuqestType}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Request Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel className="opacity-40">
                                    Method
                                </SelectLabel>
                                <SelectItem value="6">GET</SelectItem>
                                <SelectItem value="7">POST</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}
