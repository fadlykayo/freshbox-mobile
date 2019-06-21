package com.freshbox;

import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import com.facebook.react.bridge.ReadableMap;
import com.midtrans.sdk.corekit.callback.TransactionFinishedCallback;
import com.midtrans.sdk.corekit.core.Constants;
import com.midtrans.sdk.corekit.core.LocalDataHandler;
import com.midtrans.sdk.corekit.core.MidtransSDK;
import com.midtrans.sdk.corekit.core.PaymentMethod;
import com.midtrans.sdk.corekit.core.TransactionRequest;
import com.midtrans.sdk.corekit.core.themes.CustomColorTheme;
import com.midtrans.sdk.corekit.models.UserAddress;
import com.midtrans.sdk.corekit.models.UserDetail;
import com.midtrans.sdk.corekit.models.snap.TransactionResult;
import com.midtrans.sdk.uikit.SdkUIFlowBuilder;

import java.util.ArrayList;

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
  public void pay(final String token, ReadableMap transID, ReadableMap userInfo, ReadableMap config, final Callback successCallback) {


      //init SDK
      SdkUIFlowBuilder.init()
              .setClientKey(config.getString("clientKey"))
              .setContext(mContext)
              .setTransactionFinishedCallback(new TransactionFinishedCallback() {
                  public void onTransactionFinished(TransactionResult transactionResult) {
                      if(transactionResult.isTransactionCanceled()){
                          successCallback.invoke("canceled");
                      }
                      else {
                          successCallback.invoke(transactionResult.getStatus());
                      }
                  }
              })
              .setMerchantBaseUrl(config.getString("urlMerchant"))
              .enableLog(true)
              .setColorTheme(new CustomColorTheme("#E52546", "#FFFFFF", "#ACB3BB"))
              .buildSDK();

      //set user detail
      UserDetail userDetail = new UserDetail();
      userDetail.setUserFullName(userInfo.getString("fullName"));
      userDetail.setEmail(userInfo.getString("email"));
      userDetail.setPhoneNumber(userInfo.getString("phoneNumber"));
      userDetail.setUserId(userInfo.getString("userId"));

      //set address (optional)
      ArrayList<UserAddress> userAddresses = new ArrayList<>();
      UserAddress userAddress = new UserAddress();
      userAddress.setAddress(userInfo.getString("address"));
      userAddress.setCity(userInfo.getString("city"));
      userAddress.setCountry(userInfo.getString("country"));
      userAddress.setZipcode(userInfo.getString("zipCode"));
      userAddress.setAddressType(Constants.ADDRESS_TYPE_BOTH);
      userAddresses.add(userAddress);

      userDetail.setUserAddresses(userAddresses);
      LocalDataHandler.saveObject("user_details", userDetail);
      TransactionRequest transactionRequest = new TransactionRequest(transID.getString("order_id"), transID.getInt("gross_amount"));


      MidtransSDK.getInstance().setTransactionRequest(transactionRequest);
      MidtransSDK.getInstance().startPaymentUiFlow(mContext, PaymentMethod.GO_PAY, token);


  }

}