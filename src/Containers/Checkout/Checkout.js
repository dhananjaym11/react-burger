import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../Components/ContactData/ContactData';

class Checkout extends Component {

    handleContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    handleCancel = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ingredients} onCancelClick={this.handleCancel} onContinueClick={this.handleContinue} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);