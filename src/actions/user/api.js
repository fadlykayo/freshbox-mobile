import actReducer from './reducer';
import actNetwork from '../network/reducer';
import requestHandler from '../helper';
import { path } from '../config';

const actions = {};

let payload = {
	path: '',
	header: {},
	body: {}
};

actions.update_user = (req, success, failure) => {
	
	payload.path = path.updateUser;
	payload.header = req.header;
	payload.body = req.body;
	
	return dispatch => {
        requestHandler('put',payload,dispatch)
        .then((res) => {
        	if(res.code){
        		if(res.code == 200){
					dispatch(actReducer.update_user(res.data));
        			success(res);
        		}
        	}
        })
        .catch((err) => {
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

actions.upload_photo = (req, success, failure) => {
	
	payload.path = path.uploadPhoto;
	payload.header = req.header;
	payload.body = req.body;
	
	return dispatch => {
        requestHandler('put',payload,dispatch)
        .then((res) => {
        	if(res.code){
        		if(res.code == 200){
        			success(res);
        		}
        	}
        })
        .catch((err) => {
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

actions.get_address = (req, success, failure) => {
	
	payload.path = path.getAddress;
	payload.header = req.header;
	payload.body = req.body;
	
	return dispatch => {
        requestHandler('get',payload,dispatch)
        .then((res) => {
        	if(res.code){
        		if(res.code == 200){
					dispatch(actReducer.get_address(res.data));
        			success(res);
        		}
        	}
        })
        .catch((err) => {
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

actions.set_primary_address = (req, success, failure) => {
	
	payload.path = path.setPrimaryAddress;
	payload.header = req.header;
	payload.body = req.body;
	
	return dispatch => {
		console.log(payload)
        requestHandler('post',payload,dispatch)
        .then((res) => {
        	if(res.code){
        		if(res.code == 200){
					dispatch(actReducer.get_address(res.data));
        			success(res);
        		}
        	}
        })
        .catch((err) => {
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
