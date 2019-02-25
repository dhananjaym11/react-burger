import * as actionTypes from '../actions/actionType';

const initialState = {
    orders: [],
    showLoader: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                showLoader: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.id
            };
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                showLoader: false,
                purchased: true
            };
        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                showLoader: false
            };

        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                showLoader: true
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            const orders = [];
            for (let key in action.orderData) {
                orders.push({
                    ...action.orderData[key],
                    id: key
                });
            }
            return {
                ...state,
                orders: orders,
                showLoader: false
            };
        case actionTypes.FETCH_ORDERS_FAILED:
            return {
                ...state,
                showLoader: false
            };
        default:
            return state;
    }
}

export default reducer;