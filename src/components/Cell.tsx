import * as React from 'react';
import * as classnames from 'classnames';
import {rangesItem, rangesValue} from '../../styles/main.css';

export interface CellProps {
    count: number;
    onClick: React.MouseEventHandler<any>;
}

const Cell: React.StatelessComponent<CellProps> = (props) => {
    return (
        <div className={classnames(rangesItem, rangesValue)} onClick={props.onClick} style={{flex: props.count}} title={`${props.count} Entries`}>
            {props.children}
        </div>
    );
};

export default Cell;