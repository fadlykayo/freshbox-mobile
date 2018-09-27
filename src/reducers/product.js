const initialState = {
    loadingProducts: false,
    products: [],
    errorProducts: null,
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_PRODUCTS': return { ...state, loadingProducts: action.payload.loadingProducts }
        case 'GET_PRODUCTS' : return { ...state, loadingProducts: action.payload.loadingProducts, products: action.payload.products }
        case 'ERROR_GET_PRODUCTS': return { ...state, loadingProducts: action.payload.loadingProducts, errorProducts: action.payload.errorProducts }
        default: return state;
    }
}

export default productReducer