import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../Components/Order/Order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let ordersHtml = <Spinner />;
        if (!this.props.showLoader && this.props.orders.length) {
            ordersHtml = this.props.orders.map((order) => (
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

const mapStateToProps = state => {
    return {
        orders: state.ordReducer.orders,
        showLoader: state.ordReducer.showLoader,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));