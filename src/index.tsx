import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable, computed} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import Table from './components/Table';
import AppState from './AppState';

const appState =  new AppState();

ReactDOM.render(<Table appState={appState} />, document.getElementById('main'));

declare var module: any;
if (module.hot) {
  module.hot.accept();
}