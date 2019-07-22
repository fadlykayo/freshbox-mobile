import actReducer from './reducer';
import actNetwork from '../network/reducer';
import requestHandler from '../helper';
import { path } from '../config';
import { analytics } from '@helpers';

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


actions.get_products = (req,success,failure) => {
	// console.log("payload get_products",req);
	
	payload.path = path.getProducts;
	payload.header = req.header;
	payload.params = req.params;
	
	return dispatch => {
        requestHandler('get',payload,dispatch, true)
        .then((res) => {
        	// console.log('Get Products res ->',res);
        	if(res.code){
        		if(res.code == 200){
					dispatch(actReducer.get_products(res.data));
					success();
        		}
        	}
        })
        .catch((err) => {
        	// console.log('Get Products err ->', err);
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

actions.get_favorites = (req,success,failure) => {

	payload.path = path.getFavorites;
	payload.header = req.header;
	payload.params = req.params;
	
	return dispatch => {
        requestHandler('get',payload,dispatch)
        .then((res) => {
        	// console.log('Get Favorites res ->',res);
        	if(res.code){
        		if(res.code == 200){
					dispatch(actReducer.get_favorites(res.data));
					success(res);
        		}
        	}
        })
        .catch((err) => {
        	// console.log('Get Favorites err ->', err);
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

actions.get_categories = (req, success, failure) => {
	
	payload.path = path.getCategories;
	payload.header = req.header;
    payload.body = req.body;
    payload.params = req.params;

	return dispatch => {

        requestHandler('get',payload,dispatch)
        .then((res) => {
        	// console.log('Get Categories res',res);
        	if(res.code){
        		if(res.code == 200){
					dispatch(actReducer.get_categories(res.data));
        		}
        	}
        })
        .catch((err) => {
        	// console.log('Get Categories err', err);
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

actions.search_products = (req, success, failure) => {
	payload.path = path.getProducts;
	payload.header = req.header;
	payload.body = req.body;
	payload.params = req.params;
	
	return dispatch => {
        requestHandler('get',payload,dispatch)
        .then((res) => {
        	if(res.code){
        		if(res.code == 200){
							if(res.data.data.length == 0) {
								analytics.trackEvent('Unavailable Products', {product_searched: req.params.name})
							}
							success(res)
							dispatch(actReducer.search_products(req.params, res.data));
        		}
        	}
        })
        .catch((err) => {
        	// console.log('Search Products err', err);
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

actions.get_delivery_price = (req,success,failure) => {
	
	payload.path = path.shippingCost;
	payload.header = req.header;
	payload.params = req.params;
	
	return dispatch => {
        requestHandler('get',payload,dispatch)
        .then((res) => {
        	// console.log('Get Shipping Cost res',res);
        	if(res.code){
        		if(res.code == 200){
					dispatch(actReducer.get_delivery_price(res.data));
					success(res)
        		}
        	}
        })
        .catch((err) => {
        	// console.log('Get Shipping Cost err', err);
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

actions.add_favorite = (req,success,failure) => {
	
	payload.path = path.favorite;
	payload.header = req.request.header;
	payload.body = req.request.body;
	
	return dispatch => {
		
        requestHandler('post',payload,dispatch)
        .then((res) => {
        	// console.log('Add Favourite res',res);
        	if(res.code){
        		if(res.code == 200){
					dispatch(actReducer.toggle_favorite({
						newData: res.data,
						product: req.favorite
					}))
        		}
        	}
        })
        .catch((err) => {
        	// console.log('Add Favourite err', err);
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

actions.delete_favorite = (req,success,failure) => {
	
	payload.path = `${path.favorite}/${req.favorite.code}`;
	payload.header = req.request.header;
	
	return dispatch => {
        requestHandler('delete',payload,dispatch)
        .then((res) => {
        	// console.log('Delete Favourite res',res);
        	if(res.code){
        		if(res.code == 200){
					dispatch(actReducer.toggle_favorite({
						newData: res.data,
						product: req.favorite
					}))
					success()
        		}
        	}
        })
        .catch((err) => {
        	// console.log('Delete Favourite err', err);
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
