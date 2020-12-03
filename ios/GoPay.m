//
//  GoPay.m
//  Freshbox
//
//  Created by Angga Idabagus on 06/05/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>
#import "GoPay.h"
#import "AppDelegate.h"
//#import "MidtransMerchantClient.h"

@implementation GoPay

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}


RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"onPaymentResult"];
}

//RCT_EXPORT_METHOD(checkPaymentGopayStatus) {
//  [[MidtransMerchantClient shared] performCheckStatusTransactionWcompletion:^(MidtransTransactionResult * _Nullable result, NSError * _Nullable error) {
//    if (!error) {
//      if (result.statusCode == 200) {
////        [self sendEventWithName:@"onPaymentResult" body:@{@"result": result}];
//      }
//    } else {
//      //handle error
//    }
//  }];
//}

RCT_EXPORT_METHOD(payWithGoPay:(NSDictionary *)config andItemDetails: (NSArray *) item_details andCustomerDetails: (NSDictionary *)customer_details
                  andTransactionDetail: (NSDictionary *) transaction_detail andToken: (NSString *) tokenID  callback:(RCTResponseSenderBlock)callback) {
  //staging
  if ([[config objectForKey:@"environment"]  isEqual: @"sandbox"]) {
    [CONFIG setClientKey:[config objectForKey:@"clientKey"]
            environment:MidtransServerEnvironmentSandbox
            merchantServerURL:[config objectForKey:@"urlMerchant"]];
  } else {
    [CONFIG setClientKey:[config objectForKey:@"clientKey"]
            environment:MidtransServerEnvironmentProduction
            merchantServerURL:[config objectForKey:@"urlMerchant"]];
  }
  
  
  
  
  NSMutableArray *items = [[NSMutableArray alloc] init];
  for (NSDictionary *item in item_details) {
    
    MidtransItemDetail *itemDetail = [[MidtransItemDetail alloc] initWithItemID:[item objectForKey:@"id"]
                                                                           name:[item objectForKey:@"name"]
                                                                          price:[item objectForKey:@"price"]
                                                                       quantity:[item objectForKey:@"quantity"]];
    
    [items addObject:itemDetail];
  }
  
  MidtransAddress *shippingAddress = [MidtransAddress addressWithFirstName:@"Angga" lastName:@"IdaBagus" phone:@"087877280598" address:@"Jalan Jalan" city:@"Jakarta" postalCode:@"11630" countryCode:@"+62"];
  
  MidtransAddress *billingAddress = [MidtransAddress addressWithFirstName:@"Angga" lastName:@"IdaBagus" phone:@"087877280598" address:@"Jalan Jalan" city:@"Jakarta" postalCode:@"11630" countryCode:@"+62"];
  
  
  MidtransCustomerDetails *customerDetail =
  [[MidtransCustomerDetails alloc] initWithFirstName:[customer_details objectForKey:@"first_name"]
                                            lastName:[customer_details objectForKey:@"last_name"]
                                               email:[customer_details objectForKey:@"email"]
                                               phone:[customer_details objectForKey:@"phone"]
                                     shippingAddress:shippingAddress
                                      billingAddress:billingAddress];
  
  MidtransTransactionDetails *transactionDetail =
  [[MidtransTransactionDetails alloc] initWithOrderID:[transaction_detail objectForKey:@"order_id"]
                                       andGrossAmount:[transaction_detail objectForKey:@"gross_amount"]];
  
  NSDictionary *dic = @{ @"tokenId" : tokenID,
                         @"transactionDetails" : transactionDetail,
                         @"customerDetails" : customerDetail,
                         @"itemDetails" : items};
  
  MidtransTransactionTokenResponse *token = [MidtransTransactionTokenResponse modelObjectWithDictionary:dic transactionDetails:transactionDetail customerDetails:customerDetail itemDetails:items];
  token.tokenId=tokenID;
  
  MidtransUIPaymentViewController *paymentVC = [[MidtransUIPaymentViewController alloc] initWithToken:token
                                                                                    andPaymentFeature:MidtransPaymentFeatureGOPAY];
  paymentVC.paymentDelegate = self;
  
 
  
  AppDelegate *appDelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
  [appDelegate goToNativeView:paymentVC];
  


}


#pragma mark - MidtransUIPaymentViewControllerDelegate

- (void)paymentViewController:(MidtransUIPaymentViewController *)viewController paymentSuccess:(MidtransTransactionResult *)result {
//  NSLog(@"success: %@", result);
//  _onPaymentStatusChange(@{
//                           @"status": @"Success"
//                           });
//  [self sendEventWithName:@"onPaymentResult" body:@{@"result": result}];
  if(result) {
    [self sendEventWithName:@"onPaymentResult" body:@{@"result": @"success"}];
    AppDelegate *appDelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
    [appDelegate goToReactNative];
    
  }
//  NSString *Msg = @"Success";
}

- (void)paymentViewController:(MidtransUIPaymentViewController *)viewController paymentFailed:(NSError *)error {
//  NSString *Msg = @"Failed";
  if(error) {
    [self sendEventWithName:@"onPaymentResult" body:@{@"result": @"failed"}];
    AppDelegate *appDelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
    [appDelegate goToReactNative];
  }
}

- (void)paymentViewController:(MidtransUIPaymentViewController *)viewController paymentPending:(MidtransTransactionResult *)result {
//  _onPaymentStatusChange(@{
//                           @"status": @"Pending"
//                           });
  
  if(result) {
    [self sendEventWithName:@"onPaymentResult" body:@{@"result": @"pending"}];
    AppDelegate *appDelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
    [appDelegate goToReactNative];
  }
  
  
  NSLog(@"pending: %@", result);
//  NSString *Msg = @"Pending";
}

- (void)paymentViewController_paymentCanceled:(MidtransUIPaymentViewController *)viewController {
  NSLog(@"canceled");
//  NSString *Msg = @"Canceled";
  AppDelegate *appDelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
  [appDelegate goToReactNative];
}

- (void)paymentViewController:(MidtransUIPaymentViewController *)viewController saveCard:(MidtransMaskedCreditCard *)result {
  
}


- (void)paymentViewController:(MidtransUIPaymentViewController *)viewController saveCardFailed:(NSError *)error {
  
}


@end
