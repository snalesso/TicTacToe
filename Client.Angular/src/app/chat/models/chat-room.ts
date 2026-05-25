import { UserId } from "../../auth/models/user";

export type ChatRoomId = number;

export type ChatRoomSnapshot = {
    readonly id: ChatRoomId;
    readonly name: string;
    readonly description?: string | null;
    // readonly timestap: Date;
    // readonly userIds: readonly UserId[];
}

export type ChatRoomStatus = {
    readonly id: ChatRoomId;
    readonly userIds: ReadonlyArray<UserId>;
}

export type ChatRoomOption = {
    readonly id: ChatRoomId;
    readonly name: string;
    readonly description?: string | null;
    readonly isAccessible: boolean;
}

export type ChatRoomInfo = {
    readonly id: ChatRoomId;
    readonly name: string;
    readonly description?: string | null;
    // readonly iconCode: string
}