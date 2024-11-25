import { create } from "zustand";
import { addEdge, applyNodeChanges, applyEdgeChanges, Connection } from '@xyflow/react';

import {
    type Edge,
    type Node,
    type OnNodesChange,
    type OnEdgesChange,
    type OnConnect,
} from '@xyflow/react';

export type AppNode = Node;

export type IEditorState = {
    nodes: AppNode[];
    edges: Edge[];
    onNodesChange: OnNodesChange<AppNode>;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    onAddNode: ({ nodeType, cursorX, cursorY }: {
        cursorX: number;
        cursorY: number;
        nodeType: string;
    }) => void,
    setNodes: (nodes: AppNode[]) => void;
    setEdges: (edges: Edge[]) => void;
    build: () => void;
};


interface IDebugData {
    action: "debug" | "run";
    manifest: any;
    steps: Array<any>;
}


// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const useEditorStore = create<IEditorState>((set, get) => ({
    nodes: [
        {
            id: "1da1dca9-6d97-5369-9540-88510399a5d9",
            position: { x: 200, y: 200 },
            data: { name: "Start Node" },
            type: "start-node",
            deletable: false,
        },
    ],
    edges: [],
    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection) => {
        set({
            edges: addEdge({
                ...connection,
                animated: true,
                type: connection.sourceHandle == "execution-socket" ? "execution-edge" : "particle-edge",
            }, get().edges),
        });
    },
    setNodes: (nodes) => {
        set({ nodes });
    },
    setEdges: (edges) => {

        set({ edges: edges });
    },
    onAddNode({ nodeType, cursorX, cursorY }) {
        const node: Node = {
            id: crypto.randomUUID(),
            position: { x: cursorX, y: cursorY },
            data: { action: 3, value: "", name: nodeType },
            type: nodeType,
        };
        set((state) => ({ nodes: [...state.nodes, node] }));
    },
    build() {

        const nodes = get().nodes;
        const edges = get().edges;
        const result = buildExtention(nodes, edges);
        console.log(result);

    }
}));






const getArgs = (nodeId: string, edges: Edge[]) => {
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
const getNext = (nodeId: string, edges: Edge[]) => {
    return edges.filter((e) =>
        e.source === nodeId && e.sourceHandle === "execution-socket"
    ).map((e) => {
        return {
            id: e.target,
            type: "reference",
        };
    });
};

const buildExtention = (nodes: AppNode[], edges: Edge[]) => {
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
        getNext(nodes.filter((n) => n.data.name === "Start Node")[0]?.id, edges)[0]
            .id;
    manifest.steps = nodes.map((node) => {
        const val = {
            id: node.id,
            type: "node",
            action: node.data.action,
            name: node.data.name,
            args: [...getArgs(node.id, edges)] as any,
            next: getNext(node.id, edges),
        };

        if (node.data.value) {
            val.args = [node.data.value, ...val.args];
        }

        return val;
    });
    //TODO run the code here
    // sendMessage(JSON.stringify(manifest));

    return manifest;
}