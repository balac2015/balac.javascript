import styles from './ScopedSelectors.css';

import React, { Component } from 'react';
import CSSModules from 'react-css-modules'

console.log( styles )

function ScopedSelectors (props) {
    return (
        <div className={ styles.root }>
          <p className={ styles.text }>Scoped Selectors</p>
        </div>
    )
}

export default ScopedSelectors
