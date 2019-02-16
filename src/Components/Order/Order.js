import React from 'react';

import classes from './Order.css';

const Order = (props) => {
    const ingredients = Object.keys(props.ingredients).map((ingredient, index) => (
        <span className={classes.Item} key={index}>
            {ingredient}({props.ingredients[ingredient]})
        </span>
    ))
    return (
        <div className={classes.Order}>
            <p> Ingredients:
                {ingredients}
            </p>
            <p> Price: <strong>$ {parseFloat(props.totalPrice).toFixed(2)}</strong> </p>
        </div>
    )
}

export default Order;