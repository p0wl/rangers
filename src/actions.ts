import { IAction } from './reducer';

export const SET_DATA = 'SET_DATA';
export function setData(data: Array<String>): IAction {
    return { type: SET_DATA, payload: data };
}
