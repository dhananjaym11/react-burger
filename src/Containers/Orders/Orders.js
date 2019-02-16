import React, { Component } from 'react';

import axios from '../../axios-orders';
import Order from '../../Components/Order/Order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: []
    };

    componentDidMount() {
        axios.get('/orders.json').then(response => {
            const orders = [];
            for (let key in response.data) {
                orders.push({
                    ...response.data[key],
                    id: key
                });
            }
            // const orders = Object.keys(response.data).map((d) => response.data[d]);
            this.setState({
                orders: orders
            })
        }).catch((err) => console.log(err));
    }

    render() {
        let ordersHtml = (
            <Spinner />
        )
        if (this.state.orders.length) {
            ordersHtml = this.state.orders.map((order) => (
                <Order key={order.id} ingredients={order.ingredients} totalPrice={order.price} />
            ));
        }
        return (
            <div>
                {ordersHtml}
            </div>
        );
    };
}

export default withErrorHandler(Orders, axios);