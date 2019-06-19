package com.freshbox;

import android.content.Context;
import android.util.Log;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import com.midtrans.sdk.corekit.*;
import com.midtrans.sdk.corekit.callback.TransactionCallback;
import com.midtrans.sdk.corekit.callback.TransactionFinishedCallback;
import com.midtrans.sdk.corekit.core.Constants;
import com.midtrans.sdk.corekit.core.LocalDataHandler;
import com.midtrans.sdk.corekit.core.MidtransSDK;
import com.midtrans.sdk.corekit.core.PaymentMethod;
import com.midtrans.sdk.corekit.core.SdkCoreFlowBuilder;
import com.midtrans.sdk.corekit.core.TransactionRequest;
import com.midtrans.sdk.corekit.core.UIKitCustomSetting;
import com.midtrans.sdk.corekit.core.themes.CustomColorTheme;
import com.midtrans.sdk.corekit.models.BankType;
import com.midtrans.sdk.corekit.models.TransactionResponse;
import com.midtrans.sdk.corekit.models.UserAddress;
import com.midtrans.sdk.corekit.models.UserDetail;
import com.midtrans.sdk.corekit.models.snap.CreditCard;
import com.midtrans.sdk.corekit.models.ItemDetails;
import com.midtrans.sdk.corekit.models.snap.TransactionResult;
import com.midtrans.sdk.uikit.PaymentMethods;
import com.midtrans.sdk.uikit.SdkUIFlowBuilder;
// import com.midtrans.sdk.uikit.SdkUIFlowBuilder;

import java.util.Map;
import java.util.HashMap;

public class GoPayModule extends ReactContextBaseJavaModule {

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  private Context mContext;

  public GoPayModule(ReactApplicationContext reactContext) {
      super(reactContext);
      mContext = reactContext;
  }

  @Override
  public String getName() {
    return "GoPay";
  }

  @ReactMethod
  public void pay(final String message, final Callback successCallbackå) {

//      SdkUIFlowBuilder.init()
//              .setClientKey("SB-Mid-server-VMgZBx6-OicLLIOpUyv02NHg")
//              .setContext(mContext)
//              .setTransactionFinishedCallback(new TransactionFinishedCallback() {
//                  @Override
//                  public void onTransactionFinished(TransactionResult transactionResult, Callback cb) {
//                      cb.invoke("Success");
//                  }
//              })
//              .setMerchantBaseUrl("http://ec2-18-236-134-251.us-west-2.compute.amazonaws.com")
//              .enableLog(true)
//              .setColorTheme(new CustomColorTheme("#FFE51255", "#B61548", "#FFE51255"))
//              .buildSDK();

//   successCallback.invoke(MidtransSDK);
//    successCallback.invoke(message);
//    String snapToken = MidtransSDK.getInstance().readAuthenticationToken();
//      TransactionRequest transactionRequest = new TransactionRequest();
//      transactionRequest.setGopay(new Gopay("demo://midtrans"));
//    MidtransSDK.getInstance().paymentUsingGoPay(message, new TransactionCallback() {
//      @Override
//      public void onSuccess(TransactionResponse response) {
//        // This is paymentDeeplink, so you can making payment with GO-PAY by calling this deeplink into GO-JEK app.
//        String paymentDeeplink = response.getDeeplinkUrl();
//        successCallback.invoke(paymentDeeplink);
//      }
//
//      @Override
//      public void onFailure(TransactionResponse response, String reason) {
//        successCallback.invoke(reason);
//      }
//
//      @Override
//      public void onError(Throwable error) {
//          Log.i("onFailure","Throwable ",error);
//      }
//    });
      MidtransSDK.getInstance().startPaymentUiFlow(mContext, PaymentMethod.GO_PAY, message);
  }

}