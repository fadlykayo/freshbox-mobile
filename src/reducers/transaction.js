import ct from '@constants';

const initialState = {
    params: {
        page: 1
    },
    transactions: [],
    detail: {}
}

const getTransactions = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state))
    let incomingProducts = payload.data.data;

    let existingProducts = newState.transactions.slice();

    if (payload.data.current_page < payload.data.last_page) {
        newState.params.page = payload.data.current_page + 1;
    }
    if(incomingProducts.length > 0) {

        for(x in incomingProducts){
            let sameValue = false;
            for(y in existingProducts){
                if(incomingProducts[x].invoice == existingProducts[y].invoice){
                    existingProducts[y] = Object.assign({},existingProducts[y],incomingProducts[x]);
                    sameValue = true;
                    break;
                }
            }
            if(sameValue == false) existingProducts.push(incomingProducts[x]);
        }
        
        newState.transactions = existingProducts.sort((a,b) => (a.checkout_date < b.checkout_date) ? 1 : ((b.checkout_date < a.checkout_date) ? -1 : 0));
        return newState
    } else {
        if(newState.params.page !== 1) {
            newState.params.page = payload.data.current_page - 1;
        }
        for(x in incomingProducts){
            let sameValue = false;
            for(y in existingProducts){
                if(incomingProducts[x].invoice == existingProducts[y].invoice){
                    existingProducts[y] = Object.assign({},existingProducts[y],incomingProducts[x]);
                    sameValue = true;
                    break;
                }
            }
            if(sameValue == false) existingProducts.push(incomingProducts[x]);
        }
        
        newState.transactions = existingProducts.sort((a,b) => (a.checkout_date < b.checkout_date) ? 1 : ((b.checkout_date < a.checkout_date) ? -1 : 0));
        return newState
    }

    newState.transactions = existingProducts.sort((a,b) => (a.checkout_date < b.checkout_date) ? 1 : ((b.checkout_date < a.checkout_date) ? -1 : 0));
    return newState
}

const transactionDetail = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.detail = payload.data;
    return newState
}

const editFavoriteHistory = (state,payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    let productIndex = newState.detail.details.findIndex(e => e.product.code == payload.data.product.product.code);
    newState.detail.details[productIndex].product.wishlisted = newState.detail.details[productIndex].product.wishlisted == 1 ? 0 : 1;
    return newState
}

const cancelTransaction = (state, payload) => {

    
    let newState = JSON.parse(JSON.stringify(state));
    newState.transactions.map((t, i) => {
        if(t.invoice == payload.data.invoice) {
            // newState.transactions.splice(i, 1)
            t.status = 'cancel'
        }
    })
    return newState;
}

const transactionReducer = (state=initialState,action) => {
    switch (action.type) {
        case ct.GET_TRANSACTION: return getTransactions(state,action.payload);
        case ct.DETAIL_TRANSACTION: return transactionDetail(state,action.payload);
        case ct.TOGGLE_FAVORITE_HISTORY: return editFavoriteHistory(state,action.payload);
        case ct.CANCEL_TRANSACTION: return cancelTransaction(state, action.payload);
        case ct.RESET_TRANSACTION: return initialState;
        default: return state;
    }
}

export default transactionReducer