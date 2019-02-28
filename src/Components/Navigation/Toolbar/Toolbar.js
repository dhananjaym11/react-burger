import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <Logo />
            <nav>
                <NavigationItems isAuthenticated={props.isAuthenticated} />
            </nav>
        </header>
    )
}

export default Toolbar;