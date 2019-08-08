/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>
#import <AppCenterReactNativeCrashes/AppCenterReactNativeCrashes.h>
#import <AppCenterReactNativeAnalytics/AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNative/AppCenterReactNative.h>
#import <React/RCTBundleURLProvider.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <RNGoogleSignin.h>
#import <React/RCTLinkingManager.h>
#import <MidtransKit/MidtransKit.h>
#import <Firebase.h>

@implementation AppDelegate
@synthesize oneSignal = _oneSignal;
@synthesize rootView = _rootView;


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [AppCenterReactNativeCrashes registerWithAutomaticProcessing];  // Initialize AppCenter crashes
  [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];  // Initialize AppCenter analytics
  [AppCenterReactNative register];  // Initialize AppCenter
  [FIRApp configure]; //Firebase Init
  NSURL *jsCodeLocation;

  
  #ifdef DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  #else
    jsCodeLocation = [CodePush bundleURL];
  #endif

  
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];

  self.rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Freshbox"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  self.rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  self.oneSignal = [[RCTOneSignal alloc] initWithLaunchOptions:launchOptions
                                                         appId:@"1a6751a7-bcef-4a4c-8ae5-f95484cede94"
                                                      settings:@{kOSSettingsKeyInFocusDisplayOption : @(OSNotificationDisplayTypeNotification), kOSSettingsKeyAutoPrompt : @YES}];
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = self.rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}


- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
  
  BOOL FBSDKHandler = [[FBSDKApplicationDelegate sharedInstance]
                        application:application
                        openURL:url
                        sourceApplication:sourceApplication
                        annotation:annotation
 ];
  
  BOOL GoogleHandler = [RNGoogleSignin application:application
                                           openURL:url
                                 sourceApplication:sourceApplication
                                        annotation:annotation
                        ];
  BOOL RCT = [RCTLinkingManager application:application openURL:url
              sourceApplication:sourceApplication annotation:annotation];
  
  return FBSDKHandler || GoogleHandler || RCT;
  
//  return [[FBSDKApplicationDelegate sharedInstance] application:application
//                                                        openURL:url
//                                              sourceApplication:sourceApplication
//                                                     annotation:annotation
//          ]
//  || [RNGoogleSignin application:application
//                         openURL:url
//               sourceApplication:sourceApplication
//                      annotation:annotation
  //      ];
}

- (void)goToNativeView:(MidtransUIPaymentViewController *)paymentVC  {
  self.window.rootViewController = paymentVC;
}

- (void)goToReactNative {
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = self.rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
}

@end
