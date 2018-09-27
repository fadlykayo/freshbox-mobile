import ct from '@constants';

const action = {};

action.register_user = data => ({
    type: ct.REGISTRATION,
    payload: {
        profile: data,
    }
});

action.clear_registration = () => ({
    type: ct.CLEAR_REGISTRATION,
});

export default action;