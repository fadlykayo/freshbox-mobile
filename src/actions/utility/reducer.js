import ct from '@constants';

const action = {};

action.on_boarding = () => ({
    type: ct.ON_BOARDING,
})

action.broadcast_message = (payload) => ({
    type: ct.BROADCAST_MESSAGE,
    payload: payload,
})

action.delivery_date = (payload) => ({
    type: ct.DELIVERY_DATE,
    payload: payload,
})


export default action;