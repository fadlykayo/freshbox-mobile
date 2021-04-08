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

action.announcement = (payload) => ({
    type: ct.ANNOUNCEMENT,
    payload: payload,
})

action.tourGuide = (payload) => ({
    type: ct.TOUR_GUIDE,
    payload: payload,
})

action.get_list_branch = (data) => ({
    type: ct.GET_LIST_BRANCH,
    payload: {
        data
    }
  })
  
action.change_branch = (data) => ({
    type: ct.CHANGE_BRANCH,
    payload: data
})

action.check_branch = (data) => ({
    type: ct.CHECK_BRANCH,
    payload: data
})


export default action;