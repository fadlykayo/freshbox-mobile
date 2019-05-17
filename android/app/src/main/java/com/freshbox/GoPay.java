//package com.freshbox;
//
//import android.app.Activity;
//
//import com.facebook.react.bridge.Callback;
//import com.facebook.react.bridge.ReactApplicationContext;
//import com.facebook.react.bridge.ReactContext;
//import com.facebook.react.bridge.ReactContextBaseJavaModule;
//import com.facebook.react.bridge.ReactMethod;
//import com.facebook.react.bridge.ReadableArray;
//import com.facebook.react.bridge.ReadableMap;
//import com.facebook.react.bridge.ReadableNativeMap;
//
//import com.midtrans.sdk.corekit.callback.TransactionFinishedCallback;
//import com.midtrans.sdk.corekit.core.Constants;
//import com.midtrans.sdk.corekit.core.LocalDataHandler;
//import com.midtrans.sdk.corekit.core.MidtransSDK;
//import com.midtrans.sdk.corekit.core.SdkCoreFlowBuilder;
//import com.midtrans.sdk.corekit.core.TransactionRequest;
//import com.midtrans.sdk.corekit.core.UIKitCustomSetting;
//import com.midtrans.sdk.corekit.core.themes.CustomColorTheme;
//import com.midtrans.sdk.corekit.models.BankType;
//import com.midtrans.sdk.corekit.models.UserAddress;
//import com.midtrans.sdk.corekit.models.UserDetail;
//import com.midtrans.sdk.corekit.models.snap.CreditCard;
//import com.midtrans.sdk.corekit.models.ItemDetails;
//import com.midtrans.sdk.corekit.models.snap.TransactionResult;
//import com.midtrans.sdk.uikit.SdkUIFlowBuilder;
//
//import java.lang.reflect.Array;
//import java.util.ArrayList;
//import java.util.Map;
//import java.util.HashMap;
//
//public class GoPay extends ReactContextBaseJavaModule {
//
//    private ReactApplicationContext reactContext;
//
//    public GoPay(ReactApplicationContext reactContext) {
//        super(reactContext);
//            this.reactContext = reactContext;
//    }
//
//    @Override
//    public String getName() {
//        return "GoPay";
//    }
//
//    @ReactMethod
//    private void initSDK(String clientkey, String baseUrl) {
//        SdkCoreFlowBuilder.init(reactContext, clientkey, baseUrl)
//                .enableLog(true)
//                .buildSDK();
//    }
//}
