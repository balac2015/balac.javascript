import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App.js';         // 顶层模块
import store from './Store.js';

ReactDOM.render(
    <Provider store={ store }>      // 保证 store 可以被所有组件访问到
        <App />
    </Provider>,
    document.getElementById('root')
);
