const initialState = {
    showShoppingCart: false
}

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_SHOPPING_CART":
                return {...state, SHOW_SHOPPING_CART: action.payload}
        default:
            return state
    }

}

export default uiReducer