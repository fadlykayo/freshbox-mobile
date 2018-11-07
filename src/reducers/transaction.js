import ct from '@constants';

const initialState = {
    transactions: [],
    detail: {}
}

const getTransactions = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state))

    let incomingProducts = payload.data.data;
    let existingProducts = newState.transactions.slice();

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

const transactionDetail = (state, payload) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.detail = payload.data;
    return newState
}

const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case ct.GET_TRANSACTION: return getTransactions(state, action.payload)
        case ct.DETAIL_TRANSACTION: return transactionDetail(state, action.payload)
        case ct.RESET_TRANSACTION: return initialState
        default: return state;
    }
}

export default transactionReducer