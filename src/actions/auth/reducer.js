import ct from '@constants';

const action = {};

action.sign_in = data => ({
    type: ct.SIGN_IN,
    payload: {
        profile: data,
    }
});

action.log_out = () => ({
    type: ct.LOG_OUT
});

action.remove_account = data => ({
    type: ct.REMOVE_ACCOUNT,
    payload: {
        data
    }
});

export default action;