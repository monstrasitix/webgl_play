declare type Func<T1, T2> = (arg1: T1) => T2;
declare type Func2<T1, T2, T3> = (arg1: T1, arg2: T2) => T3;
declare type Func3<T1, T2, T3, T4> = (arg1: T1, arg2: T2, arg3: T3) => T4;

declare type Action<T1> = (arg1: T1) => void;
declare type Action2<T1, T2> = (arg1: T1, arg2: T2) => void;
declare type Action3<T1, T2, T3> = (arg1: T1, arg2: T2, arg3: T3) => void;
