import { PropsWithChildren } from 'react';

export type IHaveChildren = Readonly<Pick<PropsWithChildren, 'children'>>
export type INeedChildren = Required<IHaveChildren>