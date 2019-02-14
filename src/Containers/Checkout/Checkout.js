import React, { Component } from 'react';

import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            meat: 1,
            cheese: 1
        }
    }

    handleContinue = () => {
        console.log('clicked');
    }

    handleCancel = () => {
        console.log('clicked');
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} onCancelClick={this.handleCancel} onContinueClick={this.handleContinue} />
            </div>
        );
    }
}

export default Checkout;