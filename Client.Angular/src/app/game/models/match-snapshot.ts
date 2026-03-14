import { MatchPlayer } from "./match-player";

export type MatchId = number;

export type MatchSnapshot = {
    readonly id: MatchId;
    readonly player1Id: MatchPlayer;
    readonly player2Id: MatchPlayer;
    readonly board: number[][];
    readonly startDateTime: Date;
    readonly endDateTime: Date | null;
}