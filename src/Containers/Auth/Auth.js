import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.css';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import inputConfig from '../../Components/ContactData/inputConfig';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { checkValidity, checkFormIsInvalid, updateObject } from '../../config/utility';
import * as actions from '../../store/actions';

class Auth extends Component {
    state = {
        authForm: {
            email: inputConfig('input', 'email', 'Enter Email', '', { required: true, isEmail: true }, false, false),
            password: inputConfig('input', 'password', 'Enter Password', '', { required: true, minLength: 6 }, false, false)
        },
        formIsValid: false,
        isSignup: true
    }

    changeHandler = (e, inputIdentifier) => {

        const updatedFormElement = updateObject(this.state.authForm[inputIdentifier], {
            value: e.target.value,
            valid: checkValidity(e.target.value, this.state.authForm[inputIdentifier].validation),
            touched: true
        });
        const updatedAuthForm = updateObject(this.state.authForm, {
            [inputIdentifier]: updatedFormElement
        });

        const formIsValid = checkFormIsInvalid(updatedAuthForm);

        this.setState({
            authForm: updatedAuthForm,
            formIsValid: formIsValid
        })
    }

    authHandler = () => {
        const formData = {};
        for (let indentifier in this.state.authForm) {
            formData[indentifier] = this.state.authForm[indentifier].value;
        }
        this.props.onInitAuth(formData.email, formData.password, this.state.isSignup);
    }

    switchAuthHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
    }

    render() {
        const formElements = [];
        for (let key in this.state.authForm) {
            formElements.push({
                id: key,
                config: this.state.authForm[key]
            })
        }
        let isAuthenticated = null;
        if (this.props.isAuthenticated) {
            if (this.props.totalPrice > 5) {
                isAuthenticated = <Redirect to="/checkout" />
            } else {
                isAuthenticated = <Redirect to="/" />
            }
        }
        return (
            <div className={classes.Auth}>
                {isAuthenticated}
                {this.props.error ?
                    <p>{this.props.error.message} </p>
                    : null}
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
                    <Button btnType="Success" clicked={this.authHandler} disabled={!this.state.formIsValid}>Login</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthHandler}>Switch to {this.state.isSignup ? 'Signin' : 'Signup'}</Button>

                {this.props.showLoader ? <Spinner /> : null}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        showLoader: state.authReducer.showLoader,
        error: state.authReducer.error,
        isAuthenticated: state.authReducer.token !== null,
        totalPrice: state.burgerReducer.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitAuth: (email, password, isSignup) => dispatch(actions.initAuth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));