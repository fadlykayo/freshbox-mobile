import actReducer from './reducer';
import actNetwork from '../network/reducer';
import requestHandler from '../helper';
import { path } from '../config';
import { analytics } from '@helpers';

const actions = {};

// let payload = {
// 	path: '',
// 	header: {
// 		apiToken: '',
// 		oneSignalToken: '',
// 	},
// 	body: {},
// 	params: {}
// };

let payload2 = {};
let payload = {};


actions.get_products = (req,success,failure) => {
	if(req.params.on_promo) {
		delete req.params.on_promo;
	}
	payload2.path = path.getProducts;
	payload2.header = req.header;
	payload2.params = req.params;


	return dispatch => {
        requestHandler('get',payload2,dispatch, true)
        .then((res) => {
        	console.log('Get Products res ->',res);
        	if(res.code){
        		if(res.code == 200){
					dispatch(actReducer.get_products(res.data));
					success();
        		}
        	}
        })
        .catch((err) => {
        	console.warn('Get Products err ->', err);
        	if(!err.code){
						console.log(err)
        		// dispatch(actNetwork.set_network_error_status(true));
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
							success();
        		}
        	}
        })
        .catch((err) => {
        	console.warn('Get Categories err', err);
        	if(!err.code){
        		// dispatch(actNetwork.set_network_error_status(true));
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

	// console.log(payload.params, 'search product')
	
	return dispatch => {
		
        requestHandler('get',payload,dispatch)
        .then((res) => {
					// console.log('Search Products res', res);
        	if(res.code){
        		if(res.code == 200){
							if(res.data.data.length == 0) {
								// analytics.trackEvent('Unavailable Products', {product_searched: req.params.name})
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

actions.get_promo = (req, success, failure) => {
	payload.path = path.getProducts;
	payload.header = req.header;
	payload.body = req.body;
	payload.params = req.params;
	
	return dispatch => {
		
        requestHandler('get',payload,dispatch)
        .then((res) => {
					console.warn('get Promo res', res);
        	if(res.code){
        		if(res.code == 200){
							if(res.data.data.length == 0) {
								// analytics.trackEvent('Unavailable Promo', {product_geted: req.params.name})
							}
							success(res)
							dispatch(actReducer.get_promo(req.params, res.data));
        		}
        	}
        })
        .catch((err) => {
        	console.warn('Search Promo err', err);
        	if(!err.code){
        		// dispatch(actNetwork.set_network_error_status(true));
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
