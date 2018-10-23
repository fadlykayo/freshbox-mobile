import ct from '@constants';

const action = {};

action.load_province = (data) => ({
    type: ct.LOAD_PROVINCE,
    payload: {
        data
    }
})

action.load_city = (data) => ({
    type: ct.LOAD_CITY,
    payload: {
        data
    }
})

action.load_subdistrict = (data) => ({
    type: ct.LOAD_SUBDISTRICT,
    payload: {
        data
    }
})

action.load_zip_code = (data) => ({
    type: ct.LOAD_ZIP_CODE,
    payload: {
        data
    }
})

action.clear_region = (data) => ({
    type: ct.CLEAR_REGION,
    payload: {
        data
    }
})

action.reset_region = () => ({
    type: ct.RESET_REGION,
})

export default action;