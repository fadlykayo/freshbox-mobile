//
//  GoPay.h
//  Freshbox
//
//  Created by Angga Idabagus on 06/05/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>
#import <MidtransKit/MidtransKit.h>
#import <React/RCTComponent.h>
#import <React/RCTEventEmitter.h>

@interface GoPay : RCTEventEmitter <RCTBridgeModule, MidtransUIPaymentViewControllerDelegate>

@property (nonatomic, copy) RCTBubblingEventBlock onPaymentStatusChange;

@end
