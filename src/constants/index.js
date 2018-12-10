const ct = {}

// NETWORK
ct.SET_LOADING_STATUS = 'SET_LOADING_STATUS';
ct.SET_ERROR_STATUS = 'SET_ERROR_STATUS';
ct.SET_SUCCESS_STATUS = 'SET_SUCCESS_STATUS';
ct.SET_NETWORK_ERROR_STATUS = 'SET_NETWORK_ERROR_STATUS';
ct.SET_SERVER_ERROR_STATUS = 'SET_SERVER_ERROR_STATUS';

// REGISTRATION
ct.REGISTER_SOCMED = 'REGISTER_SOCMED';
ct.REGISTER_PHONE = 'REGISTER_PHONE';
ct.REGISTER_TOKEN = 'REGISTER_TOKEN';
ct.REGISTER_NAME = 'REGISTER_NAME';
ct.REGISTER_USERNAME = 'REGISTER_USERNAME';
ct.CLEAN_REGISTRATION = 'CLEAN_REGISTRATION';
ct.REGISTRATION = 'REGISTRATION';

// AUTH
ct.SIGN_IN = 'SIGN_IN';
ct.UPDATE_USER = 'UPDATE_USER';
ct.LOG_OUT = 'LOG_OUT';

// PRODUCTS
ct.GET_PRODUCTS = 'GET_PRODUCTS';
ct.GET_CATEGORIES = 'GET_CATEGORIES';
ct.GET_FAVORITES = 'GET_FAVORITES';
ct.GET_DELIVERY_PRICE = 'GET_DELIVERY_PRICE';
ct.CHANGE_TOTAL = 'CHANGE_TOTAL';
ct.CHANGE_TOTAL_FAVORITES = 'CHANGE_TOTAL_FAVORITES';
ct.CHANGE_CATEGORIES = 'CHANGE_CATEGORIES';
ct.TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
ct.SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
ct.CLEAR_PRODUCTS = 'CLEAR_PRODUCTS';
ct.DETAIL_PRODUCT = 'DETAIL_PRODUCT';
ct.VALIDATE_CART = 'VALIDATE_CART';
ct.RESET_PARAMS = 'RESET_PARAMS';
ct.CLEAR_PRODUCT_LISTS = 'CLEAR_PRODUCT_LISTS';

// ADDRESS
ct.GET_ADDRESS = 'GET_ADDRESS';
ct.GET_ADDRESS_DETAIL = 'GET_ADDRESS_DETAIL';
ct.RESET_PRODUCTS = 'RESET_PRODUCTS';

// TRANSACTION
ct.GET_TRANSACTION = 'GET_TRANSACTION';
ct.RESET_TRANSACTION = 'RESET_TRANSACTION';
ct.DETAIL_TRANSACTION = 'DETAIL_TRANSACTION';
ct.REORDER_TRANSACTION = 'REORDER_TRANSACTION';
ct.TOGGLE_FAVORITE_HISTORY = 'TOGGLE_FAVORITE_HISTORY';

// REGION
ct.LOAD_PROVINCE = 'LOAD_PROVINCE';
ct.LOAD_CITY = 'LOAD_CITY';
ct.LOAD_SUBDISTRICT = 'LOAD_SUBDISTRICT';
ct.LOAD_ZIP_CODE = 'LOAD_ZIP_CODE';
ct.CLEAR_REGION = 'CLEAR_REGION';
ct.RESET_REGION = 'RESET_REGION';

// WELCOME
ct.ON_BOARDING = 'ON_BOARDING';
ct.USER_ID = 'USER_ID';

//NOTIFICATION
ct.GET_NOTIFICATION = 'GET_NOTIFICATION';
ct.RESET_NOTIFICATION = 'RESET_NOTIFICATION';

export default ct;