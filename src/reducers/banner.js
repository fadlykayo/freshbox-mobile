import ct from '@constants';

const initialState = {
    banners: [],
};

const getBanners = (state,payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.notification = payload.data;
    return newState;
}

const bannerReducer = (state = initialState, action) => {
    switch(action.type){
        case ct.GET_BANNER: return getBanners(state,action.payload);
        default: return state;
    };
};

export default bannerReducer;