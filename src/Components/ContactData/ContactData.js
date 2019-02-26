import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Button from '../UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../UI/Spinner/Spinner';
import Input from '../UI/Input/Input';
import inputConfig from './inputConfig';
import * as orderActions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { checkValidity, checkFormIsInvalid } from '../../config/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: inputConfig('input', 'text', 'Enter Name', '', { required: true, maxLength: 20 }, false, false),
            street: inputConfig('input', 'text', 'Enter Street', '', { required: true }, false, false),
            zipCode: inputConfig('input', 'text', 'Enter Zipcode', '', { required: true, minLength: 5 }, false, false),
            country: inputConfig('input', 'text', 'Enter Country', '', { required: true }, false, false),
            email: inputConfig('input', 'email', 'Enter Email', '', { required: true }, false, false),
            deliveryMethod: inputConfig('select', [
                { value: 'fastest', displayValue: 'Fastest' },
                { value: 'cheapest', displayValue: 'Cheapest' }
            ], '', 'fastest')
        },
        formIsValid: false
    }

    orderHandler = () => {
        const formData = {};
        for (let indentifier in this.state.orderForm) {
            formData[indentifier] = this.state.orderForm[indentifier].value;
        }

        const orders = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }
        this.props.onPurchaseBurger(orders);
    }

    changeHandler = (e, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedFormElement.value = e.target.value;
        updatedFormElement.touched = true;
        if (updatedFormElement.validation) {
            updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        }
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        const formIsValid = checkFormIsInvalid(updatedOrderForm);

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })
    }

    render() {
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter contact data</h4>
                <form>
                    {formElements.map((ele) => (
                        <Input
                            key={ele.id}
                            elementType={ele.config.elementType}
                            elementConfig={ele.config.elementConfig}
                            onChange={(e) => this.changeHandler(e, ele.id)}
                            shouldValidate={ele.config.validation ? true : false}
                            invalid={!ele.config.valid}
                            touched={ele.config.touched}
                            value={ele.config.value} />
                    ))}
                    <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>Order</Button>
                </form>
                {this.props.showLoader ?
                    <Spinner />
                    : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerReducer.ingredients,
        totalPrice: state.burgerReducer.totalPrice,
        showLoader: state.ordReducer.showLoader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseBurger: (orderData) => dispatch(orderActions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));