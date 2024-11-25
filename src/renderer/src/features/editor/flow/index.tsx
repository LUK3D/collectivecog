import {
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    ReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { StartNode } from "./nodes/start-node";
import ParticleEdge from "./edges";
import { ConsoleLogNode } from "./nodes/console-log-node";
import { ValueNode } from "./nodes/value-node";
import ExecutionEdge from "./edges/execution-edge";
import { Hammer } from "lucide-react";
import { ScriptNode } from "./nodes/script-node";
import { LoopNode } from "./nodes/loop-node";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@renderer/components/ui/context-menu";
import { RequestNode } from "./nodes/request-node";
import { Button } from "@renderer/components/ui/button";
import { useEditorStore } from "@renderer/data/editor-state";
import { useShallow } from "zustand/react/shallow";

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
const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    onAddNode: state.onAddNode,
    build: state.build,
});

export default function ParticleFlow() {
    const {
        nodes,
        edges,
        onAddNode,
        build,
        onNodesChange,
        onEdgesChange,
        onConnect,
    } = useEditorStore(
        useShallow(selector),
    );

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
                                onAddNode({
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
                        onClick={build}
                        variant="default"
                        className="  h-[40px] flex "
                    >
                        <p>Build</p>
                        <Hammer className="min-w-auto min-h-full" />
                        {/* <BugPlay className="min-w-auto min-h-full" /> */}
                    </Button>
                </div>
            </div>
        </div>
    );
}
