import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MarkdownIt from 'markdown-it'

// const md = new MarkdownIt({
//   html: true,
//   breaks: true
// })

// const MarkdownRender = (props) => (md.render(props.children))

class App extends Component {

  render() {
    const text = `
      [!logo](./logo.svg)
      # Welcome to Mardkown

      To get started, edit src/App.js and save to reload.
    `
    const md = new MarkdownIt()
    const result = md.render(text)
    console.log( result)
    
    return (
        <div dangerouslySetInnerHTML={ { __html: result } } />
    );
  }
}

export default App;
