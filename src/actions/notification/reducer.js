import ct from '@constants';

const action = {};

action.get_notification = (data) => ({
    type: ct.GET_NOTIFICATION,
    payload: {
        data
    }
})

action.reset_notification = () => ({
    type: ct.RESET_NOTIFICATION,
})


export default action;