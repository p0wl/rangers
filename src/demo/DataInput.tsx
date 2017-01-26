import * as React from 'react';

export interface DataInputProps {
    onSubmit: Function;
}

class DataInput extends React.Component<DataInputProps, {}> {
    textarea: HTMLTextAreaElement;

    render() {
        return (
            <div>
                <div>Or paste a JSON Table Compatible datastructure here:</div>
                <div><textarea ref={textarea => this.textarea = textarea} /></div>
                <div><button onClick={() => this.props.onSubmit(this.textarea.value)}>Submit</button></div>
            </div>
        );
    }
};

export default DataInput;