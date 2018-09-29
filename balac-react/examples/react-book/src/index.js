import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './02/App';
// import App from './components/Select.js'
// import App from './css-modules/ScopedSelectors.js'
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
