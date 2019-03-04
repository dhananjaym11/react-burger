import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Layout from './hoc/Layout/Layout';
import Orders from './Containers/Orders/Orders';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Auth from './Containers/Auth/Auth';
import Logout from './Containers/Auth/Logout/Logout';
import * as actions from './store/actions';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch >
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" exact component={Auth} />
        <Redirect to="/" />
      </Switch >
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch >
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
