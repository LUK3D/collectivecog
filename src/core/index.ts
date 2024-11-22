/**
 * ## ICoogExtensionActionType
 * Defines the type of a Node
 * 
 * `reference` : Indicates that this node is a reference of another action node
 * 
 * `node` : Indicates that this node does not refer to another one.
 */
export enum ICoogExtensionActionNodeType {
    reference,
    node,
}

/**
 * ## ICoogExtensionActionNode
 * An extension step to execute an action
 */
export interface ICoogExtensionActionNode {
    id: string;
    name?: string;
    action?: number;
    type: ICoogExtensionActionNodeType,
    args: any[],
    next: ICoogExtensionActionNode[],
}

export interface ICoogExtensionAuthor {
    name: string,
    email: string,
    urls: string[]
}

export class CoogExtension {
    pkg_id: string;
    version: string;
    name: string;
    command: string;
    description: string;
    actions: ICoogExtensionActionNode[];
    author: ICoogExtensionAuthor;

    static fromJson(data: Record<string, any>): CoogExtension {
        return new CoogExtension();
    }

    static toJson(): Record<string, any> {
        return {}
    }
    run() {

    }
}

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
    agrs: any;
    on_done?: Function;
    on_start?: (step: CoogCoreAction) => void
    is_running: boolean;

    copy(): CoogCoreAction {
        return new CoogCoreAction();
    }

    run() {

    }
}