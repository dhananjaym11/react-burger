import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Logout from './Containers/Auth/Logout/Logout';
import * as actions from './store/actions';
import AsyncComponent from './hoc/AsyncComponent/AsyncComponent';

const asyncCheckout = AsyncComponent(() => {
  return import('./Containers/Checkout/Checkout');
});
const asyncOrders = AsyncComponent(() => {
  return import('./Containers/Orders/Orders');
});
const asyncAuth = AsyncComponent(() => {
  return import('./Containers/Auth/Auth');
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch >
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" exact component={asyncAuth} />
        <Redirect to="/" />
      </Switch >
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch >
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/auth" exact component={asyncAuth} />
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
