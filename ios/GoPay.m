//
//  GoPay.m
//  Freshbox
//
//  Created by Angga Idabagus on 06/05/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GoPay.h"
#import <MidtransKit/MidtransKit.h>

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
RCT_EXPORT_METHOD(payWithGoPay:(NSArray *) cartItem andUserInfo: (NSObject *) userInfo andAddress: (NSObject *)address callback:(RCTResponseSenderBlock)callback) {
//
//
//  NSMutableArray *items = [[NSMutableArray alloc] init];
//  for (NSDictionary *item in cartItem) {
//
//    MidtransItemDetail *itemDetail = [[MidtransItemDetail alloc] initWithItemID:[item objectForKey:@"item_id"]
//                                          name:[item objectForKey:@"item_name"]
//                                         price:[item objectForKey:@"item_price"]
//                                      quantity:[item objectForKey:@"item_quantity"]];
//
//    [items addObject:itemDetail];
//  }
//
//  MidtransAddress *shippingAddress = [[MidtransAddress alloc] init];
//
//  shippingAddress.firstName = userInfo;
//  shippingAddress.lastName = @"";
//  shippingAddress.phone = @"";
//  shippingAddress.address = @"";
//  shippingAddress.city = @"";
//  shippingAddress.postalCode = @"";
//  shippingAddress.countryCode = @"";
//
//  MidtransAddress *billingAddress = [[MidtransAddress alloc] init];
//
//  shippingAddress.firstName = @"";
//  shippingAddress.lastName = @"";
//  shippingAddress.phone = @"";
//  shippingAddress.address = @"";
//  shippingAddress.city = @"";
//  shippingAddress.postalCode = @"";
//  shippingAddress.countryCode = @"";
//
//  MidtransCustomerDetails *customerDetail =
//  [[MidtransCustomerDetails alloc] initWithFirstName:@"user_firstname"
//                                            lastName:@"user_lastname"
//                                               email:@"user_email"
//                                               phone:@"user_phone"
//                                     shippingAddress:shippingAddress
//                                      billingAddress:billingAddress];
//
//  MidtransTransactionDetails *transactionDetail =
//  [[MidtransTransactionDetails alloc] initWithOrderID:@"order_id"
//                                       andGrossAmount:[items_gross_amount]];
//
//  [[MidtransMerchantClient shared]
//   requestTransactionTokenWithTransactionDetails:transactionDetail
//   itemDetails:items
//   customerDetails:customerDetail
//   completion:^(MidtransTransactionTokenResponse *token, NSError *error)
//   {
//     if (token) {
//
//     }
//     else {
//
//     }
//   }];
//
//  MidtransUIPaymentViewController *paymentVC =
//  [[MidtransUIPaymentViewController alloc] initWithToken:token
//                                       andPaymentFeature:MidtransPaymentFeatureGOPAY];
//  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
//  self.window.rootViewController = paymentVC;
//
//  callback(@[cartItem]);
}

@end
