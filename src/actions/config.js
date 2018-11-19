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
    otpVerification: 'v1/user/otp-verification',
    otpResend: 'v1/user/otp-resend',
    forgotPassword: 'v1/user/forgot-password',
    getProducts: 'v1/product',
    getFavorites: 'v1/wishlist',
    getCategories: 'v1/product-category',
    updateUser: 'v1/user/edit/profile/data',
    uploadPhoto: 'v1/user/upload/profile/image',
    address: 'v1/user/address',
    setPrimaryAddress: 'v1/user/address/set-as-primary',
    shippingCost: 'v1/shipping-cost',
    bulkAddProducts: 'v1/cart/bulk-add-and-replace',
    checkout: 'v1/transaction/checkout',
    resetPassword: 'v1/user/edit/password',
    favorite: 'v1/wishlist',
    transactionHistory: 'v1/transaction',
    getProvinces: 'v1/region/province',
    getCity: 'v1/region/city',
    getSubdistrict: 'v1/region/subdistrict',
    getZipCode: 'v1/region/zip-code',
    reorder: 'v1/transaction/reorder'
}