import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable, computed} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import Router from './demo/Router';

ReactDOM.render(<Router />, document.getElementById('main'));

declare var module: any;
if (module.hot) {
  module.hot.accept();
}