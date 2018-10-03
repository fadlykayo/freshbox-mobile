import ct from '@constants';

const action = {};

action.get_products = (currentPage, data) => ({
    type: ct.GET_PRODUCTS,
    payload: {
        currentPage: currentPage,
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