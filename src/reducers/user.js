import ct from '@constants';

const initialState = {};


const registration = (state,payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState = payload;
    return newState;
};

const user = (state = initialState, action) => {
    switch(action.type){
        case ct.REGISTRATION: return registration(state,action.payload.profile);
        default: return state;
    };
};

export default user;
