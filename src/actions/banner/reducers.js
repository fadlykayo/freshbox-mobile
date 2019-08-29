import ct from '@constants';

const action = {};

action.GET_BANNER = (payload) => ({
    type: ct.GET_BANNER,
    payload
});


export default action;