import ct from '@constants';

const action = {};

action.get_products = data => ({
    type: ct.GET_PRODUCTS,
    payload: {
        data: data,
    }
});


export default action;