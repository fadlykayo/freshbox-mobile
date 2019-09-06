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
	// console.log('pair programing')
	payload.path = path.banners;
	payload.header = req.header;
	// payload.body = req.body;
	
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

export default actions;
