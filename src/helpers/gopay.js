import { Platform, NativeModules, NativeEventEmitter } from 'react-native';

const Gopay = NativeModules.GoPay;
const GoPayEventEmitter = new NativeEventEmitter(Gopay);

const gopay = {};

gopay.payment = (snaptoken, midtrans, callback) => {
  if (Platform.OS == 'ios') {
    Gopay.payWithGoPay(midtrans.item_details, midtrans.customer_details, midtrans.transaction_details, snaptoken, (res) => callback(res));
  } else {

    //required
    const config      = {
      clientKey   : "SB-Mid-server-VMgZBx6-OicLLIOpUyv02NHg",
      urlMerchant : "http://ec2-18-236-134-251.us-west-2.compute.amazonaws.com", 
    };

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

export default gopay