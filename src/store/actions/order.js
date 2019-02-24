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
        axios.post('/order.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch((err) => {
                dispatch(purchaseBurgerFailed(err));
            });
    }
}