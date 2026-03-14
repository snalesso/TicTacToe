// export enum ChatRoom {
//     WaitingRoom = 'waiting-room',
//     PublicRoom = 'public-room',
// }

export type ChatRoomId = string;

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