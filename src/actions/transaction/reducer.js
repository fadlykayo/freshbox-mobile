import ct from '@constants';

const action = {};

action.get_transaction = (data) => ({
    type: ct.GET_TRANSACTION,
    payload: {
        data
    }
})

action.detail_transaction = (data) => ({
    type: ct.DETAIL_TRANSACTION,
    payload: {
        data
    }
})

export default action;