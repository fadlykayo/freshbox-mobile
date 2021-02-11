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

actions.load_province = (req,success,failure) => {
	
	payload.path = path.getProvinces;
	payload.header = req.header;

	return dispatch => {
        requestHandler('get',payload,dispatch)
        .then((res) => {
        	if(res.code){
        		if(res.code == 200){
					dispatch(actReducer.load_province(res.data))
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

actions.load_city = (req,success,failure) => {
	
	payload.path = `${path.getCity}/${req.provinceCode}`;
	payload.header = req.header;
	
	return dispatch => {
        requestHandler('get',payload,dispatch)
        .then((res) => {
        	if(res.code){
        		if(res.code == 200){
					dispatch(actReducer.load_city(res.data))
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

actions.load_subdistrict = (req,success,failure) => {
	
	payload.path = `${path.getSubdistrict}/${req.cityCode}`;
	payload.header = req.header;

	return dispatch => {
        requestHandler('get',payload,dispatch)
        .then((res) => {
        	if(res.code){
        		if(res.code == 200){
					dispatch(actReducer.load_subdistrict(res.data))
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

actions.load_zip_code = (req,success,failure) => {
	
	payload.path = `${path.getZipCode}/${req.subdistrictCode}`;
	payload.header = req.header;
	return dispatch => {
        requestHandler('get',payload,dispatch)
        .then((res) => {
        	if(res.code){
        		if(res.code == 200){
					dispatch(actReducer.load_zip_code(res.data))
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
