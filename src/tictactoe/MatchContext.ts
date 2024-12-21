import { createContext } from "react";
import { MatchConfig } from "./Match";

export type MatchContext = {
  readonly config: MatchConfig;
}

export const MATCH_CONTEXT = createContext<MatchContext | null>(null);