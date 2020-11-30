#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <React/RCTRootView.h>
#import <MidtransKit/MidtransKit.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;
@property (strong, nonatomic) RCTRootView *rootView;

- (void)goToNativeView:(MidtransUIPaymentViewController *)paymentVC;
- (void)goToReactNative;

@end
