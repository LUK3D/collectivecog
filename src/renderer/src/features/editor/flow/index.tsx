import React, { useCallback, useMemo } from "react";
import {
    addEdge,
    Background,
    BackgroundVariant,
    Connection,
    Controls,
    Edge,
    MiniMap,
    Node,
    ReactFlow,
    useEdgesState,
    useNodesState,
    useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { StartNode } from "./nodes/start-node";
import ParticleEdge from "./edges";
import { ConsoleLogNode } from "./nodes/console-log-node";
import { ValueNode } from "./nodes/value-node";
import ExecutionEdge from "./edges/execution-edge";
import { BugPlay } from "lucide-react";
import { cn } from "@renderer/lib/utils";
import { ScriptNode } from "./nodes/script-node";
import { LoopNode } from "./nodes/loop-node";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@renderer/components/ui/context-menu";
import { RequestNode } from "./nodes/request-node";
import useWebSocket from "../hooks/useWebsocket";
import { Button } from "@renderer/components/ui/button";

interface IDebugData {
    action: "debug" | "run";
    manifest: any;
    steps: Array<any>;
}

const initialNodes: Node[] = [
    {
        id: "1da1dca9-6d97-5369-9540-88510399a5d9",
        position: { x: 200, y: 200 },
        data: { name: "Start Node" },
        type: "start-node",
        deletable: false,
    },
    // {
    //     id: '94d87b84-b28b-5d6c-b8d9-7a0c125b1098',
    //     position: { x: 0, y: 0 },
    //     data: { action: 0, name: "Loggin message on Console" },
    //     type: 'console-log-node',
    // },
    // {
    //     id: '572a0ea8-d96e-5edf-a2b9-f49fcbed659b',
    //     position: { x: 0, y: 0 },
    //     data: { action: 0, name: "Loggin message on Console" },
    //     type: 'console-log-node',
    // },
    // {
    //     id: '3d4fb74a-44ab-5a13-8730-8725b2d79e66',
    //     position: { x: 0, y: 0 },
    //     data: { action: 4, value: "", name: "Defining a value" },
    //     type: 'value-node',
    // },
    // {
    //     id: '7580d9bc-9bfe-5fbf-9887-158304cada62',
    //     position: { x: 0, y: 0 },
    //     data: { action: 4, value: "", name: "Defining a value" },
    //     type: 'value-node',
    // },
    // {
    //     id: '249c3783-0e86-5637-9c1c-0048ac8c50f7',
    //     position: { x: 0, y: 0 },
    //     data: { action: 4, value: "", name: "Defining a value" },
    //     type: 'value-node',
    // },
    // {
    //     id: 'b596432f-7881-548f-81ad-5b4855bf10e8',
    //     position: { x: 0, y: 0 },
    //     data: { action: 4, value: "", name: "Defining a value" },
    //     type: 'value-node',
    // },
    // {
    //     id: '6b096ea8-44ce-54e2-b693-edd17d8572c2',
    //     position: { x: 0, y: 0 },
    //     data: { action: 2, value: "", name: "Defining a value" },
    //     type: 'script-node',
    // },
    // {
    //     id: '4054eb30-5a9e-516e-84f4-69b82a3e0576',
    //     position: { x: 0, y: 0 },
    //     data: { action: 3, value: "", name: "Looping!" },
    //     type: 'loop-node',
    // },
];

const edgeTypes = {
    "particle-edge": ParticleEdge,
    "execution-edge": ExecutionEdge,
};
const nodeTypes = {
    "start-node": StartNode,
    "console-log-node": ConsoleLogNode,
    "value-node": ValueNode,
    "script-node": ScriptNode,
    "loop-node": LoopNode,
    "request-node": RequestNode,
};

export default function ParticleFlow() {
    const { messages, sendMessage, isConnected, reconnect } = useWebSocket(
        "ws://127.0.0.1:3010",
    );

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([] as Array<Edge>);

    const onConnect = useCallback(
        (connection: Connection) => {
            if (connection.sourceHandle == "execution-socket") {
                //@ts-ignore
                setEdges((eds) =>
                    addEdge({
                        ...connection,
                        animated: true,
                        type: "execution-edge",
                    }, eds)
                );
            } else {
                //@ts-ignore
                setEdges((eds) =>
                    addEdge({
                        ...connection,
                        animated: true,
                        type: "particle-edge",
                    }, eds)
                );
            }
        },
        [setEdges],
    );

    const getArgs = (nodeId: string) => {
        return edges.filter((e) =>
            (e.target === nodeId && e.targetHandle?.includes("arg-socket")) ||
            //Some nodes accepts an execution node as argument
            //Ex: The loop node.
            (e.source === nodeId && e.sourceHandle?.includes("arg-socket"))
        ).sort((a, b) => {
            return (a.targetHandle ?? "").localeCompare(b.targetHandle ?? "");
        }).map((e) => {
            return {
                id: e.source == nodeId ? e.target : e.source,
                type: "reference",
            };
        });
    };
    const getNext = (nodeId: string) => {
        return edges.filter((e) =>
            e.source === nodeId && e.sourceHandle === "execution-socket"
        ).map((e) => {
            return {
                id: e.target,
                type: "reference",
            };
        });
    };

    const runAndDebug = () => {
        const manifest: IDebugData = {
            action: "debug",
            manifest: {
                "id": "com.luk3d.particle.debug.test",
                "name": "Test Module",
                "command": "test",
                "description":
                    "Simple test module to see it working in realtime",
                "version": "0.0.1",
                "author": {
                    "name": "Unknow",
                    "links": [],
                },
                "permissions": [],
                "assets": {
                    "icon": "",
                },
                "main": "",
            },
            steps: [],
        };
        manifest.manifest["main"] =
            getNext(nodes.filter((n) => n.data.name === "Start Node")[0]?.id)[0]
                .id;
        manifest.steps = nodes.map((node) => {
            const val = {
                id: node.id,
                type: "node",
                action: node.data.action,
                name: node.data.name,
                args: [...getArgs(node.id)] as any,
                next: getNext(node.id),
            };
            if (node.data.value) {
                val.args = [node.data.value, ...val.args];
            }

            return val;
        });

        sendMessage(JSON.stringify(manifest));

        console.log(manifest);
    };

    const addNode = (
        { nodeType, cursorX, cursorY }: {
            cursorX: number;
            cursorY: number;
            nodeType: string;
        },
    ) => {
        const node: Node = {
            id: crypto.randomUUID(),
            position: { x: cursorX, y: cursorY },
            data: { action: 3, value: "", name: nodeType },
            type: nodeType,
        };

        setNodes([...nodes, node]);
    };

    return (
        <div style={{ width: "100vw", height: "100vh" }} className="relative">
            <ContextMenu>
                <ContextMenuTrigger>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                    >
                        <Controls />
                        <MiniMap />
                        <Background
                            variant={BackgroundVariant.Cross}
                            gap={12}
                            size={1}
                        />
                    </ReactFlow>
                </ContextMenuTrigger>

                <ContextMenuContent className="w-[200px]">
                    {Object.keys(nodeTypes).filter((e) =>
                        e !== "start-node"
                    ).map((nt) => (
                        <ContextMenuItem
                            key={nt}
                            onClick={(e) => {
                                addNode({
                                    nodeType: nt,
                                    cursorX: e.clientX,
                                    cursorY: e.clientY,
                                });
                            }}
                        >
                            {nt.split("-").join(" ")}
                        </ContextMenuItem>
                    ))}
                </ContextMenuContent>
            </ContextMenu>

            <div className="absolute top-0 right-0 w-full flex items-center justify-center ">
                <div className="px-4 bg-white  py-2 w-full flex items-center justify-center border-b">
                    <Button
                        onClick={runAndDebug}
                        variant="default"
                        className="  h-[40px] flex "
                    >
                        <p>Debug</p>
                        <BugPlay className="min-w-auto min-h-full" />
                    </Button>
                    {
                        /* <p
                        role="button"
                        onClick={reconnect}
                        className={cn([
                            "px-2 ml-2 py-1 rounded-lg",
                            isConnected
                                ? "bg-green-300 text-green-900"
                                : "bg-red-300 text-red-900",
                        ])}
                    >
                        {isConnected ? "Connected" : "Disconnected"}
                    </p> */
                    }
                </div>
            </div>
        </div>
    );
}
