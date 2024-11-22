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

/**
 * ## ICoogExtensionActionNode
 * Represents a single step in an extension's action workflow.
 * 
 * @property {string} id - Unique identifier for the action node.
 * @property {string} [name] - Optional name of the action node.
 * @property {number} [action] - Optional identifier of the action to execute.
 * @property {ICoogExtensionActionNodeType} type - The type of the action node (reference or standalone).
 * @property {any[]} args - Arguments required for the action execution.
 * @property {ICoogExtensionActionNode[]} next - A list of subsequent action nodes in the workflow.
 */
export interface ICoogExtensionActionNode {
    id: string;
    name?: string;
    action?: number;
    type: ICoogExtensionActionNodeType;
    args: any[];
    next: ICoogExtensionActionNode[];
}

/**
 * ## ICoogExtensionAuthor
 * Contains information about the author of a COOG extension.
 * 
 * @property {string} name - The author's name.
 * @property {string} email - The author's email address.
 * @property {string[]} urls - A list of URLs associated with the author (e.g., portfolio or contact pages).
 */
export interface ICoogExtensionAuthor {
    name: string;
    email: string;
    urls: string[];
}

/**
 * ## CoogExtension
 * Represents a COOG extension, which is a collection of actions or steps to be executed in a defined order.
 * 
 * @property {string} pkg_id - Unique package identifier for the extension.
 * @property {string} version - The version of the extension.
 * @property {string} name - The name of the extension.
 * @property {string} command - The command to execute the extension.
 * @property {string} description - A brief description of the extension.
 * @property {ICoogExtensionActionNode[]} actions - A list of action nodes defining the extension's workflow.
 * @property {ICoogExtensionAuthor} author - Information about the extension's author.
 */
export class CoogExtension {
    pkg_id: string;
    version: string;
    name: string;
    command: string;
    description: string;
    actions: ICoogExtensionActionNode[];
    author: ICoogExtensionAuthor;

    /**
     * Creates a CoogExtension instance from a JSON object.
     * 
     * @param {Record<string, any>} data - The data to populate the instance.
     * @returns {CoogExtension} A populated CoogExtension instance.
     */
    static fromJson(data: Record<string, any>): CoogExtension {
        return new CoogExtension();
    }

    /**
     * Converts a CoogExtension instance to a JSON object.
     * 
     * @returns {Record<string, any>} The JSON representation of the instance.
     */
    static toJson(): Record<string, any> {
        return {};
    }

    /**
     * Executes the COOG extension.
     */
    run() {
        // Implementation goes here
    }
}

interface ICoogCoreActionArgs {
    id: string,
    name: string,
    type: number,
    prev?: CoogCoreAction,
    next: CoogCoreAction[],
    start_date: Date,
    end_date: Date,
    action: Function,
    data: any[],
    args: any,
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
    type: number;
    prev?: CoogCoreAction;
    next: CoogCoreAction[];
    start_date: Date;
    end_date: Date;
    action: Function;
    data: any[];
    args?: any;
    on_done?: Function;
    on_start?: (step: CoogCoreAction) => void;
    is_running: boolean;

    constructor({
        id,
        name,
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
    copyWith(agrs: IOptional<ICoogCoreActionArgs>): CoogCoreAction {
        return new CoogCoreAction(
            {
                id: crypto.randomUUID(),
                name: agrs.name ?? this.name,
                type: agrs.type ?? this.type,
                prev: agrs.prev ?? this.prev,
                next: agrs.next ?? this.next,
                start_date: agrs.start_date ?? this.start_date,
                end_date: agrs.end_date ?? this.end_date,
                action: agrs.action ?? this.action,
                data: agrs.data ?? this.data,
                args: agrs.args ?? this.args,
                on_done: agrs.on_done ?? this.on_done,
                on_start: agrs.on_start ?? this.on_start,
                is_running: agrs.is_running ?? this.is_running,
            }
        );
    }

    /**
     * Executes the action.
     */
    async run() {
        this.is_running = true;
        this.on_start?.(this);
        const result = await this.action();
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
}
