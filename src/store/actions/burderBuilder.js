import * as actionType from './actionType';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        'type': actionType.ADD_INGREDIENT,
        'ingredientName': name
    }
}

export const removeIngredient = (name) => {
    return {
        'type': actionType.REMOVE_INGREDIENT,
        'ingredientName': name
    }
}

const setIngredients = (ingredients) => {
    return {
        'type': actionType.SET_INGREDIENT,
        'ingredients': ingredients
    }
}

const fetchIngredientsFailed = () => {
    return {
        'type': actionType.FETCH_INGREDIENT_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch((err) => {
                dispatch(fetchIngredientsFailed());
            });
    }
}