import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
        let summary = <Redirect to='/' />
        if (this.props.ingredients && !this.props.purchased) {
            summary = (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        onCancelClick={this.handleCancel}
                        onContinueClick={this.handleContinue} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerReducer.ingredients,
        purchased: state.ordReducer.purchased,
    }
}

export default connect(mapStateToProps)(Checkout);