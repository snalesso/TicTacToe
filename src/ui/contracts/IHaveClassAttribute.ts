import { HTMLAttributes } from 'react';

export type IHaveClasses<T = any> = Readonly<Pick<HTMLAttributes<T>, 'className'>>;