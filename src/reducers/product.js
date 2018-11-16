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
    additional: {
        credit_card: 5000,
        VA: 5000
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
    let favoriteList = newState.wishlist.products.slice();

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

    newState.products = existingProducts.map(e => {
        let favoriteItem = favoriteList.filter(p => e.code == p.code);
        if(favoriteItem.length > 0){
            return favoriteItem[0];
        }
        else{
            if(!e.count) e.count = 0;
            if(!e.maxQty) e.maxQty = 1000;
            return e;
        }
    }).filter(e => e.stock > 0);

    return newState;
}

const getFavorites = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    let incomingProducts = payload.data.data;
    let existingProducts = newState.wishlist.products.slice();
    let productList = newState.products.slice();

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

    newState.wishlist.products = existingProducts.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map(e => {
        let productItem = productList.filter(p => e.code == p.code);
        if(productItem.length > 0){
            return productItem[0];
        }
        else{
            if(!e.count) e.count = 0;
            if(!e.maxQty) e.maxQty = 1000;
            return e;
        }
    }).filter(e => e.stock > 0);
    
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

    let params = payload.params;
    params.page = params.page + 1;
    newState.params = params;
    newState.last_page= payload.data.last_page;
    
    newState.products = [];
    let incomingProducts = payload.data.data;
    let existingProducts = newState.cart.products.slice();
    let favoriteList = newState.wishlist.products.slice();

    for(x in incomingProducts){
        for(y in existingProducts){
            if(incomingProducts[x].code == existingProducts[y].code){
                incomingProducts[x] = Object.assign({},incomingProducts[x],existingProducts[y]);
                break;
            }
        }
    }

    newState.products = incomingProducts.map(e => {
        let favoriteItem = favoriteList.filter(p => e.code == p.code);
        if(favoriteItem.length > 0){
            return favoriteItem[0];
        }
        else{
            if(!e.count) e.count = 0;
            if(!e.maxQty) e.maxQty = 1000;
            return e;
        }
    })


    return newState
}

const editTotal = (state,payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    let total = 0;
    let count = 0;
    const indexProducts = newState.products.findIndex(e => e.code === payload.data.code);
    const indexFavorite = newState.wishlist.products.findIndex(e => e.code === payload.data.code);
    const indexCart = newState.cart.products.findIndex(e => e.code === payload.data.code);

	if (payload.type == "inc") {
		if(indexProducts != -1) newState.products[indexProducts].count += 1;
		if(indexFavorite != -1) newState.wishlist.products[indexFavorite].count += 1;
		if(indexCart != -1) newState.cart.products[indexCart].count += 1;
	}
	else {
		if(indexProducts != -1) newState.products[indexProducts].count -= 1;
		if(indexFavorite != -1) newState.wishlist.products[indexFavorite].count -= 1;
		if(indexCart != -1) newState.cart.products[indexCart].count -= 1;
    }

    newState.detail = indexProducts != -1 ? newState.products[indexProducts] : newState.wishlist.products[indexFavorite];

    let productCart = newState.products.filter(e => e.count > 0);
    let favoriteCart = newState.wishlist.products.filter(e => e.count > 0);
    let currentCart = newState.cart.products.slice();
    let newCart = productCart.length > 0 ? productCart : favoriteCart;

    if(productCart.length > 0){
        if(favoriteCart.length > 0){
            for(x in favoriteCart){
                let indexFav = productCart.findIndex(e => e.code == favoriteCart[x].code)
                if (indexFav == -1) {
                    newCart.push(favoriteCart[x])
                }
            }
        }
    }

    for (x in newCart) {
        let inputItem = currentCart.findIndex(e => e.code === newCart[x].code)
        if (inputItem == -1) {
            currentCart.push(newCart[x])
        }
    }

    for(i in currentCart){
        total = total + (currentCart[i].promo_price * currentCart[i].count);
        count = count + currentCart[i].count;
        currentCart[i].maxQty = payload.data.maxQty;
    }

    newState.total.count = count;
    newState.total.price = total;
    newState.cart.products = currentCart;

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
    
    const index = newState.products.findIndex(e => e.code === payload.data.product.code);
    const cartIndex = newState.cart.products.findIndex(e => e.code == payload.data.product.code);
    if (cartIndex != -1) {
        let cartProducts = newState.cart.products[cartIndex];
        cartProducts.wishlisted = cartProducts.wishlisted == 1 ? 0 : 1;
    }
    let productsWishList = newState.products[index];
    productsWishList.wishlisted = productsWishList.wishlisted == 1 ? 0 : 1;
    newState.detail = newState.products[index];

    newState.wishlist.products = payload.data.newData.data;
    
    let incomingProducts = payload.data.newData.data;
    let existingProducts = newState.wishlist.products.slice();
    let productList = newState.products.slice();

    for(x in incomingProducts){
        let sameValue = false;
        for(y in existingProducts){
            if(incomingProducts[x].code == existingProducts[y].code){
                existingProducts[y] = Object.assign({},existingProducts[y],incomingProducts[x]);
                sameValue = true;
                break;
            }
        }
        if(sameValue == false) existingProducts.splice(x, 1);
    }

    newState.wishlist.products = existingProducts.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map(e => {
        let productItem = productList.filter(p => e.code == p.code);
        if(productItem.length > 0){
            return productItem[0];
        }
        else{
            if(!e.count) e.count = 0;
            if(!e.maxQty) e.maxQty = 1000;
            return e;
        }
    })

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

const reorderTransaction = (state,payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    let newCart = newState.cart.products.slice();
    let productList = newState.products.slice();
    let total = 0;
    let count = 0;

    for (let i = 0; i < payload.data.length; i++) {
        let cartIndex = newCart.findIndex(e => e.code == payload.data[i].product.code)
        if (cartIndex == -1) {
            payload.data[i].product.count = payload.data[i].qty;
            payload.data[i].product.maxQty = 1000;
            newCart.push(payload.data[i].product)
        } else {
            newCart[cartIndex].count += payload.data[i].qty;
        }
    }

    for(x in newCart) {
        let productIndex = productList.findIndex(e => e.code == newCart[x].code)
        if (productIndex != -1) {
            productList[productIndex].count = newCart[x].count;
        }
    }

    for(x in newCart) {
        total = total + (newCart[x].promo_price * newCart[x].count);
        count = count + newCart[x].count;
    }

    newState.products = productList;
    newState.cart.products = newCart;
    newState.total.count = count;
    newState.total.price = total;

    return newState;
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ct.GET_PRODUCTS : return getProducts(state,action.payload)
        case ct.GET_CATEGORIES: return getCategories(state,action.payload)
        case ct.GET_FAVORITES: return getFavorites(state,action.payload)
        case ct.GET_DELIVERY_PRICE: return getDeliveryPrice(state,action.payload)
        case ct.SEARCH_PRODUCTS: return searchData(state,action.payload)
        case ct.CHANGE_TOTAL: return editTotal(state,action.payload)
        case ct.CHANGE_CATEGORIES: return changeCategory(state,action.payload) 
        case ct.TOGGLE_FAVORITE: return editFavorite(state,action.payload)
        case ct.DETAIL_PRODUCT: return getDetail(state,action.payload)
        case ct.CLEAR_PRODUCTS: return clearProducts(state)
        case ct.VALIDATE_CART: return validateCart(state,action.payload)
        case ct.REORDER_TRANSACTION: return reorderTransaction(state,action.payload)
        case ct.RESET_PRODUCTS: return initialState
        default: return state;
    }
}

export default productReducer



