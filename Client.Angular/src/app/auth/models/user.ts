export type UserId = number;

export type User = {
  readonly id: UserId;
  readonly name: string;
}

export type CurrentUserInfo = {
  readonly id: UserId;
  readonly name: string;
}