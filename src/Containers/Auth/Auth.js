import React, { Component } from 'react';

import classes from './Auth.css';
import inputConfig from '../../Components/ContactData/inputConfig';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import { checkValidity, checkFormIsInvalid } from '../../config/utility';

class Auth extends Component {
    state = {
        authForm: {
            email: inputConfig('input', 'email', 'Enter Email', '', { required: true, isEmail: true }, false, false),
            password: inputConfig('input', 'password', 'Enter Password', '', { required: true, minLength: 7 }, false, false)
        },
        formIsValid: false
    }

    changeHandler = (e, inputIdentifier) => {
        const updatedAuthForm = { ...this.state.authForm };
        const updatedFormElement = { ...updatedAuthForm[inputIdentifier] };
        updatedFormElement.value = e.target.value;
        updatedFormElement.touched = true;
        if (updatedFormElement.validation) {
            updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        }
        updatedAuthForm[inputIdentifier] = updatedFormElement;
        const formIsValid = checkFormIsInvalid(updatedAuthForm);

        this.setState({
            authForm: updatedAuthForm,
            formIsValid: formIsValid
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
        return (
            <div className={classes.Auth}>
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
                    <Button btnType="Success" clicked={this.authHandler} disabled={!this.state.formIsValid}>Login</Button>
                </form>
            </div>
        )
    }
}

export default Auth;