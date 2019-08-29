import ct from '@constants';

const action = {};

action.get_banners = (payload) => ({
    type: ct.GET_BANNER,
    payload
});


export default action;