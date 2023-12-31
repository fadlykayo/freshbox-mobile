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

action.reorder_transaction = (data) => ({
    type: ct.REORDER_TRANSACTION,
    payload: {
        data
    }
});

action.toggle_favorite = (data) => ({
    type: ct.TOGGLE_FAVORITE_HISTORY,
    payload: {
        data,
    }  
})

action.cancel_transaction = (data) => ({
    type: ct.CANCEL_TRANSACTION,
    payload: {
        data,
    }
})

export default action;