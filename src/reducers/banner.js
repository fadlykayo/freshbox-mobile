import ct from '@constants';

const initialState = {
    banners: [],
    currentDetail: {
        id: 0,
        name_banner: '',
        images_page_mobile: '',
        links: '',
        syarat_ketentuan: '',
        status: 1,
        items: '',
    }
};

const getBanners = (state,payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.banners = payload.data;
    return newState;
}

const getCurrentDetail = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));   
    newState.currentDetail = payload.data
    return newState
}

const bannerReducer = (state = initialState, action) => {
    switch(action.type){
        case ct.GET_BANNER: return getBanners(state,action.payload);
        // case ct.GET_DETAIL_BANNER: return getCurrentDetail(state, action.payload);
        default: return state;
    };
};

export default bannerReducer;