import React from 'react';

import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredients = { ...props.ingredients };
    const html = Object.keys(ingredients)
        .map((key) => (
            <li key={key}>
                <span>{key}</span> : {ingredients[key]}
            </li>
        ));
    return (
        <div>
            <Modal showModal={props.showModal} closeModal={props.closeModal}>
                <h3>Your Order</h3>
                <ul>{html}</ul>
                <p>Total Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
                <Button clicked={props.closeModal} btnType='Danger'>CANCEL</Button>
                <Button clicked={props.continueClicked} btnType='Success'>CONTINUE</Button>
            </Modal>
        </div>
    )
}

export default OrderSummary;