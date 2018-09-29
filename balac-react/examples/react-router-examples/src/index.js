import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import BasicExample from './web/Basic.js'
import UrlParameters from './web/UrlParameters.js'
import Auth from './web/Redirects-Auth.js'
import CustomLink from './web/CustomLink.js'
import PreventingTransitions from './web/Preventing-Transitions.js'
import NoMatch from './web/NoMatch.js'
import RecursivePath from './web/RecursivePath.js'
import Sidebar from './web/Sidebar.js'
import AnimatedTransitions from './web/AnimatedTransitions.js'
import AmbiguousMatches from './web/AmbiguousMatches.js'
import RouteConfig from './web/RouteConfig.js'
import ModalGallery from './web/ModalGallery.js'
import StaticRouterContext from './web/StaticRouterContext.js'

ReactDOM.render(<StaticRouterContext />, document.getElementById('root'));
registerServiceWorker();
