import ct from '@constants';

const action = {};

action.signin_user = data => ({
    type: ct.SIGN_IN,
    payload: {
        profile: data,
    }
});

action.log_out = () => ({
    type: ct.LOG_OUT
})

action.get_address = (data) => ({
    type: ct.GET_ADDRESS,
    payload: {
        address: data
    }
})

action.get_address_detail = (data) => ({
    type: ct.GET_ADDRESS_DETAIL,
    payload: {
        data: data
    }
})

action.update_user = data => ({
    type: ct.UPDATE_USER,
    payload: {
        profile: data,
    }
})


export default action;