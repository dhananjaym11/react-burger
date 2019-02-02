import React, { Component } from 'react';

import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    meat: 1.3,
    cheese: 0.6
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 5,
        showModal: false
    }

    addIngredientHandler = (type) => {
        const updateCount = this.state.ingredients[type] + 1;
        const updateIngredients = { ...this.state.ingredients };
        updateIngredients[type] = updateCount;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type]

        this.setState({
            ingredients: updateIngredients,
            totalPrice: updatedPrice
        });
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] > 0) {
            const updateCount = this.state.ingredients[type] - 1;
            const updateIngredients = { ...this.state.ingredients };
            updateIngredients[type] = updateCount;
            const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type]

            this.setState({
                ingredients: updateIngredients,
                totalPrice: updatedPrice
            });
        }
    }

    orderNowHandler = () => {
        this.setState({
            showModal: true
        })
    }

    closeModalHandler = () => {
        this.setState({
            showModal: false
        });
    }

    continueHandler = () => {
        alert('Purchased');
    }

    render() {
        return (
            <>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    totalPrice={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    orderNowHandler={this.orderNowHandler}
                />
                <OrderSummary
                    ingredients={this.state.ingredients}
                    totalPrice={this.state.totalPrice}
                    showModal={this.state.showModal}
                    closeModal={this.closeModalHandler}
                    continueClicked={this.continueHandler}
                />
            </>
        );
    }
}

export default BurgerBuilder;