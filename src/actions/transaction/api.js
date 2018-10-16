import actReducer from './reducer';
import actNetwork from '../network/reducer';
import requestHandler from '../helper';
import { path } from '../config';

const actions = {};

let payload = {
	path: '',
	header: {
		apiToken: '',
		oneSignalToken: '',
	},
	body: {},
	params: {}
};


actions.bulk_add_products = (req,success,failure) => {
	
	payload.path = path.bulkAddProducts;
	payload.header = req.header;
	payload.body = req.body;
	
	return dispatch => {
		console.log(payload)
        requestHandler('post',payload,dispatch)
        .then((res) => {
        	console.log('Bulk Add Products res',res);
        	if(res.code){
        		if(res.code == 200){
					success(res);
        		}
        	}
        })
        .catch((err) => {
        	console.log('Bulk Add Products err', err);
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

actions.create_order = (req,success,failure) => {
	
	payload.path = path.transaction;
	payload.header = req.header;
	payload.body = req.body;
	payload.params = req.params;
	
	return dispatch => {
		console.log(payload)
        requestHandler('post',payload,dispatch)
        .then((res) => {
        	console.log('Create Transaction res',res);
        	if(res.code){
        		if(res.code == 200){
					success(res);
        		}
        	}
        })
        .catch((err) => {
        	console.log('Create Transaction err', err);
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
