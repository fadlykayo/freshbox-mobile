import { Platform, NativeModules, NativeEventEmitter } from 'react-native';
import Config from '@config';

const Gopay = NativeModules.GoPay;
const GoPayEventEmitter = new NativeEventEmitter(Gopay);

const gopay = {};

gopay.payment = (snaptoken, midtrans, callback) => {

  let config = {};

  if(Config.env == 'production') {
    config      = {
      clientKey   : 'Mid-server-d0vVkAso9h39yw3KYzxG7NJg',
      environment: 'production',
      urlMerchant : 'https://api.freshbox.id/', 
    };
  } else {
    config      = {
      clientKey   : "SB-Mid-server-VMgZBx6-OicLLIOpUyv02NHg",
      environment: 'sandbox',
      urlMerchant : "http://ec2-18-236-134-251.us-west-2.compute.amazonaws.com", 
    };
  }
    

  if (Platform.OS == 'ios') {
    Gopay.payWithGoPay(config, midtrans.item_details, midtrans.customer_details, midtrans.transaction_details, snaptoken, (res) => callback(res));
  } else {



    //required
    const transID     = midtrans.transaction_details;

    //optional (user can input later on their UI)
    const userDetail  = {
      fullName    : midtrans.customer_details.first_name + midtrans.customer_details.last_name,
      email       : midtrans.customer_details.email,
      phoneNumber : midtrans.customer_details.phone,
      userId      : "U01", 
      address     : "jakarta", 
      city        : "jakarta", 
      country     : "IDN", 
      zipCode     : "59382"
    };

    Gopay.pay(snaptoken, transID, userDetail, config, (res) => callback(res));

  }
}

gopay.responseListener = (eventHandler) => {
  GoPayEventEmitter.addListener (
    'onPaymentResult',
    (result) => eventHandler(result)
  );
}

gopay.removeResponseListener = () => {
  GoPayEventEmitter.removeListener();
}

gopay.checkPaymentGopayStatus = () => {
  Gopay.checkPaymentGopayStatus();
}

export default gopay