export type NavbarLink = {
    readonly url: ReadonlyArray<string>;
    readonly label: string;
    readonly isDisabled?: boolean;
}