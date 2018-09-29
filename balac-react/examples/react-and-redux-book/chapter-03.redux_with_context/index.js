import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ControlPanel from './views/ControlPanel.js';

import store from './Store.js';
import Provider from './Provider.js';   // 只提供 Context，渲染完全交给子组件，后代组件对 store 的访问，都通过 this.context.store 完成

ReactDOM.render(
    <Provider store={ store }>
        <ControlPanel />
    </Provider>,
    document.getElementById('root')
);
