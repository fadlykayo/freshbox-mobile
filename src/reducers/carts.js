import ct from '@constants';

const initialState = {
    carts: []
};

const saveCart = (state,payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.carts = payload;
    return newState;
}

const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case ct.SAVE_CART: return saveCart(state,action.payload);
        default: return state;
    };
};

export default cartReducer;