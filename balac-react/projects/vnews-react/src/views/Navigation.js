import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import categories from '../scripts/category.js';
import './navigation.css'
import logo from '../logo.svg'

const Navigation = () => (
    <header className="header">
        <nav className="inner">
            <Link to="/">
                <img className="logo" src={ logo } alt="logo" />
            </Link>
            {
                categories.map((category, i) => (
                    <Link key={ category.id } to={ `/${category.title}` }>{ category.name }</Link>
                ))
            }
            <a className="github" href="" target="_blank" rel="noopener">
                Built with vue.js
            </a>
        </nav>
    </header>
)

export default Navigation
