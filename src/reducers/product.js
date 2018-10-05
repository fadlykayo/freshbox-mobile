import ct from '@constants';

const initialState = {
    last_page: 0,
    params: {
        page: 0,
    },
    products: [],
    product: {
        index: 0,
        data: {},
    },
    total : {
        price: 0,
        count: 0,
    },
    cart: {
        index: [],
        products: [],
    }
}

const getData = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));

    newState.params.page = payload.data.current_page + 1;
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

const getDetail = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));

    newState.product.data = newState.products[payload.index];
    newState.product.index = payload.index;
    return newState
}

const searchData = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));

    newState.products = [];

    let data = payload.params;
    data.page = data.page + 1;
    newState.params = data;
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
    newState.total.count = count;
    newState.total.price = total;

    let cart_product = newState.products.filter(filter => filter.count > 0);
    console.log("masuk", cart_product)
	let index_cart = [];
	for(let i = 0; i < cart_product.length; i++) {
		index_cart.push(newState.products.indexOf(cart_product[i]))
    }
    newState.cart.products = cart_product;
    newState.cart.index = index_cart;

    return newState
}

const editFavorite = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));

    newState.products[payload.index].favorite = !newState.products[payload.index].favorite;

    return newState
}

const clearData = (state) => {
    let newState = JSON.parse(JSON.stringify(state));

    newState = {
        last_page: 0,
        params: {
            page: 0,
        },
        products: [],
        product: {
            index: 0,
            data: {},
        },
        total : {
            price: 0,
            count: 0,
        },
        cart: {
            index: [],
            products: [],
        }
    }

    return newState
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ct.GET_PRODUCTS : return getData(state, action.payload)
        case ct.SEARCH_PRODUCTS: return searchData(state, action.payload)
        case ct.CHANGE_TOTAL : return editTotal(state, action.payload)
        case ct.TOGGLE_FAVORITE: return editFavorite(state, action.payload)
        case ct.DETAIL_PRODUCT: return getDetail(state, action.payload)
        case ct.CLEAR_PRODUCTS: return clearData(state)
        default: return state;
    }
}

export default productReducer