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
          if(res.data.grand_total_diskon <= 0 || res.data.grand_total_diskon == null) {
            
            if(!res.data.length) {
              dispatch(actReducer.cancel_voucher(req.body.subtotal)); 
              dispatch(actNetwork.set_error_status({
                status: true,
                data: res.code_message
              }))
              
              
              failure();
            } 
          } else {
            dispatch(actReducer.set_discount_total(res.data))
            success();
          }
          
        }
      }
    })
    .catch((err) => {
      console.warn(err)
      if(!err.code){
        dispatch(actNetwork.set_network_error_status(true));
      } else {
        switch(err.code){
          case 400: 
          dispatch(actReducer.cancel_voucher(req.body.subtotal)); 
          failure(err); 
          break
          case 403: 
          dispatch(actReducer.cancel_voucher(req.body.subtotal)); 
          dispatch(actNetwork.set_error_status({
            status: true,
            data: err.data.coupon_code[0]
          }));
          failure();
          break;
          default:
          dispatch(actReducer.cancel_voucher(req.body.subtotal)); 
          dispatch(actNetwork.set_error_status({
            status: true,
            data: err.code_message
          }));
          failure();
          break;
        }
      }
    })

  }
}

actions.cancel_voucher = (req, success, failure) => {

  payload.path = path.cancelVoucher;
  payload.header = req.header;
  payload.body = req.body;
  // return dispatch => {
  //   requestHandler('post', payload, dispatch)
  //   .then((res) => {
  //     // console.log('cancel voucher success', res)
  //     if(res.code){
  //       if(res.code == 200) {
  //         dispatch(actReducer.cancel_voucher(req.body.subtotal));
  //         success();
  //       }
  //     }
  //   })
  //   .catch((err) => {
  //     // console.log('cancel voucher err', err)
  //     if(!err.code){
  //       dispatch(actNetwork.set_network_error_status(true));
  //     } else {
  //       switch(err.code){
  //         case 400: return failure(err);
  //         default:
  //         dispatch(actNetwork.set_error_status({
  //           status: true,
  //           data: err.code_message
  //         }));
  //         failure(err);
  //       }
  //     }
  //   })
  // }
  return dispatch => {
      dispatch(actReducer.cancel_voucher(req.body.subtotal));
      success();
  }
}

export default actions;
