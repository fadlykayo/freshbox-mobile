import ct from '@constants';

const action = {};

action.save_cart = (payload) => ({
    type: ct.SAVE_CART,
    payload
});


export default action;