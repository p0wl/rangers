import * as React from 'react';
import * as classnames from 'classnames';
import {rangesItem, rangesValue, rangesValueSelected} from '../../styles/main.css';

export interface CellProps {
    count: number;
    value: string;
    onMouseEnter: Function;
    onMouseDown: Function;
    onMouseUp: Function;
    selected: boolean;
}

const Cell: React.StatelessComponent<CellProps> = (props) => {
    return (
        <div
            className={classnames(rangesItem, rangesValue, {[rangesValueSelected]: props.selected})}
            style={{flex: props.count}}
            title={`${props.count} Entries`}
            onMouseEnter={() => props.onMouseEnter()}
            onMouseLeave={() => props.onMouseEnter()}
            onMouseDown={() => props.onMouseDown()}
            onMouseUp={() => props.onMouseUp()}
            onTouchStart={() => props.onMouseDown()}
            onTouchEnd={() => props.onMouseUp()}
            onTouchMove={() => props.onMouseEnter()}
        >
            {props.value}
        </div>
    );
};

export default Cell;