import ct from '@constants';

const initialState = {
    notification: null,
};

const getNotification = (state,payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.notification = payload.data;
    return newState;
}

const notificationReducer = (state = initialState, action) => {
    switch(action.type){
        case ct.GET_NOTIFICATION: return getNotification(state,action.payload);
        case ct.RESET_NOTIFICATION: return initialState;
        default: return state;
    };
};

export default notificationReducer;