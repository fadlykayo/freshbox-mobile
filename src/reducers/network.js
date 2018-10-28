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
        errorMessage: payload.data,
        errorTitle: payload.title ? payload.title : ''
    });
}

const setResponseSuccessHandler = (state,payload) => {
    return Object.assign({},state,{
        isLoading: false,
        isResponseSuccess: payload.status,
        successMessage: payload.data,
        successTitle: payload.title ? payload.title : ''
    });
}

const setNetworkStatusHandler = (state,payload) => {
    return Object.assign({},state,{
        isLoading: false,
        isNetworkError: payload,
        errorMessage: ''
    });
}

const setServerErrorStatusHandler = (state,payload) => {
    return Object.assign({},state,{
        isLoading: false,
        isServerError: payload,
    });
}

const networkReducer = (state = initialState, action) => {
    switch(action.type){
        case ct.SET_LOADING_STATUS: return setLoadingStatus(state,action.payload);
        case ct.SET_ERROR_STATUS: return setResponseErrorHandler(state,action.payload);
        case ct.SET_SUCCESS_STATUS: return setResponseSuccessHandler(state,action.payload);
        case ct.SET_NETWORK_ERROR_STATUS: return setNetworkStatusHandler(state,action.payload);
        case ct.SET_SERVER_ERROR_STATUS: return setServerErrorStatusHandler(state,action.payload);
        default: return state;
    };
};

export default networkReducer;
