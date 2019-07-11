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

actions.checkVoucherValidity = (req, success, failure) => {

  payload.path = path.checkVoucher;
  payload.header = req.header;
  payload.body = req.body;

  return dispatch => {
    requestHandler('post', payload, dispatch)
    .then((res) => {
      if(res.code){
        if(res.code == 200) {
          if(!res.data.length) {
            dispatch(actNetwork.set_error_status({
              status: true,
              data: err.code_message
            }))
          } else {
            dispatch(actReducer.set_discount_total(res.data))
            success();
          }
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
            data: err.code_message
          }));
        }
      }
    })
  }
}

export default actions;
