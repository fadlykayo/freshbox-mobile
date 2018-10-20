import { combineReducers } from 'redux';
import user from './user';
import product from './product';
import network from './network';
import transaction from './transaction';
import region from './region';

const rootReducer = combineReducers({
	user,
	product,
	network,
	transaction,
	region
});

export default rootReducer;