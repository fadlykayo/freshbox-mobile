import actReducer from './reducer';
import actNetwork from '../network/reducer';
import requestHandler from '../helper';
import { path } from '../config';
import { language, analytics } from '@helpers';

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
							// analytics.trackEvent('Login Record', {
							// 	type: 
							// })
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

actions.sign_in_socmed = (req, success, failure) => {
	
	payload.path = path.signInSocmed;
	payload.header = req.header;
	payload.body = req.body;
	
	return dispatch => {
        requestHandler('post',payload,dispatch)
        .then((res) => {
			// console.warn('sign in socmed success -> ',res);
        	if(res.code){
        		if(res.code == 200){
							dispatch(actReducer.sign_in(res.data));
        			success(res);
        		}
        	}
        })
        .catch((err) => {
			// console.log('sign in socmed error -> ',err);
        	if(!err.code){
        		dispatch(actNetwork.set_network_error_status(true));
        	} else {
        		switch(err.code){
        			case 404: return failure(err);
        			default:
        				dispatch(actNetwork.set_error_status({
        					status: true,
        					data: err.code_message
						}));
						return failure(err);
        		}
        	}
        })
    }
};

actions.otp_verification = (req,success,failure) => {
	
	payload.path = path.otpVerification;
	payload.header = req.header;
	payload.body = req.body;
	
	return dispatch => {
        requestHandler('post',payload,dispatch)
        .then((res) => {
			// console.log('otp_verification success -> ',res);
        	if(res.code){
        		if(res.code == 200){
					dispatch(actReducer.sign_in(res.data));
        			success(res);
        		}
        	}
        })
        .catch((err) => {
			// console.log('otp verification error -> ',err);
        	if(!err.code){
        		dispatch(actNetwork.set_network_error_status(true));
        	} else {
        		switch(err.code){
        			case 400: return failure(err);
					case 403: 
						return language.transformText('message.errorOTP')
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

actions.otp_resend = (req,success,failure) => {
	
	payload.path = path.otpResend;
	payload.header = req.header;
	payload.body = req.body;
	
	return dispatch => {
        requestHandler('post',payload,dispatch)
        .then((res) => {
			// console.log('otp resend success -> ',res);
        	if(res.code){
        		if(res.code == 200){
        			success(res);
        		}
        	}
        })
        .catch((err) => {
			// console.log('otp resend error -> ',err);
        	if(!err.code){
        		dispatch(actNetwork.set_network_error_status(true));
        	} else {
        		switch(err.code){
        			case 400: return failure(err);
					case 403: 
						return language.transformText('message.errorOTP')
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
	
	payload.path = path.resetPasswordOTP;
	payload.header = req.header;
	payload.body = req.body;
	
	return dispatch => {
		// console.log(payload)
        requestHandler('post',payload,dispatch)
        .then((res) => {
        	if(res.code){
        		if(res.code == 200){
							console.log('forgot password res ====>', res)
        			success(res);
        		}
        	}
        })
        .catch((err) => {
        	if(!err.code){
        		dispatch(actNetwork.set_network_error_status(true));
        	} else {
						console.log('forgot password err ====>', err)
        		switch(err.code){
							case 400: return failure(err);
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

actions.reset_password = (req,success,failure) => {
	
	payload.path = path.resetPassword;
	payload.header = req.header;
	payload.body = req.body;
	
	return dispatch => {
        requestHandler('post',payload,dispatch)
        .then((res) => {
        	if(res.code){
        		if(res.code == 200){
							console.log('reset password res ====>', res)
							dispatch(actReducer.sign_in(res.data));
        			success(res);
        		}
        	}
        })
        .catch((err) => {
        	if(!err.code){
        		dispatch(actNetwork.set_network_error_status(true));
        	} else {
						console.log('reset password err ====>', err)
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
