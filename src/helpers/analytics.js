// import Analytics from 'appcenter-analytics';
import firebase from 'react-native-firebase';
import { store } from '../store';


const Analytics = firebase.analytics();
const analysis = {};

analysis.init = () => {
  Analytics.setAnalyticsCollectionEnabled(true);
}

analysis.logEvent = (eventName) => {
  console.log('ini store di analytics', store.getState());

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

  
}

analysis.setCurrentScreen = (screenName) => {
  Analytics.setCurrentScreen(screenName, screenName);
}

export default analysis