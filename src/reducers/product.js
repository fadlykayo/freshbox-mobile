import ct from '@constants';
import images from '@assets';

const initialState = {
    last_page: 0,
    params: {
        page: 1,
        sort: 'nama-az',
        stock: 'tersedia'
    },
    products: [],
    categories: [],
    on_category: '',
    detail: {},
    total : {
        price: 0,
        count: 0,
    },
    cart: {
        products: [],
    },
    delivery_price: 0,
    wishlist: {
        products: [],
    }
}

const getProducts = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    let incomingProducts = payload.data.data;
    let existingProducts = newState.products.slice();

    newState.params.page = payload.data.current_page + 1;
    newState.last_page= payload.data.last_page;

    for(x in incomingProducts){
        let sameValue = false;
        for(y in existingProducts){
            if(incomingProducts[x].code == existingProducts[y].code){
                existingProducts[y] = Object.assign({},existingProducts[y],incomingProducts[x]);
                sameValue = true;
                break;
            }
        }
        if(sameValue == false) existingProducts.push(incomingProducts[x]);
    }

    newState.products = existingProducts.sort((a,b) => a.code - b.code).map(e => {
        if(!e.count) e.count = 0;
        if(!e.favorite) e.favorite = false;
        if(!e.maxQty) e.maxQty = 1000;
        return e;
    }).filter(e => e.stock > 0);

    newState.products = existingProducts;

    return newState;
}

const getCategories = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));

    let defaultData = {
        "code": 'CAT-0',
        "parent_id": 0,
        "parent_count": 0,
        "name": "Default",
        "slug": "default",
        "check": true,
        "images_sizes_url": {
            "original" : [
                images.icon_all_categories,
                images.icon_all_categories,
            ]
        }
    }

    for(let i = 0; i < payload.data.length; i++) {
        payload.data[i].check = false;
    }
    payload.data.unshift(defaultData)

    for(let i = 0; i < payload.data.length; i++) {
        if(payload.data[i].check == true) {
            newState.on_category = payload.data[i].name
        }
    }
    
    newState.categories = payload.data

    return newState
}

const changeCategory = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.categories.map(item => {
        if(item.name == payload.data.name) {
            item.check = true
            newState.on_category = item.name
        }
        else item.check = false
        return item	
    })

    return newState
}

const getDetail = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.detail = payload.data;
    return newState;
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
        listProduct[i].favorite = false;
    }

    newState.products = newState.products.concat(listProduct);

    return newState
}

const editTotal = (state,payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    let total = 0;
    let count = 0;
    const index = newState.products.findIndex(e => e.code === payload.data.code);

	if (payload.type == "inc") {
		newState.products[index].count += 1;
	}
	else {
		newState.products[index].count -= 1;
    }

    newState.detail = newState.products[index];

    let cart_product = newState.products.filter(filter => filter.count > 0);
    
    for(i in cart_product){
        total = total + (cart_product[i].price * cart_product[i].count);
        count = count + cart_product[i].count;
        cart_product[i].maxQty = payload.data.maxQty;
    }

    newState.total.count = count;
    newState.total.price = total;
    newState.cart.products = cart_product;

    return newState;
}

const clearProducts = (state) => {
    let newState = JSON.parse(JSON.stringify(state));

    newState.products = [];
    newState.total.count = 0;
    newState.total.price = 0;
    newState.cart.products = [];
    
    return newState;
}

const editFavorite = (state,payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    const index = newState.products.findIndex(e => e.code === payload.data.code);
    if(newState.cart.products.length > 0){
        const cartIndex = newState.cart.products.findIndex(e => e.code === payload.data.code);
        if(cartIndex != -1){
            newState.cart.products[cartIndex].favorite = !newState.cart.products[cartIndex].favorite;
        }
    }
    newState.products[index].favorite = !newState.products[index].favorite;
    newState.detail = newState.products[index];

    return newState;
}

const getDeliveryPrice = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.delivery_price = payload.data;

    return newState;
}

const validateCart = (state,payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    let newCart = newState.cart.products.slice();

    for(x in newCart){
        let result = payload.data.find(item => item.product_code == newCart[x].code);
        if(result){
            newCart[x].maxQty = result.max_qty;
        }
    }

    newState.cart.products = newCart;

    return newState;
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ct.GET_PRODUCTS : return getProducts(state, action.payload)
        case ct.GET_CATEGORIES: return getCategories(state, action.payload)
        case ct.GET_DELIVERY_PRICE: return getDeliveryPrice(state, action.payload)
        case ct.SEARCH_PRODUCTS: return searchData(state, action.payload)
        case ct.CHANGE_TOTAL: return editTotal(state, action.payload)
        case ct.CHANGE_CATEGORIES: return changeCategory(state, action.payload) 
        case ct.TOGGLE_FAVORITE: return editFavorite(state, action.payload)
        case ct.DETAIL_PRODUCT: return getDetail(state, action.payload)
        case ct.CLEAR_PRODUCTS: return clearProducts(state)
        case ct.VALIDATE_CART: return validateCart(state,action.payload)
        case ct.RESET_PRODUCTS: return initialState
        default: return state;
    }
}

export default productReducer