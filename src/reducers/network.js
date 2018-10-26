import ct from '@constants';

const initialState = {
    isLoading: false,
    isNetworkError: false,
    isServerError: false,
    isResponseError: false,
    isResponseSuccess: false,
    errorTitle: '',
    errorMessage: '',
    successTitle: '',
    successMessage: '',
};

const setLoadingStatus = (state,status) => {
    return Object.assign({},state,{
        isLoading: status
    });
};

const setResponseErrorHandler = (state,payload) => {
    return Object.assign({},state,{
        isLoading: false,
        isResponseError: payload.status,
        errorMessage: payload.data
    });
}

const setResponseSuccessHandler = (state,payload) => {
    return Object.assign({},state,{
        isLoading: false,
        isResponseSuccess: payload.status,
        successMessage: payload.data
    });
}

const setNetworkStatusHandler = (state,payload) => {
    return Object.assign({},state,{
        isLoading: false,
        isNetworkError: payload,
        errorMessage: ''
    });
}

const networkReducer = (state = initialState, action) => {
    switch(action.type){
        case ct.SET_LOADING_STATUS: return setLoadingStatus(state,action.payload);
        case ct.SET_ERROR_STATUS: return setResponseErrorHandler(state,action.payload);
        case ct.SET_SUCCESS_STATUS: return setResponseSuccessHandler(state,action.payload);
        case ct.SET_NETWORK_ERROR_STATUS: return setNetworkStatusHandler(state,action.payload);
        default: return state;
    };
};

export default networkReducer;
