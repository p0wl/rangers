import * as React from 'react';
import * as classnames from 'classnames';
import { observable, IObservableArray } from 'mobx';
import { observer } from 'mobx-react';

import Cell from './Cell';
import {rangesRow, rangesColumn, rangesItem, rangesFilteredColumn} from '../../styles/main.css';
import { ValueWithFilter, ValueFilter } from '../transformValues';
import unique from '../unique';

export type onFilterCallback = (selectedCells: ValueWithFilter[]) => void;

export interface RowProps {
    column: string;
    displayValues: ValueWithFilter[];
    onFilter: onFilterCallback;
    onColumnClick: Function;
    filtered: boolean;
}

interface RowState {
    mouseDown: boolean;
    selected: ValueWithFilter[];
}

class Row extends React.Component<RowProps, RowState> {

    constructor(props: RowProps) {
        super(props);

        this.state = {
            mouseDown: false,
            selected: []
        };
    }

    handleMouseDown(cell: ValueWithFilter) {
        this.setState({ mouseDown: true, selected: [cell]});
    }

    handleMouseUp() {
        const cellsToFilterFor = unique(this.state.selected);
        if (cellsToFilterFor.length === 0) {
            return;
        }
        this.props.onFilter(cellsToFilterFor);

        this.setState({ mouseDown: false, selected: []});
    }

    handleSelection(cell: ValueWithFilter) {
        if (this.state.mouseDown) {
            this.setState({ mouseDown: this.state.mouseDown, selected: this.state.selected.concat(cell)});
        }
    }

    render() {
        return (
            <div
                className={rangesRow}
                onMouseLeave={() => this.setState({ mouseDown: false, selected: [] })}
            >
                <div className={classnames(rangesColumn, rangesItem, {[rangesFilteredColumn]: this.props.filtered})} onClick={() => this.props.onColumnClick()}>{this.props.column}</div>
                {this.props.displayValues.map((cell, i) =>
                    <Cell
                        key={i}
                        count={cell.count}
                        value={cell.value.toString()}
                        onMouseEnter={() => this.handleSelection(cell)}
                        selected={this.state.selected.some(c => c === cell)}
                        onMouseUp={() => this.handleMouseUp()}
                        onMouseDown={() => this.handleMouseDown(cell)}
                    />
                )}
            </div>
        );
    }
};

export default Row;
