import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        showModal: false,
        showLoader: false
    }

    componentDidMount() {
        this.props.initIngredients();
    }

    orderNowHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({
                showModal: true
            });
        } else {
            this.props.history.push('/auth');
        }
    }

    closeModalHandler = () => {
        this.setState({
            showModal: false
        });
    }

    continueHandler = () => {
        this.setState({
            showModal: false,
            showLoader: true
        });
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        let burger = <Spinner />;
        let orderSummary = null;

        if (this.props.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        totalPrice={this.props.totalPrice}
                        ingredients={this.props.ingredients}
                        addIngredient={this.props.onAddIngredient}
                        removeIngredient={this.props.onRemoveIngredient}
                        orderNowHandler={this.orderNowHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    totalPrice={this.props.totalPrice}
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
                {(this.state.showLoader || this.props.error) ?
                    <Spinner />
                    : null}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerReducer.ingredients,
        totalPrice: state.burgerReducer.totalPrice,
        error: state.burgerReducer.error,
        isAuthenticated: state.authReducer.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (name) => dispatch(actions.addIngredient(name)),
        onRemoveIngredient: (name) => dispatch(actions.removeIngredient(name)),
        initIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));