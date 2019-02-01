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
        </div>
    )
}

export default BuildControls;