import actReducer from './reducer';
import actNetwork from '../network/reducer';
import requestHandler from '../helper';
import { path } from '../config';
import { language } from '@helpers';

const actions = {};

let payload = {
	path: '',
	header: {},
	body: {}
};

actions.sign_in = (req, success, failure) => {
	
	payload.path = path.signInUser;
	payload.header = req.header;
	payload.body = req.body;
	
	return dispatch => {
        requestHandler('post',payload,dispatch)
        .then((res) => {
			console.log('sign in success -> ',res);
        	if(res.code){
        		if(res.code == 200){
					dispatch(actReducer.sign_in(res.data));
        			success(res);
        		}
        	}
        })
        .catch((err) => {
			console.log('sign in error -> ',err);
        	if(!err.code){
        		dispatch(actNetwork.set_network_error_status(true));
        	} else {
        		switch(err.code){
        			case 400: return failure(err);
					case 403: 
						return language.transformText('message.errorLogin')
						.then((message) => {
							dispatch(actNetwork.set_error_status({
								status: true,
								data: message
							}));
						});
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

actions.forgot_password = (req, success, failure) => {
	
	payload.path = path.forgotPassword;
	payload.header = req.header;
	payload.body = req.body;
	
	return dispatch => {
        requestHandler('post',payload,dispatch)
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
        			case 403: return failure(err);
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
