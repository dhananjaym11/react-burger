import React from 'react';

import classes from './Layout.css';

const Layout = (props) => (
    <>
        <div>header, sidebar</div>
        <main className={classes.content}>
            {props.children}
        </main>
    </>
)

export default Layout;