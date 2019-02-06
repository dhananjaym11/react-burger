import React, { Component } from 'react';

import axios from '../../axios-orders';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    meat: 1.3,
    cheese: 0.6
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 5,
        showModal: false,
        showLoader: false
    }

    componentDidMount() {
        axios.get('/ingredients.json').then(response => {
            this.setState({
                ingredients: response.data
            })
        });

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
        // alert('Purchased');
        this.setState({
            showModal: false,
            showLoader: true
        })
        const orders = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'djay',
                address: {
                    sreet: 'satara',
                    zip: '415002',
                    country: 'India'
                },
                email: 'djay@test.com',
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', orders)
            .then(response => {
                console.log(response);
                this.setState({
                    showLoader: false
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    showLoader: false
                })
            });
    }

    render() {
        let burger = <Spinner />;
        let orderSummary = null;

        if (this.state.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        totalPrice={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        orderNowHandler={this.orderNowHandler}
                    />
                </>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    totalPrice={this.state.totalPrice}
                    showModal={this.state.showModal}
                    closeModal={this.closeModalHandler}
                    continueClicked={this.continueHandler}
                />
            )
        }
        return (
            <>
                {burger}
                {orderSummary}
                {this.state.showLoader ?
                    <Spinner />
                    : null}
            </>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);