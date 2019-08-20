package com.freshbox;

import android.app.Application;

//import com.facebook.BuildConfig;
import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
// //
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
// // this is the import that fixed my issue
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import com.microsoft.codepush.react.CodePush;
import com.microsoft.codepush.react.CodePush;
import com.oblador.vectoricons.VectorIconsPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.imagepicker.ImagePickerPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.freshbox.GoPayPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected String getJSBundleFile(){
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
            new RNFirebasePackage(),
            new RNFirebaseAnalyticsPackage(),
            // new RNFirebaseMessagingPackage(),
            // new RNFirebaseNotificationsPackage(),
        new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
        new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appCenterCrashes_whenToSendCrashes)),
        new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appCenterAnalytics_whenToEnableAnalytics)),
        new AppCenterReactNativePackage(MainApplication.this),
        new LinearGradientPackage(),
        new ImagePickerPackage(),
        new ReactNativeOneSignalPackage(),
        new RNGoogleSigninPackage(),
        new FBSDKPackage(mCallbackManager),
        new VectorIconsPackage(),
        new GoPayPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
