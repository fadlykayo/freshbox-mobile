import axios from 'axios';
import config from '@config';

export const apiInstance = axios.create({
    baseURL: config.url,
    timeout: 10000,
    validateStatus: (status) => {
        return status >= 200 && status < 300
    }
});

export const path = {
    registerUser: 'v1/user/register',
    signInUser: 'v1/user/login',
    forgotPassword: 'v1/user/forgot-password',
    getProducts: 'v1/product/get',
    getCategories: 'v1/product/category',
    updateUser: 'v1/user/edit/profile/data',
    getAddress: 'v1/user/address',
    setPrimaryAddress: 'v1/user/address/set-as-primary',
}