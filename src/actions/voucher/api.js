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
              data: res.code_message
            }))
            failure();
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
          case 403: return dispatch(actNetwork.set_error_status({
            status: true,
            data: err.data.coupon_code[0]
          }));
          failure();
          default:
          dispatch(actNetwork.set_error_status({
            status: true,
            data: err.code_message
          }));
        }
      }
    })
    //testing
    // let successResponse = {
    //   "code": 200,
    //   "code_message": "Success",
    //   "code_type": "success",
    //   "data": [
    //     {
    //       "coupon_code": "INSTALLAPPS",
    //       "type": "Discount",
    //       "category": "Percentage",
    //       "amount": 50,
    //       "min_purchase": 100000,
    //       "description": "Kupon diskon untuk pengguna baru",
    //       "product_id": 1,
    //       "limit_usage": 0,
    //       "start_date": "2019-12-01 00:00:00",
    //       "expiry_date": "2019-12-30 00:00:00"
    //     }
    //   ]
    // };

    // let invalidCode = {
    //   "code": 403,
    //   "code_message": "Please check your input again.",
    //   "code_type": "validationFail",
    //   "data": {
    //       "coupon_code": [
    //           "The selected coupon code is invalid."
    //       ]
    //   }
    // };

    // let invalidAmount = {
    //   "code": 200,
    //   "code_message": "You havent reached the minimum order amount",
    //   "code_type": "success",
    //   "data": []
    // };

    // let res;

    // if(req.body.coupon_code) {
    //   if(req.body.coupon_code == 'INSTALLAPPS') {
    //     if(req.body.subtotal >= 50000) {
    //       res = successResponse
    //     } else {
    //       res = invalidAmount
    //     }
    //   } else {
    //     res = invalidCode
    //   }
    // } else {
    //   res = invalidCode
    // }
    
    
    // setTimeout(() => {
    //   if(res.code == 403) {
    //     dispatch(actNetwork.set_error_status({
    //       status: true,
    //       data: res.code_message
    //     }));
    //     failure();
    //   } else {
    //     if (!res.data.length) {
    //       dispatch(actNetwork.set_error_status({
    //       status: true,
    //       data: res.code_message
    //     }));
    //     failure();
    //     } else {
    //       dispatch(actReducer.set_discount_total(res.data));
    //       success(res.data);
    //     }
    //   }
    // }, 500);

  }
}

actions.cancel_voucher = (req, success, failure) => {
  // payload.path = path.cancelVoucher;
  // payload.header = req.header;
  // payload.body = req.body;
  return dispatch => {
    // requestHandler('post', payload, dispatch)
    // .then((res) => {
    //   if(res.code){
    //     if(res.code == 200) {
    //       if(!res.data.length) {
    //         dispatch(actNetwork.set_error_status({
    //           status: true,
    //           data: err.code_message
    //         }))
    //       } else {
    //         dispatch(actReducer.set_discount_total(res.data))
    //         success();
    //       }
    //     }
    //   }
    // })
    // .catch((err) => {
    //   if(!err.code){
    //     dispatch(actNetwork.set_network_error_status(true));
    //   } else {
    //     switch(err.code){
    //       case 400: return failure(err);
    //       default:
    //       dispatch(actNetwork.set_error_status({
    //         status: true,
    //         data: err.code_message
    //       }));
    //     }
    //   }
    // })
    dispatch(actReducer.cancel_voucher());
    success()
  }
}

export default actions;
