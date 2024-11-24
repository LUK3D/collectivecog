/**
 * ## ICoogExtensionActionNodeType
 * Enum representing the type of an action node in a COOG extension.
 * 
 * - `reference`: This node refers to another action node.
 * - `node`: This node is standalone and does not reference another node.
 */
export enum ICoogExtensionActionNodeType {
    reference,
    node,
}

interface ICoogCoreActionArgs {
    id: string,
    name: string,
    description?: string,
    type: number,
    prev?: CoogCoreAction,
    next: CoogCoreAction[],
    start_date?: Date,
    end_date?: Date,
    action: (actionNode: CoogCoreAction) => any,
    data?: any[],
    args?: any,
    on_done?: Function,
    on_start?: (step: CoogCoreAction) => void,
    is_running: boolean,
}

type IOptional<T> = {
    [P in keyof T]?: T[P];
}

/**
 * ## CoogCoreAction
 * Represents a single action to be executed in a COOG workflow.
 * 
 * @property {string} id - Unique identifier for the action.
 * @property {string} name - The name of the action.
 * @property {string} description - The description of the action.
 * @property {number} type - The type of the action (implementation-specific).
 * @property {CoogCoreAction} [prev] - The previous action in the workflow (optional).
 * @property {CoogCoreAction[]} next - The subsequent actions in the workflow.
 * @property {Date} start_date - The start time of the action.
 * @property {Date} end_date - The end time of the action.
 * @property {Function} action - The function to execute for this action.
 * @property {any[]} data - Data associated with this action.
 * @property {any} args - Arguments for the action.
 * @property {Function} [on_done] - Callback triggered when the action completes (optional).
 * @property {(step: CoogCoreAction) => void} [on_start] - Callback triggered when the action starts (optional).
 * @property {boolean} is_running - Indicates whether the action is currently running.
 */
export class CoogCoreAction {
    id: string;
    name: string;
    description?: string;
    type: number;
    prev?: CoogCoreAction;
    next: CoogCoreAction[];
    start_date?: Date;
    end_date?: Date;
    action: (actionNode: CoogCoreAction) => any;
    data?: any[];
    args?: any;
    on_done?: Function;
    on_start?: (step: CoogCoreAction) => void;
    is_running: boolean;

    constructor({
        id,
        name,
        description,
        type,
        prev,
        next,
        start_date,
        end_date,
        action,
        data,
        args,
        on_done,
        on_start,
        is_running
    }: ICoogCoreActionArgs) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.prev = prev;
        this.next = next;
        this.start_date = start_date;
        this.end_date = end_date;
        this.action = action;
        this.data = data;
        this.args = args;
        this.on_done = on_done;
        this.on_start = on_start;
        this.is_running = is_running;
    }

    /**
     * Creates a copy of the current action.
     * 
     * @returns {CoogCoreAction} A new instance with the same properties as the original.
     */
    copyWith(args: IOptional<ICoogCoreActionArgs>): CoogCoreAction {
        return new CoogCoreAction(
            {
                id: args.id ?? crypto.randomUUID(),
                name: args.name ?? this.name,
                description: args.description ?? this.description,
                type: args.type ?? this.type,
                prev: args.prev ?? this.prev,
                next: args.next ?? this.next,
                start_date: args.start_date ?? this.start_date,
                end_date: args.end_date ?? this.end_date,
                action: args.action ?? this.action,
                data: args.data ?? this.data,
                args: args.args ?? this.args,
                on_done: args.on_done ?? this.on_done,
                on_start: args.on_start ?? this.on_start,
                is_running: args.is_running ?? this.is_running,
            }
        );
    }

    /**
     * Executes the action.
     */
    async run() {
        this.is_running = true;
        this.on_start?.(this);
        const result = await this.action(this);
        this.on_done?.(this);
        this.is_running = false;

        const results = [result];
        for (var i = 0; i < this.next.length; i++) {
            const step = this.next[i];
            step.args = step.args ?? result
            const stepResult = await step.run();
            results.push(stepResult);
        }
        return result;
    }

    toJson() {
        return {
            "id": this.id,
            "name": this.name,
            "description": this.description,
            "type": this.type,
            "prev": this.prev?.toJson(),
            "next": this.next.map((d) => d.toJson()),
            "start_date": this.start_date,
            "end_date": this.end_date,
            "action": "Function",
            "data": this.data,
            "args": this.args,
            "is_running": this.is_running,
        }
    }
}


export const coreActions: Record<string, CoogCoreAction> = {
    "log": new CoogCoreAction({
        id: "0f47e85f-638e-5c4c-833d-c53cb3a33ccc",
        name: "Log",
        description: "Print a mensage into the console",
        type: ICoogExtensionActionNodeType.node,
        is_running: false,
        action: (actionNode: CoogCoreAction) => {
            console.log(...actionNode.args);
        },
        next: [],
    }),
    "alert": new CoogCoreAction({
        id: "4562b841-c1ed-5488-98f4-d15e8bf98bd8",
        name: "Alert",
        description: "Show alert message in a dialog",
        type: ICoogExtensionActionNodeType.node,
        is_running: false,
        action: (actionNode: CoogCoreAction) => {
            alert(actionNode.args);
        },
        next: [],
    }),

}