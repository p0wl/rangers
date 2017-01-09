import * as React from 'react';
import * as classnames from 'classnames';

import Cell from './Cell';
import {rangesRow, rangesColumn, rangesItem} from '../../styles/main.css';
import { ValueWithFilter, ValueFilter } from '../transformValues';


export type OnClickCallback = (filter: ValueFilter) => void;

export interface RowProps {
    column: string;
    displayValues: ValueWithFilter[];
    onClick: OnClickCallback;
}

const Row: React.StatelessComponent<RowProps> = (props) => {
    return (
        <div className={rangesRow}>
            <div className={classnames(rangesColumn, rangesItem)}>{props.column}</div>
            {props.displayValues.map((cell, i, vals) =>
                <Cell key={i} count={vals.length} onClick={() => props.onClick(cell.filter)}>{cell.value.toString()}</Cell>
            )}
        </div>
    );
};

export default Row;
