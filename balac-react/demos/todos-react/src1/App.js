import React, { Component } from 'react';
import { view as Todos } from './todos/';
import { view as Filters } from './filter/';
import './App.css';

class App extends Component {
    render () {
        return (
            <div className="todoapp">
                <Todos />
                <footer className="footer">
                    <Filters />
                </footer>
            </div>
        );
    }
}

export default App;
