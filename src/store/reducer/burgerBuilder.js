import * as actionTypes from '../actions/actionType';
import { INGREDIENT_PRICES } from '../../config/constants';
import { updateObject } from '../utility';

const initialState = {
    ingredients: {},
    totalPrice: 5,
    error: false
}

const addIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState);
}

const setIngredient = (state, action) => {
    const setIng = {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat
    }
    const setIngs = updateObject(state.ingredients, setIng);
    const setSt = {
        ingredients: setIngs,
        totalPrice: 5,
        error: false
    }
    return updateObject(state, setSt);
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);

        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);

        case actionTypes.SET_INGREDIENT:
            return setIngredient(state, action);

        case actionTypes.FETCH_INGREDIENT_FAILED:
            return updateObject(state, { error: true });

        default:
            return state;
    }
}

export default reducer;