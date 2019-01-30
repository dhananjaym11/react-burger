import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    const transformedIngredient = Object.keys(props.ingredients);
    let ingredientHtml = transformedIngredient
        .map(ingredient => {
            return [...Array(props.ingredients[ingredient])]
                .map((_, i) => <BurgerIngredient key={i} type={ingredient} />);
        })
        .reduce((arr, el) => arr.concat(el), []);

    if (!ingredientHtml.length) {
        ingredientHtml = <p>Please add ingredients</p>;
    }

    return (
        <>
            <div className={classes.Burger}>
                <BurgerIngredient type='bread-top' />
                {ingredientHtml}
                <BurgerIngredient type='bread-bottom' />
            </div>
        </>
    );
}

export default Burger;