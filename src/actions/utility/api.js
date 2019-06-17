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

actions.broadcast_message = (req, success, failure) => {
	payload.path = path.broadcast_message
	payload.header = req.header;
	payload.body = req.body;

	return dispatch => {

		requestHandler('get',payload,dispatch)
		.then((res) => {
			if(res.code){
				if(res.code == 200){
					console.warn(res)
					dispatch(actReducer.broadcast_message(res.data));
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
}

actions.delivery_date = (req, success, failure) => {
	// console.warn(req, path.delivery_date)
	payload.path = path.delivery_date
	payload.header = req.header;
	payload.body = req.body;

	// console.warn(payload)

	return dispatch => {

		requestHandler('get',payload,dispatch)
		.then((res) => {
			if(res.code){
				if(res.code == 200){
					console.warn(res)
					dispatch(actReducer.delivery_date(res.data));
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
}

export default actions;
