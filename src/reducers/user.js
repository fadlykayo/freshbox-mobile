import ct from '@constants';

const initialState = {};

const merge_object = (state,payload) => {
    return Object.assign({},state,payload);
};

const registration = (state,payload) => {
    let newState = payload.address_list == null ? Object.assign({},payload,{address_list: []}) : payload;
    return newState;
};

const user = (state = initialState, action) => {
    switch(action.type){
        case ct.REGISTER_SOCMED: return merge_object(state,action.payload);
        case ct.REGISTER_PHONE: return merge_object(state,action.payload);
        case ct.REGISTER_TOKEN: return merge_object(state,action.payload);
        case ct.REGISTER_NAME: return merge_object(state,action.payload);
        case ct.REGISTER_USERNAME: return merge_object(state,action.payload);
        case ct.REGISTRATION: return registration(state,action.payload.profile);
        default: return state;
    };
};

export default user;
