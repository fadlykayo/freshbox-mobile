import actReducer from './reducer';
import actNetwork from '../network/reducer';
import requestHandler from '../helper';
import { path } from '../config';

const actions = {};

let payload = {
	path: '',
	header: {},
	body: {},
	params: {}
};


actions.get_products = (req, success, failure) => {
	
	payload.path = path.getProducts;
	payload.header = req.header;
    payload.body = req.body;
    payload.params = req.params;
	console.log(req.params == {})
	return dispatch => {
		// console.log("Get Products",payload)
        requestHandler('get',payload,dispatch)
        .then((res) => {
        	console.log('Get Products res',res);
        	if(res.code){
        		if(res.code == 200){
					dispatch(actReducer.get_products(res.data));
        		}
        	}
        })
        .catch((err) => {
        	console.log('Get Products err', err);
        	if(!err.code){
        		dispatch(actNetwork.set_network_error_status(true));
        	} else {
        		switch(err.code){
        			case 400: return failure(err);
        			default:
        				dispatch(actNetwork.set_error_status({
        					status: true,
        					data: JSON.stringify(err)
        				}));
        		}
        	}
        })
    }
};

actions.search_products = (req, success, failure) => {
	
	payload.path = path.getProducts;
	payload.header = req.header;
    payload.body = req.body;
	payload.params = req.params;
	
	return dispatch => {
		// console.log("Get Products",payload)
        requestHandler('get',payload,dispatch)
        .then((res) => {
        	console.log('Get Products res',res);
        	if(res.code){
        		if(res.code == 200){
					dispatch(actReducer.clear_products());
					dispatch(actReducer.search_products(req.params, res.data));
        		}
        	}
        })
        .catch((err) => {
        	console.log('Get Products err', err);
        	if(!err.code){
        		dispatch(actNetwork.set_network_error_status(true));
        	} else {
        		switch(err.code){
        			case 400: return failure(err);
        			default:
        				dispatch(actNetwork.set_error_status({
        					status: true,
        					data: JSON.stringify(err)
        				}));
        		}
        	}
        })
    }
};

export default actions;
