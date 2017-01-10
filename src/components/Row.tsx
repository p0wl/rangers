import * as React from 'react';
import * as classnames from 'classnames';

import Cell from './Cell';
import {rangesRow, rangesColumn, rangesItem, rangesFilteredColumn} from '../../styles/main.css';
import { ValueWithFilter, ValueFilter } from '../transformValues';


export type OnClickCallback = (filter: ValueFilter) => void;

export interface RowProps {
    column: string;
    displayValues: ValueWithFilter[];
    onClick: OnClickCallback;
    onColumnClick: Function;
    filtered: boolean;
}

const Row: React.StatelessComponent<RowProps> = (props) => {
    return (
        <div className={rangesRow}>
            <div className={classnames(rangesColumn, rangesItem, {[rangesFilteredColumn]: props.filtered})} onClick={() => props.onColumnClick()}>{props.column}</div>
            {props.displayValues.map((cell, i) =>
                <Cell key={i} count={cell.count} onClick={() => props.onClick(cell.filter)} value={cell.value.toString()} />
            )}
        </div>
    );
};

export default Row;
