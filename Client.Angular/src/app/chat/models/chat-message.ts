import { UserId } from "./user";

export type ChatMessageId = number;

export type ChatMessage = {
    readonly id: ChatMessageId;
    readonly authorId: UserId;
    readonly timestamp: Date;
    readonly text: string;
}