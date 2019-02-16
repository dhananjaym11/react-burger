import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Logo.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const Logo = (props) => {
    return (
        <div className={classes.Logo}>
            <Link to='/'>
                <img src={burgerLogo} alt="Logo" />
            </Link>
        </div>
    )
}

export default Logo;