import ct from '@constants';

const action = {};

action.set_discount_total = (payload) => ({
  type: ct.SET_DISCOUNT_PRICE,
  payload: payload,
})

action.cancel_voucher = (payload) => ({
  type: ct.CANCEL_VOUCHER,
  payload: payload
})


export default action;