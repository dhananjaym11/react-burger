import React from 'react';

import classes from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';
import Burger from '../../Burger/Burger';

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Summary</h1>
            <div>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button clicked={props.onCancelClick} btnType='Danger'>CANCEL</Button>
            <Button clicked={props.onContinueClick} btnType='Success'>CONTINUE</Button>

        </div>
    )
}

export default CheckoutSummary;