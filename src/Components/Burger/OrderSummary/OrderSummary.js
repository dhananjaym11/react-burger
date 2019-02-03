import React, { Component } from 'react';

import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.showModal !== this.props.showModal;
    }

    render() {
        const ingredients = { ...this.props.ingredients };
        const html = Object.keys(ingredients)
            .map((key) => (
                <li key={key}>
                    <span>{key}</span> : {ingredients[key]}
                </li>
            ));

        return (
            <div>
                <Modal showModal={this.props.showModal} closeModal={this.props.closeModal}>
                    <h3>Your Order</h3>
                    <ul>{html}</ul>
                    <p>Total Price: <strong>{this.props.totalPrice.toFixed(2)}</strong></p>
                    <Button clicked={this.props.closeModal} btnType='Danger'>CANCEL</Button>
                    <Button clicked={this.props.continueClicked} btnType='Success'>CONTINUE</Button>
                </Modal>
            </div>
        )
    }
}

export default OrderSummary;