import * as React from 'react';

import Table from '../components/Table';
import AppState from '../AppState';
import Selection from './Selection';
import DataInput from './DataInput';

declare var require: any;

interface RouterProps {

}

interface RouterState {
    data: any[];
}

enum PredefinedDataSet {
    NobelPrizeWinners,
}

export default class Router extends React.Component<RouterProps, RouterState> {
    constructor(props: any) {
        super(props);

        this.state = {
            data: null
        };
    }

    selectDataSet(selection: PredefinedDataSet) {
        switch (selection) {
            case PredefinedDataSet.NobelPrizeWinners: {
                require.ensure([], (require: Function) => {
                    const data = require('../datasets/nobelprizewinners').default;
                    this.setState({ data });
                });
                return;
            }
        }
    }

    render() {
        if (!this.state.data) {
            return (
                <div>
                    <Selection onClickNobelPrizeWinners={() => this.selectDataSet(PredefinedDataSet.NobelPrizeWinners)} />
                    <DataInput onSubmit={(data: string) => this.setState({data: JSON.parse(data)})} />
                </div>
            );
        }

        const appState = new AppState(this.state.data);
        return <Table appState={appState} />;
    }
}