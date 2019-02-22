import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        showModal: false,
        showLoader: false
    }

    componentDidMount() {
        // axios.get('/ingredients.json').then(response => {
        //     this.setState({
        //         ingredients: response.data
        //     })
        // });
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
        this.setState({
            showModal: false,
            showLoader: true
        });
        this.props.history.push('/checkout');
        // const queryParam = [];
        // for (let i in this.props.ingredients) {
        //     queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]))
        // }
        // queryParam.push('totalPrice=' + this.props.totalPrice);
        // const queryStr = queryParam.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryStr
        // });
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
                {this.state.showLoader ?
                    <Spinner />
                    : null}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (name) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: name
        }),
        onRemoveIngredient: (name) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: name
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
// export default withErrorHandler(BurgerBuilder, axios);