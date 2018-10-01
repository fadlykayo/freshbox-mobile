import ct from '@constants';

const action = {};

action.signin_user = data => ({
    type: ct.SIGN_IN,
    payload: {
        profile: data,
    }
});


export default action;