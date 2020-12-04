// import Analytics from 'appcenter-analytics';
import { firebase } from '@react-native-firebase/analytics';
import {store} from '../store';

const Analytics = firebase.analytics();
const analysis = {};

analysis.init = () => {
  Analytics.setAnalyticsCollectionEnabled(true);
};

analysis.logEvent = (eventName) => {
  let payload = store.getState().product.cart;

  switch (eventName) {
    case 'Cart':
      Analytics.logEvent('add_to_cart', {cart_items: payload});
      break;
    case 'Checkout':
      Analytics.logEvent('begin_checkout', {cart_items: payload});
    case 'ChoosePayment':
      Analytics.logEvent('ecommerce_purchase', {cart_items: payload});
    default:
      break;
  }
};

analysis.log = (type, payload) => {
  Analytics.logEvent(type, payload);
};

analysis.setCurrentScreen = async (screenName) => {
  await Analytics.logEvent(screenName, {screenName})
};

export default analysis;
