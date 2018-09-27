import ct from '@constants';

const action = {};

action.set_loading_status = (payload) => ({
    type: ct.SET_LOADING_STATUS,
    payload
});

action.set_error_status = (payload) => ({
    type: ct.SET_ERROR_STATUS,
    payload
});

action.set_success_status = (payload) => ({
    type: ct.SET_SUCCESS_STATUS,
    payload
});

action.set_network_error_status = (payload) => ({
    type: ct.SET_NETWORK_ERROR_STATUS,
    payload
});

action.set_server_error_status = (payload) => ({
    type: ct.SET_SERVER_ERROR_STATUS,
    payload
});

export default action;