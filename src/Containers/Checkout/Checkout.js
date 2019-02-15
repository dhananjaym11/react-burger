import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../Components/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {},
        totalPrice: 0
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'totalPrice') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({
            ingredients: ingredients,
            totalPrice: price
        })
    }

    handleContinue = () => {
        console.log('clicked');
        this.props.history.replace('/checkout/contact-data');
    }

    handleCancel = () => {
        console.log('clicked');
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} onCancelClick={this.handleCancel} onContinueClick={this.handleContinue} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props} />}
                />
            </div>
        );
    }
}

export default Checkout;