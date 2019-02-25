import * as actionType from './actionType';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    }
}

const purchaseBurgerFailed = (error) => {
    return {
        type: actionType.PURCHASE_BURGER_FAILED,
        error: error
    }
}

const purchaseBurgerStart = () => {
    return {
        type: actionType.PURCHASE_BURGER_START,
        showLoader: true
    }
}

export const purchaseInit = () => {
    return {
        type: actionType.PURCHASE_INIT
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch((err) => {
                dispatch(purchaseBurgerFailed(err));
            });
    }
}

const fetchOrdersSuccess = (orderData) => {
    return {
        type: actionType.FETCH_ORDERS_SUCCESS,
        orderData: orderData
    }
}

const fetchOrdersFailed = (error) => {
    return {
        type: actionType.FETCH_ORDERS_FAILED,
        error: error
    }
}

const fetchOrderStart = () => {
    return {
        type: actionType.FETCH_ORDERS_START,
        showLoader: true
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get('/orders.json')
            .then(response => {
                dispatch(fetchOrdersSuccess(response.data));
            })
            .catch((err) => {
                dispatch(fetchOrdersFailed(err));
            });
    }
}