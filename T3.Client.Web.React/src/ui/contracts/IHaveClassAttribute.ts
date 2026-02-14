import { HTMLAttributes } from 'react';

export type IHaveClassAttribute<T = any> = Readonly<Pick<HTMLAttributes<T>, 'className'>>;