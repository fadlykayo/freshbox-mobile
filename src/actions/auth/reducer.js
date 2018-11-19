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

export default action;