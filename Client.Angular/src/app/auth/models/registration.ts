import { UserId } from "./user";

export type RegistrationRequest = {
  readonly username: string;
  readonly password: string;
}

export type RegistrationResponse = {
  readonly id: UserId;
  readonly username: string;
  readonly token: string;
}