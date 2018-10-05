import ct from '@constants';

const initialState = {
    data: null
};


const registration = (state,payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState = payload;
    return newState;
};

const sign_in = (state,payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.data = payload;
    return newState;
};

const log_out = (state) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.data = null;
    return newState;
}

const user = (state = initialState, action) => {
    switch(action.type){
        case ct.SIGN_IN: return sign_in(state,action.payload.profile)
        case ct.REGISTRATION: return registration(state,action.payload.profile);
        case ct.LOG_OUT: return log_out(state)
        default: return state;
    };
};

export default user;
