import React, { Component } from 'react';
import { view as Todos } from './todos/';
import { view as Filters } from './filter/';
import './App.css';

class App extends Component {
    render () {
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <input className="new-todo" placeholder="what needs to be done?" />
                </header>
                <section className="main">
                    <input id="toggle-all" className="toggle-all" type="checkbox" />
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <ul className="todo-list">
                        <li className="completed">
                            <div className="view">
                                <input className="toggle" type="checkbox" checked onChange={ () => {} } />
                                <label>a</label>
                                <button className="destory"></button>
                            </div>
                        </li>
                    </ul>
                </section>
                <footer className="footer">
                    <span className="todo-count">
                        <strong>0</strong>
                        items left
                    </span>
                    <ul className="filters">
                        <li><a href="#">All</a></li>
                        <li><a href="#">Active</a></li>
                        <li><a href="#" className="selected">Completed</a></li>
                    </ul>
                    <button className="clear-completed">Clear completed</button>
                </footer>
            </section>
        );
    }
}

export default App;
