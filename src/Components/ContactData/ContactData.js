import React, { Component } from 'react';

import axios from '../../axios-orders';
import Button from '../UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        showLoader: false
    }

    orderHandler = () => {
        this.setState({
            showLoader: true
        })

        const orders = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
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
                });
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    showLoader: false
                })
            });
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter contact data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Enter Name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Enter Email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Enter street" />
                    <input className={classes.Input} type="text" name="postalCode" placeholder="Enter Postal Code" />

                    <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
                </form>
                {this.state.showLoader ?
                    <Spinner />
                    : null}
            </div>
        )
    }
}

export default ContactData;