import actReducer from './reducer';
import actNetwork from '../network/reducer';
import requestHandler from '../helper';
import {path} from '../config';
import {language, analytics} from '@helpers';

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
		requestHandler('post', payload, dispatch)
			.then((res) => {
				if (res.code) {
					if (res.code == 200) {
						dispatch(actReducer.sign_in(res.data));
						success(res);
					}
				}
			})
			.catch((err) => {
				if (!err.code) {
					dispatch(actNetwork.set_network_error_status(true));
				} else {
					switch (err.code) {
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
			});

	};
};

actions.sign_in_socmed = (req, success, failure) => {

	payload.path = path.signInSocmed;
	payload.header = req.header;
	payload.body = req.body;

	return dispatch => {
		requestHandler('post', payload, dispatch)
			.then((res) => {
				if (res.code) {
					if (res.code == 200) {
						dispatch(actReducer.sign_in(res.data));
						success(res);
					}
				}
			})
			.catch((err) => {
				if (!err.code) {
					dispatch(actNetwork.set_network_error_status(true));
				} else {
					switch (err.code) {
						case 404: return failure(err);
						default:
							dispatch(actNetwork.set_error_status({
								status: true,
								data: err.code_message
							}));
							return failure(err);
					}
				}
			});
	};
};

actions.otp_verification = (req, success, failure) => {

	payload.path = path.otpVerification;
	payload.header = req.header;
	payload.body = req.body;

	return dispatch => {
		requestHandler('post', payload, dispatch)
			.then((res) => {
				if (res.code) {
					if (res.code == 200) {
						dispatch(actReducer.sign_in(res.data));
						success(res);
					}
				}
			})
			.catch((err) => {
				if (!err.code) {
					dispatch(actNetwork.set_network_error_status(true));
				} else {
					switch (err.code) {
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
			});

	};
};

actions.otp_resend = (req, success, failure) => {

	payload.path = path.otpResend;
	payload.header = req.header;
	payload.body = req.body;

	return dispatch => {
		requestHandler('post', payload, dispatch)
			.then((res) => {
				if (res.code) {
					if (res.code == 200) {
						success(res);
					}
				}
			})
			.catch((err) => {
				if (!err.code) {
					dispatch(actNetwork.set_network_error_status(true));
				} else {
					switch (err.code) {
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
			});

	};
};

actions.forgot_password = (req, success, failure) => {

	payload.path = path.resetPasswordOTP;
	payload.header = req.header;
	payload.body = req.body;

	return dispatch => {
		requestHandler('post', payload, dispatch)
			.then((res) => {
				if (res.code) {
					if (res.code == 200) {
						success(res);
					}
				}
			})
			.catch((err) => {
				if (!err.code) {
					dispatch(actNetwork.set_network_error_status(true));
				} else {
					switch (err.code) {
						case 400: return failure(err);
						case 403: return failure(err);
						default:
							dispatch(actNetwork.set_error_status({
								status: true,
								data: JSON.stringify(err)
							}));
					}
				}
			});

	};
};

actions.reset_password = (req, success, failure) => {

	payload.path = path.resetPassword;
	payload.header = req.header;
	payload.body = req.body;

	return dispatch => {
		requestHandler('post', payload, dispatch)
			.then((res) => {
				if (res.code) {
					if (res.code == 200) {
						dispatch(actReducer.sign_in(res.data));
						success(res);
					}
				}
			})
			.catch((err) => {
				if (!err.code) {
					dispatch(actNetwork.set_network_error_status(true));
				} else {
					switch (err.code) {
						case 400: return failure(err);
						default:
							dispatch(actNetwork.set_error_status({
								status: true,
								data: JSON.stringify(err)
							}));
					}
				}
			});
	};
};

actions.remove_account = (req, success, failure) => {
	payload.path = path.remove_account;
	payload.header = req.header;

	return (dispatch) => {
		requestHandler('get', payload, dispatch, true)
			.then((res) => {
				if (res.code) {
					if (res.code === 200) {
						dispatch(actReducer.remove_account(res.data));
						success();
					}
				}
			})
			.catch((err) => {
				switch (err.code) {
					case 400:
						return failure(err);
					default:
						dispatch(
							actNetwork.set_error_status({
								status: true,
								data: JSON.stringify(err),
							}),
						);
				}
			});
	};
};

export default actions;
