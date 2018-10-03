import { combineReducers } from 'redux';
import user from './user';
import product from './product';

const rootReducer = combineReducers({
	user: user,
	product: product,
});

export default rootReducer;