import React from 'react';

import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const Layout = (props) => (
    <>
        <Toolbar />
        <main className={classes.content}>
            {props.children}
        </main>
    </>
)

export default Layout;