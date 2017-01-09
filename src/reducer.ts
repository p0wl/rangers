import { Action, Reducer } from '@types/redux';

import {
    SET_DATA
} from './actions';

export interface IAction extends Action {
  payload: any;
}

interface State {
    values: Array<String>
};

export const INITIAL_STATE: State = {
    values: []
};

export default function reducer<Reducer>(state: State = INITIAL_STATE, action: IAction): State {
    switch (action.type) {
        case SET_DATA: {
            const values = action.payload;
            return (<any>Object).assign({}, INITIAL_STATE, { values });
        }
        default: {
            return state;
        }
    }
}