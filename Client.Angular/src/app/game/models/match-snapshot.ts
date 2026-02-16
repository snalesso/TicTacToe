import { MatchPlayer } from "./match-player";

export type MatchSnapshot = {
    readonly id: number;
    readonly player1Id: MatchPlayer;
    readonly player2Id: MatchPlayer;
    readonly board: number[][];
    readonly startDateTime: Date;
    readonly endDateTime: Date | null;
}