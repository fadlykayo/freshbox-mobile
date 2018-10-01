const initialState = {
    lastPage: '',
    nextPage: '',
    products: [],
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS' : return { ...state, currentPage: action.payload.data.last_page_url, products: action.payload.data.data, nextPage: action.payload.data.next_page_url }
        default: return state;
    }
}

export default productReducer