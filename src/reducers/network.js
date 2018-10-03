
const initialState = {
    isLoading: false,
    isNetworkError: false,
    isServerError: false,
    isResponseError: false,
    isResponseSuccess: false,
    errorMessage: '',
    successMessage: '',
}

const networkReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ERROR_STATUS' : return { ...state, isResponseError: action.payload }
        case 'SET_SUCCESS_STATUS' : return { ...state, isResponseSuccess: action.payload }
        case 'SET_NETWORK_ERROR_STATUS' : return { ...state, isNetworkError: action.payload }
        case 'SET_SERVER_ERROR_STATUS' : return { ...state, isServerError: action.payload  }
        
        default: return state;
    }
}

export default networkReducer