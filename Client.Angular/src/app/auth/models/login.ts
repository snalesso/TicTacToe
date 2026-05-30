import { UserId } from './user';

export type LoginRequest = {
  readonly username: string;
  readonly password: string;
}

export type LoginResponse = {
  readonly id: UserId;
  readonly username: string;
  readonly token: string;
}