import * as React from 'react';

export interface SelectionProps {
    onClickNobelPrizeWinners: Function;
}

const Selection: React.StatelessComponent<SelectionProps> = (props) => {
    return (
        <div>
            <div>Please select a dataset</div>
            <div><button onClick={() => props.onClickNobelPrizeWinners()}>Nobel Prize Winners</button></div>
        </div>
    );
};

export default Selection;