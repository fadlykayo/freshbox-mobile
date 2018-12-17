import ct from '@constants';

const initialState = {
    on_boarding: false,
    data: null,
    address: [],
    address_detail: {},
    userId: '',
};


const registration = (state,payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.data = payload;
    return newState;
};

const signin = (state,payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.data = payload;
    return newState;
};

const log_out = (state) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.data = null;
    newState.address = [];
    return newState;
}

const get_address = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.address = payload.address;
    return newState;
}

const get_address_detail = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.address_detail = payload.data;
    return newState;
}

const update_user = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.data.user = payload.profile;
    return newState;
}

const getUserID = (state,payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    console.log(payload.data)
    newState.userId = payload.data;
    return newState;
}

const user = (state = initialState, action) => {
    switch(action.type){
        case ct.SIGN_IN: return signin(state,action.payload.profile)
        case ct.REGISTRATION: return registration(state,action.payload.profile);
        case ct.LOG_OUT: return log_out(state)
        case ct.GET_ADDRESS: return get_address(state, action.payload)
        case ct.GET_ADDRESS_DETAIL: return get_address_detail(state, action.payload)
        case ct.UPDATE_USER: return update_user(state,action.payload)
        case ct.USER_ID: return getUserID(state, action.payload)
        default: return state;
    };
};

export default user;
