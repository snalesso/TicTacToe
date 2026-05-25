import { UserId } from "./user";

export type RegistrationRequest = {
    readonly username: string;
    readonly password: string;
}

export type RegistrationResponse = {
    readonly wasSuccessful: false;
    readonly usernameErrors: ReadonlyArray<string>;
    readonly passwordErrors: ReadonlyArray<string>;
} | {
    readonly wasSuccessful: true;
    readonly userId: UserId;
}