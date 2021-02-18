import { combineReducers } from 'redux';
import user from './user';
import product from './product';
import network from './network';
import transaction from './transaction';
import region from './region';
import utility from './utility';
import notif from './notification';
import banners from './banner'
import carts from './carts'

const rootReducer = combineReducers({
	user,
	product,
	network,
	transaction,
	region,
	utility,
	notif,
	banners,
	carts
});

export default rootReducer;