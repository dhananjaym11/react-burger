import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const BuildControls = (props) => {
    const ingredients = { ...props.ingredients };
    const orderSum = Object.keys(ingredients)
        .map((key) => ingredients[key])
        .reduce((sum, value) => sum + value, 0)
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: {props.totalPrice.toFixed(2)} </p>

            {controls.map(control => <BuildControl
                key={control.label}
                label={control.label}
                added={() => props.addIngredient(control.type)}
                removed={() => props.removeIngredient(control.type)}
                isDisabled={props.ingredients[control.type] > 0 ? false : true}
            />)}

            <button className={classes.OrderButton} onClick={props.orderNowHandler} disabled={orderSum <= 0}>Order Now</button>
        </div>
    )
}

export default BuildControls;