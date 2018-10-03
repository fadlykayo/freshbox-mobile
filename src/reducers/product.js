const initialState = {
    current_page: 1,
    last_page: '',
    products: [],
    total_price: 0,
    total_count: 0,
}

const editData = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));

    newState.current_page = payload.currentPage;
    newState.last_page= payload.data.last_page;

    let listProduct = payload.data.data;

    for (let i = 0; i < listProduct.length; i++) {
        listProduct[i].count = 0;
        listProduct[i].shortDescription = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        listProduct[i].favorite = false;
    }

    newState.products = newState.products.concat(listProduct);

    return newState
}

const editTotal = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    let total = 0;
    let count = 0;
	if (payload.type == "inc") {
		newState.products[payload.index].count += 1;
	}
	else {
		newState.products[payload.index].count -= 1;
    }
    
    for(i=0; i<newState.products.length; i++){
        total = total + (newState.products[i].price * newState.products[i].count);
        count = count + newState.products[i].count;
    }
    newState.total_count = count;
    newState.total_price = total;

    return newState
}

const editFavorite = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));

    newState.products[payload.index].favorite = !newState.products[payload.index].favorite;

    return newState
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS' : return editData(state, action.payload)
        case 'CHANGE_TOTAL' : return editTotal(state, action.payload)
        case 'TOGGLE_FAVORITE': return editFavorite(state, action.payload)
        default: return state;
    }
}

export default productReducer