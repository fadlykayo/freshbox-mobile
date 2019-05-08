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

@interface GoPay : NSObject <RCTBridgeModule>
@property (nonatomic, strong) UIWindow *window;
@end
