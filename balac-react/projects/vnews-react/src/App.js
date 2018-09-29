import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Navigation from './views/Navigation.js'
import List from './views/List.js'

const App = () => (
    <Router>
        <div>
            <Navigation />
            <Route path="/:title" component={ List } />
        </div>
    </Router>
)

export default App
