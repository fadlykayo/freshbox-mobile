import actReducer from './reducers';
import actNetwork from '../network/reducer';
import requestHandler from '../helper';
import { path } from '../config';

const actions = {};

let payload = {
	path: '',
	header: {},
	body: {}
};

actions.get_banner = (req, success, failure) => {
	payload.path = path.banners;
	payload.header = req.header;
	
	return dispatch => {
        requestHandler('get',payload,dispatch)
        .then((res) => {
					// console.log('banner ====>', res)
        	if(res.code){
        		if(res.code == 200){
							dispatch(actReducer.get_banners(res.data))
        			success(res);
        		}
        	}
        })
        .catch((err) => {
					// console.log('====>', err)
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

actions.get_detail_banner = (req, success, failure) => {
	payload.path = `${path.banners}${req.params.bannerID}`;
	payload.header = req.header;
	// console.log(payload.path)
	return dispatch => {
        requestHandler('get',payload,dispatch)
        .then((res) => {
					// console.log('banner detail ====>', res)
        	if(res.code){
        		if(res.code == 200){
							dispatch(actReducer.get_detail_banner(res.data))
        			success(res);
        		}
        	}
        })
        .catch((err) => {
					// console.log('====> detail banner err', err)
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
