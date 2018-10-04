import ct from '@constants';

const action = {};

action.get_products = (data) => ({
    type: ct.GET_PRODUCTS,
    payload: {
        data: data,
    }
});

action.detail_product = (index) => ({
    type: ct.DETAIL_PRODUCT,
    payload: {
        index: index
    }
})

action.clear_products = () => ({
    type: ct.CLEAR_PRODUCTS,
})

action.search_products = (params, data) => ({
    type: ct.SEARCH_PRODUCTS,
    payload: {
        params: params,
        data: data,
    }
});

action.change_total = (index, type) => ({
    type: ct.CHANGE_TOTAL,
    payload: {
        index: index,
        type: type,
    }  
})

action.toggle_favorite = (index) => ({
    type: ct.TOGGLE_FAVORITE,
    payload: {
        index: index,
    }  
})


export default action;