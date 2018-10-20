import ct from '@constants';

const initialState = {
    province: [],
    city: [],
    subdistrict: [],
    zip_code: []
}

const loadProvince = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state))
    newState.province = payload.data
    return newState
}

const loadCity = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state))
    newState.city = payload.data
    return newState
}

const loadSubdistrict = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state))
    newState.subdistrict = payload.data
    return newState
}

const loadZipCode = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state))
    newState.zip_code = payload.data
    return newState
}

const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case ct.LOAD_PROVINCE: return loadProvince(state, action.payload)
        case ct.LOAD_CITY: return loadCity(state, action.payload)
        case ct.LOAD_SUBDISTRICT: return loadSubdistrict(state, action.payload)
        case ct.LOAD_ZIP_CODE: return loadZipCode(state, action.payload)
        case ct.RESET_REGION: return initialState;
        default: return state;
    }
}

export default transactionReducer