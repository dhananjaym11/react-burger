import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Layout from './Components/Layout/Layout';
import Orders from './Containers/Orders/Orders';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Auth from './Containers/Auth/Auth';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch >
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/auth" exact component={Auth} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
