// import { useCallback } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { Braces } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@renderer/components/ui/select";
import { Input } from "@renderer/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { Textarea } from "@renderer/components/ui/textarea";

export function ValueNode({ id, data }: NodeProps) {
    const [dataType, setDataType] = useState<string>("");
    const [value, setValue] = useState<string>("");

    const rf = useReactFlow();

    useEffect(() => {
        rf.updateNode(id, { data: { ...data, value: value, action: 4 } });
    }, [value, rf, id]);

    const onDataTypeChange = useCallback((e: string) => {
        setDataType(e);
    }, []);

    const onValueChange = (e: string) => {
        setValue(e);
    };

    return (
        <>
            <div className=" relative flex flex-col  ">
                <div className="flex flex-col rounded-md bg-white border-2 shadow-lg">
                    <div className="px-4 py-2 flex items-center min-w-[200px] max-w-[250px]">
                        <div className="w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center text-white mr-2">
                            <Braces />
                        </div>
                        <label className="font-bold">Value node</label>
                    </div>
                    <div className=" flex w-full border-t mt-1  px-4">
                        <p className="text-xs max-w-[250px] text-slate-700 mt-2">
                            Allows you to create a constant value
                        </p>
                    </div>
                    <div className="inputs flex flex-col p-4">
                        <Select
                            onValueChange={onDataTypeChange}
                            value={dataType}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Data type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel className="opacity-40">
                                        Select a datatype
                                    </SelectLabel>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="text-area">
                                        Text Area
                                    </SelectItem>
                                    <SelectItem value="number">
                                        Number
                                    </SelectItem>
                                    <SelectItem value="range">Range</SelectItem>
                                    <SelectItem value="checkbox">
                                        Bool
                                    </SelectItem>
                                    <SelectItem value="date">Date</SelectItem>
                                    <SelectItem value="datetime-local">
                                        Date Time
                                    </SelectItem>
                                    <SelectItem value="object">
                                        Object
                                    </SelectItem>
                                    <SelectItem value="list">List</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {dataType != "" && dataType != "text-area" && (
                            <Input
                                value={value}
                                type={dataType}
                                placeholder="Value"
                                onChange={(e) => onValueChange(e.target.value)}
                                className="mt-2 flex"
                            />
                        )}
                        {dataType != "" && dataType == "text-area" && (
                            <Textarea
                                value={value}
                                className="mt-2 min-h-[100px]"
                                onChange={(e) => onValueChange(e.target.value)}
                                placeholder="Value"
                            />
                        )}
                    </div>
                </div>
                <Handle
                    type="source"
                    position={Position.Right}
                    className="flex items-center justify-center"
                    id="value-socket"
                >
                    <div className="w-[15px] h-[15px] min-w-[15px]  min-h-[15px]   rounded-full bg-white pointer-events-none border-blue-500 border-4">
                    </div>
                </Handle>
            </div>
        </>
    );
}
