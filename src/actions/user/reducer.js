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


export default action;