import { combineReducers } from 'redux';
import user from './user';
import product from './product';
import network from './network';

const rootReducer = combineReducers({
	user,
	product,
	network
});

export default rootReducer;