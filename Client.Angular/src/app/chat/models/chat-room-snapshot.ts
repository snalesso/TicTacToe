import { ChatRoomId } from "./chat-connection-status";
import { UserId } from "./user";

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