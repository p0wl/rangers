import * as React from 'react';
import {observable, computed} from 'mobx';
import {observer} from 'mobx-react';
import * as classnames from 'classnames';

import AppState from '../AppState';
import {columnDisplay, ColumnDisplay} from '../transformValues';
import Row from './Row';
import Cell from './Cell';

import {rangesRow, rangesColumn, rangesItem} from '../../styles/main.css';

@observer
class Table extends React.Component<{appState: AppState}, {}> {
    render() {
        return (
            <div>
                {
                    this.props.appState.columns.map((column, j) => (
                        <Row
                            key={j}
                            column={column}
                            displayValues={this.props.appState.displayValues(column)}
                            onColumnClick={() => this.props.appState.remove(column)}
                            filtered={this.props.appState.hasFilter(column)}
                            onFilter={(cells) => this.props.appState.filter(column, cells.map(cell => cell.filter))}
                        />
                    ))
                }

                <br /><br />
                Showing { this.props.appState.filtered.length } / { this.props.appState.data.length } Entries
                <br />
                <button onClick={() => this.props.appState.back()}>Back</button>
                <button onClick={() => this.props.appState.reset()}>Reset</button>
            </div>
        );
     }
};

export default Table;
