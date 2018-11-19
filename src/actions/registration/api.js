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

actions.register_user = (req,success,failure) => {
	
	payload.path = path.registerUser;
	payload.header = req.header;
	payload.body = req.body;
	
	return dispatch => {
        requestHandler('post',payload,dispatch)
        .then((res) => {
        	console.log('register user res ->',res);
        	if(res.code){
        		if(res.code == 200){
        			success(res);
        		}
        	}
        })
        .catch((err) => {
        	console.log('register user err ->', err);
        	if(!err.code){
        		dispatch(actNetwork.set_network_error_status(true));
        	} else {
        		switch(err.code){
        			case 400: return failure(err);
					case 403: 
						return language.transformText('message.errorRegisterEmail')
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

export default actions;
