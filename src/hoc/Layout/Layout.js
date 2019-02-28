import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';

class Layout extends Component {

    render() {
        return (
            <>
                <Toolbar isAuthenticated={this.props.isAuthenticated} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null
    }
}

export default connect(mapStateToProps)(Layout);