import React from 'react';

import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    const isLogin = props.isAuthenticated ?
        <>
            <NavigationItem link='/orders'>Orders</NavigationItem>
            <NavigationItem link='/logout'>Logout</NavigationItem>
        </> :
        <NavigationItem link='/auth'>Authenticate</NavigationItem>

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/'>Burger Builder</NavigationItem>
            {isLogin}
        </ul>
    )
}

export default NavigationItems;