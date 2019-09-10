import ct from '@constants';

const action = {};

action.get_banners = (payload) => ({
    type: ct.GET_BANNER,
    payload
});

action.get_detail_banner = (payload) => ({
    type: ct.GET_DETAIL_BANNER,
    payload
})


export default action;