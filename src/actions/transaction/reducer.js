import ct from '@constants';

const action = {};

action.get_transaction = (data) => ({
    type: ct.GET_TRANSACTION,
    payload: {
        data
    }
});

action.detail_transaction = (data) => ({
    type: ct.DETAIL_TRANSACTION,
    payload: {
        data
    }
});

action.validate_cart = (data) => ({
    type: ct.VALIDATE_CART,
    payload: {
        data
    }
});

action.reset_transaction = () => ({
    type: ct.RESET_TRANSACTION,
})

export default action;