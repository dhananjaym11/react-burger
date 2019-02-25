import * as actionTypes from '../actions/actionType';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    showLoader: false,
    purchased: false
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.id })
    const purchaseData = {
        orders: state.orders.concat(newOrder),
        showLoader: false,
        purchased: true
    }
    return updateObject(state, purchaseData);
}

const fetchOrderSuccess = (state, action) => {
    const orders = [];
    for (let key in action.orderData) {
        orders.push({
            ...action.orderData[key],
            id: key
        });
    }
    const orderSuccess = {
        orders: orders,
        showLoader: false
    }
    return updateObject(state, orderSuccess);
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, { purchased: false });

        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, { showLoader: true });

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);

        case actionTypes.PURCHASE_BURGER_FAILED:
            return updateObject(state, { showLoader: false });

        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, { showLoader: true });

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrderSuccess(state, action);

        case actionTypes.FETCH_ORDERS_FAILED:
            return updateObject(state, { showLoader: false });

        default:
            return state;
    }
}

export default reducer;