import axios from 'axios';

export const loadingData = () => {
    return {
        type: 'LOADING_PRODUCTS',
        payload: {
            loadingProducts: true,
        }
    }
}

export const getData = (data) => {
    return {
        type: 'GET_PRODUCTS',
        payload: {
            loadingProducts: false,
            products: data
        }
    }
}

export const errorData = (data) => {
    return {
        type: 'ERROR_GET_PRODUCTS',
        payload: {
            loadingProducts: false,
            errorProducts: data
        }
    }
}

export const getProducts = () => {
    return dispatch => {
        dispatch(loadingData())
        axios.get('http://ec2-18-236-134-251.us-west-2.compute.amazonaws.com/api/product/get?stock=tersedia')
            .then(result => {
                dispatch(getData(result.data.products.data))
            })

            .catch(err => {
                dispatch(errorData(err))
            })
    }
}

