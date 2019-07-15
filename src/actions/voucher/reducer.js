import ct from '@constants';

const action = {};

action.set_discount_total = (payload) => ({
  type: ct.SET_DISCOUNT_PRICE,
  payload: payload,
})

action.cancel_voucher = () => ({
  type: ct.CANCEL_VOUCHER,
})


export default action;