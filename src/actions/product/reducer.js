import ct from '@constants';

const action = {};

action.get_products = (data) => ({
    type: ct.GET_PRODUCTS,
    payload: {
        data,
    }
});

action.detail_product = (data) => ({
    type: ct.DETAIL_PRODUCT,
    payload: {
        data
    }
})

action.clear_products = () => ({
    type: ct.CLEAR_PRODUCTS,
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

action.toggle_favorite = (data) => ({
    type: ct.TOGGLE_FAVORITE,
    payload: {
        data,
    }  
})


export default action;