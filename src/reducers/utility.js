import ct from '@constants';

const initialState = {
    on_boarding: false,
    delivery_date: [],
    broadcast_message: '',
    announcement: true,
    tour_guide: true
};

const onBoarding = (state) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.on_boarding = true;
    return newState;
};

const deliveryDate = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.delivery_date = payload;
    return newState;
};

const broadcastMessage = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.broadcast_message = payload;
    return newState;
};

const announcement = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.announcement = payload;
    return newState;
};

const tourGuide = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.tour_guide = payload;
    return newState;
};

const utilityReducer = (state = initialState, action) => {
    switch (action.type) {
        case ct.ON_BOARDING: return onBoarding(state);
        case ct.DELIVERY_DATE: return deliveryDate(state, action.payload);
        case ct.BROADCAST_MESSAGE: return broadcastMessage(state, action.payload);
        case ct.ANNOUNCEMENT: return announcement(state, action.payload);
        case ct.TOUR_GUIDE: return tourGuide(state, action.payload)
        default: return state;
    };
};

export default utilityReducer;