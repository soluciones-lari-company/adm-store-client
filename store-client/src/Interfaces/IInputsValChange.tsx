import { ChangeEventHandler } from "react";

export interface IInputsValChange<T,Y>{
    value: T | undefined,
    onChangeEvt: ChangeEventHandler<Y>,
}