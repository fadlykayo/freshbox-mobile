import ct from '@constants';

const action = {};

action.get_products = (data) => ({
    type: ct.GET_PRODUCTS,
    payload: {
        data,
    }
});

action.get_categories = (data) => ({
    type: ct.GET_CATEGORIES,
    payload: {
        data,
    }
});

action.get_favorites = (data) => ({
    type: ct.GET_FAVORITES,
    payload: {
        data
    }
})

action.get_delivery_price = (data) => ({
    type: ct.GET_DELIVERY_PRICE,
    payload: {
        data,
    }
})

action.detail_product = (data) => ({
    type: ct.DETAIL_PRODUCT,
    payload: {
        data
    }
})

action.clear_products = () => ({
    type: ct.CLEAR_PRODUCTS,
})

action.clear_product_lists = () => ({
    type: ct.CLEAR_PRODUCT_LISTS
})

action.reset_products = () => ({
    type: ct.RESET_PRODUCTS,
})

action.search_products = (params,data) => ({
    type: ct.SEARCH_PRODUCTS,
    payload: {
        params,
        data,
    }
});

action.change_total = (data,type) => ({
    type: ct.CHANGE_TOTAL,
    payload: {
        data,
        type,
    }  
})

action.change_total_favorites = (data,type) => ({
    type: ct.CHANGE_TOTAL_FAVORITES,
    payload: {
        data,
        type,
    }  
})

action.change_categories = (data) => ({
    type: ct.CHANGE_CATEGORIES,
    payload: {
        data,
    }  
})

action.toggle_favorite = (data) => ({
    type: ct.TOGGLE_FAVORITE,
    payload: {
        data,
    }  
})

action.reset_params = () => ({
    type: ct.RESET_PARAMS
})

export default action;