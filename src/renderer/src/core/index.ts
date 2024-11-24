import { CoogCoreAction, coreActions, ICoogExtensionActionNodeType } from "./actions";



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
    action_id: string;
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
    actions: CoogCoreAction[];
    author: ICoogExtensionAuthor;
    start_action_id: string;
    is_running?: boolean;
    on_start?: () => void;
    on_next_action?: (action: ICoogExtensionActionNode) => void;

    constructor({
        pkg_id,
        version,
        name,
        command,
        description,
        actions,
        author,
        start_action_id,
        is_running,
        on_start,
        on_next_action,
    }: {
        pkg_id: string,
        version: string,
        name: string,
        command: string,
        description: string,
        actions: ICoogExtensionActionNode[],
        author: ICoogExtensionAuthor,
        start_action_id: string,
        is_running?: boolean;
        on_start?: () => void,
        on_next_action?: (action: ICoogExtensionActionNode) => void,
    }) {
        this.pkg_id = pkg_id;
        this.version = version;
        this.name = name;
        this.command = command;
        this.description = description;
        this.actions = this.makeActions(actions);
        this.author = author;
        this.start_action_id = start_action_id;
        this.is_running = is_running;
        this.on_start = on_start;
        this.on_next_action = on_next_action;
    }

    makeActions(args: ICoogExtensionActionNode[]) {
        return args.map((e) => {
            //The data needs to be copy from the extention actions to the core actions
            const tmpActions: CoogCoreAction = coreActions[e.action_id].copyWith(
                {
                    id: e.id,
                    args: e.args,
                    type: e.type,
                });

            if (e.next.length > 0) {
                tmpActions.next = this.makeActions(e.next);
            }
            return tmpActions;
        });
    }

    /**
     * Creates a CoogExtension instance from a JSON object.
     * 
     * @param {Record<string, any>} data - The data to populate the instance.
     * @returns {CoogExtension} A populated CoogExtension instance.
     */
    static fromJson(data: Record<string, any>): CoogExtension {
        return new CoogExtension({
            pkg_id: data['pkg_id'],
            version: data['version'],
            name: data['name'],
            command: data['command'],
            description: data['description'],
            actions: data['actions'],
            author: data['author'],
            start_action_id: data['start_action_id'],
        });
    }

    static fromString(data: string) {
        return this.fromJson(JSON.parse(data));
    }

    /**
     * Converts a CoogExtension instance to a JSON object.
     * 
     * @returns {Record<string, any>} The JSON representation of the instance.
     */
    toJson(): Record<string, any> {
        return {
            "pkg_id": this.pkg_id,
            "version": this.version,
            "name": this.name,
            "command": this.command,
            "description": this.description,
            "actions": this.actions.map((action) => action.toJson()),
            "author": this.author,
            "start_action_id": this.start_action_id,
        };
    }

    toString(): string {
        return JSON.stringify(this.toJson());
    }

    /**
     * Executes the COOG extension.
     */
    async run() {
        // Implementation goes here
        const filteredActions = this.actions.filter((action) => action.id === this.start_action_id);
        const startAction = filteredActions[0];
        if (startAction) {
            return await startAction.run();
        }
        console.warn("No start node found!");
    }
}



//Example extention
export const exampleExtension = new CoogExtension({
    pkg_id: "com.luk3d.example",
    name: "Log extension",
    version: "v1.0.1",
    command: "log",
    author: {
        name: "Lukebana Ndontoni",
        email: "filipelukebana@gmail.com",
        urls: [
            "https://www.luk3d.com"
        ]
    },
    description: "Test description",
    start_action_id: "010b704e-f3c1-56ba-b71c-a8d0be52a561",
    actions: [
        {
            id: "010b704e-f3c1-56ba-b71c-a8d0be52a561",
            action_id: "log",
            args: ["Hello world!"],
            next: [],
            type: ICoogExtensionActionNodeType.node,
            name: "Print a message",
        }
    ]
});
