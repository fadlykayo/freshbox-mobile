//
//  MidtransSavedCardController.m
//  MidtransKit
//
//  Created by Nanang Rafsanjani on 3/2/17.
//  Copyright © 2017 Midtrans. All rights reserved.
//

#import "MidtransSavedCardController.h"
#import "MidtransSavedCardCell.h"
#import "VTClassHelper.h"
#import "MidtransPaymentMethodHeader.h"
#import "MidtransNewCreditCardViewController.h"
#import "MidtransSavedCardFooter.h"
#import "MidtransTransactionDetailViewController.h"
#import "MIdtransUIBorderedView.h"
#import "VTConfirmPaymentController.h"

@interface MidtransSavedCardController () <UITableViewDelegate, UITableViewDataSource, MidtransNewCreditCardViewControllerDelegate>
@property (nonatomic) IBOutlet UITableView *tableView;
@property (nonatomic,strong) MidtransPaymentRequestV2CreditCard *creditCard;
@property (nonatomic,strong) NSMutableArray *cards;
@property (nonatomic) MidtransPaymentMethodHeader *headerView;
@property (nonatomic) MidtransSavedCardFooter *footerView;
@property (nonatomic) MidtransPaymentRequestV2Response * responsePayment;
@property (nonatomic) MTCreditCardPaymentType tokenType;
@property (weak, nonatomic) IBOutlet UILabel *totalAmountLabel;
@property (weak, nonatomic) IBOutlet UILabel *totalAmountText;
@property (weak, nonatomic) IBOutlet MIdtransUIBorderedView *totalAmountBorderedView;
@property (weak, nonatomic) IBOutlet UILabel *orderIdLabel;
@property (nonatomic) NSMutableArray *savedTokenArray;
@end

NSString *const kCreditCardTokenTypeOneClick = @"one_click";
NSString *const kCreditCardTokenTypeTwoClicks = @"two_clicks";

@implementation MidtransSavedCardController
- (instancetype)initWithToken:(MidtransTransactionTokenResponse *)token
            paymentMethodName:(MidtransPaymentListModel *)paymentMethod
            andCreditCardData:(MidtransPaymentRequestV2CreditCard *)creditCard
 andCompleteResponseOfPayment:(MidtransPaymentRequestV2Response *)responsePayment {
    self = [[[self class] alloc] initWithNibName:NSStringFromClass([self class]) bundle:VTBundle];
    if (self) {
        self.token = token;
        self.paymentMethod = paymentMethod;
        self.responsePayment = responsePayment;
        self.creditCard = creditCard;
        
        self.savedTokenArray = [[NSMutableArray alloc]init];
        if (self.creditCard.savedTokens) {
            for (MidtransPaymentRequestV2SavedTokens *savedToken in self.creditCard.savedTokens){
                [self.savedTokenArray addObject:savedToken];
            }
        }
    }
    return self;
}

- (NSString *)bankNameFromNumber:(NSString *)number {
    NSString *bankName;
    for (MidtransPaymentRequestV2SavedTokens *savedToken in self.savedTokenArray) {
        if ([number isEqualToString:savedToken.maskedCard]) {
            bankName = savedToken.binDetails.bankCode.lowercaseString;
            break;
        }
    }
    return  bankName;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.footerView = [[VTBundle loadNibNamed:@"MidtransSavedCardFooter" owner:self options:nil] lastObject];
    [self.footerView.addCardButton addTarget:self action:@selector(addCardPressed:) forControlEvents:UIControlEventTouchUpInside];
      self.totalAmountLabel.text = [self.token.transactionDetails.grossAmount formattedCurrencyNumber];
    self.orderIdLabel.text = self.token.transactionDetails.orderId;
    self.tableView.delegate = self;
    self.tableView.dataSource = self;
    self.tableView.tableFooterView = [UIView new];
    [self.tableView registerNib:[UINib nibWithNibName:@"MidtransSavedCardCell" bundle:VTBundle] forCellReuseIdentifier:@"MidtransSavedCardCell"];
    
    self.cards = [[NSMutableArray alloc] init];
    self.title = [VTClassHelper getTranslationFromAppBundleForString:@"creditcard.list.title"];
    [self.totalAmountBorderedView addGestureRecognizer:
     [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(totalAmountBorderedViewTapped:)]];
    [self reloadSavedCards];

    NSPredicate *oneClickPredicateFilter = [NSPredicate predicateWithFormat:@"%K like %@", NSStringFromSelector(@selector(tokenType)), TokenTypeOneClick];
    BOOL oneClickAvailable = [[self.creditCard.savedTokens filteredArrayUsingPredicate:oneClickPredicateFilter] count] > 0;
    NSPredicate *twoClickPredicateFilter = [NSPredicate predicateWithFormat:@"%K like %@", NSStringFromSelector(@selector(tokenType)), TokenTypeTwoClicks];
    BOOL twoClickAvailable = [[self.creditCard.savedTokens filteredArrayUsingPredicate:twoClickPredicateFilter] count] > 0;
    BOOL installmentRequired = self.responsePayment.creditCard.installments.required;
    BOOL installmentAvailable = self.responsePayment.creditCard.installments.terms.allKeys.count > 0;
    [[NSUserDefaults standardUserDefaults] setObject:@(installmentAvailable) forKey:MIDTRANS_TRACKING_INSTALLMENT_AVAILABLE];
    [[NSUserDefaults standardUserDefaults] setObject:@(installmentRequired) forKey:MIDTRANS_TRACKING_INSTALLMENT_REQUIRED];
    [[SNPUITrackingManager shared] trackEventName:@"pg cc card details" additionalParameters:@{@"installment available": @(installmentAvailable), @"installment required": @(installmentRequired), @"1 click token available": @(oneClickAvailable), @"2 clicks token available": @(twoClickAvailable)}];
}

- (void)reloadSavedCards {
    if (!CC_CONFIG.tokenStorageEnabled) {
        NSArray *savedTokens = [self convertV2ModelCards:self.creditCard.savedTokens];
        [self.cards setArray:savedTokens];
        [self.tableView reloadData];
    }
    else {
        [self showLoadingWithText:nil];
        [[MidtransMerchantClient shared] fetchMaskedCardsCustomer:self.token.customerDetails
                                                       completion:^(NSArray * _Nullable maskedCards, NSError * _Nullable error) {

            if (maskedCards.count > 0) {
                [self.cards setArray:maskedCards];
                [self.tableView reloadData];
            }
            else {
                [self.cards removeAllObjects];
                [self.tableView reloadData];
                MidtransNewCreditCardViewController *vc = [[MidtransNewCreditCardViewController alloc] initWithToken:self.token
                                                                                                   paymentMethodName:self.paymentMethod
                                                                                                   andCreditCardData:self.creditCard
                                                                                        andCompleteResponseOfPayment:self.responsePayment];
               // vc.promos = self.promos;
                [self.navigationController pushViewController:vc animated:NO];
            }
            
            [self hideLoading];
        }];
    }
}

- (NSArray <MidtransMaskedCreditCard*>*)convertV2ModelCards:(NSArray <MidtransPaymentRequestV2SavedTokens*>*)cards {
    NSMutableArray *formattedCards = [NSMutableArray new];
    for (MidtransPaymentRequestV2SavedTokens *card in cards) {
        NSMutableDictionary *dict = [NSMutableDictionary new];
        dict[kMTMaskedCreditCardCardhash] = card.maskedCard;
        dict[kMTMaskedCreditCardExpiresAt] = card.expiresAt;
        dict[kMTMaskedCreditCardTokenType] = card.tokenType;
        dict[kMTMaskedCreditCardIdentifier] = card.token;
        
        MidtransMaskedCreditCard *newCard = [[MidtransMaskedCreditCard alloc] initWithDictionary:dict];
        [formattedCards addObject:newCard];
    }
    return formattedCards;
}

- (void)addCardPressed:(id)sender {
    NSMutableDictionary *additionalData = [NSMutableDictionary dictionaryWithDictionary:@{@"card mode":@"normal"}];
    if (self.responsePayment.transactionDetails.orderId) {
        [additionalData addEntriesFromDictionary:@{@"order id":self.responsePayment.transactionDetails.orderId}];
    }
    [[SNPUITrackingManager shared] trackEventName:@"pg cc card details" additionalParameters:additionalData];
    MidtransNewCreditCardViewController *vc = [[MidtransNewCreditCardViewController alloc] initWithToken:self.token
                                                                                       paymentMethodName:self.paymentMethod
                                                                                       andCreditCardData:self.creditCard
                                                                            andCompleteResponseOfPayment:self.responsePayment];
    if ([[MidtransCreditCardConfig shared] paymentType] == MTCreditCardPaymentTypeOneclick && [[MidtransCreditCardConfig shared] tokenStorageEnabled] == NO) {
        vc.currentMaskedCards = nil;
    } else {
        vc.currentMaskedCards = self.cards;
    }
    [self.navigationController pushViewController:vc animated:YES];
}

- (void)performOneClickWithCard:(MidtransMaskedCreditCard *)card {
    if(self.responsePayment.creditCard.installments.required) {
        UIAlertController *alert = [UIAlertController
                                    alertControllerWithTitle:@"ERROR"
                                    message:[VTClassHelper getTranslationFromAppBundleForString:@"installment-on-one-click"]
                                    preferredStyle:UIAlertControllerStyleAlert];
        UIAlertAction *cancelButton = [UIAlertAction
                                       actionWithTitle:[VTClassHelper getTranslationFromAppBundleForString:@"Close"]
                                       style:UIAlertActionStyleDefault
                                       handler:nil];
        [alert addAction:cancelButton];
        [self presentViewController:alert animated:YES completion:nil];
        return;
    } else {
        if (self.responsePayment.transactionDetails.orderId) {
            [[SNPUITrackingManager shared] trackEventName:@"btn confirm payment"
                                     additionalParameters:@{@"order id":self.responsePayment.transactionDetails.orderId}];
        }
        
        [[SNPUITrackingManager shared] trackEventName:@"btn confirm payment"];
        VTConfirmPaymentController *vc = [[VTConfirmPaymentController alloc] initWithCardNumber:card.maskedNumber
                                                   grossAmount:self.token.transactionDetails.grossAmount];
        
        [vc showOnViewController:self.navigationController clickedButtonsCompletion:^(NSUInteger selectedIndex) {
            if (selectedIndex == 1) {
                [self showLoadingWithText:[VTClassHelper getTranslationFromAppBundleForString:@"Processing your transaction"]];
                
                MidtransPaymentCreditCard *paymentDetail = [MidtransPaymentCreditCard modelWithMaskedCard:card.maskedNumber customer:self.token.customerDetails saveCard:NO installment:nil promos:nil];
                MidtransTransaction *transaction =
                [[MidtransTransaction alloc] initWithPaymentDetails:paymentDetail
                                                              token:self.token];
                
                [[MidtransMerchantClient shared] performTransaction:transaction
                                                         completion:^(MidtransTransactionResult *result, NSError *error) {
                    [self hideLoading];
                    
                    if (error) {
                        [self handleTransactionError:error];
                    } else {
                        [self handleTransactionSuccess:result];
                    }
                }];
            }
        }];
    }
}

- (void)performTwoClicksWithCard:(MidtransMaskedCreditCard *)card {
    MidtransNewCreditCardViewController *vc =
    [[MidtransNewCreditCardViewController alloc] initWithToken:self.token
                                                 paymentMethod:self.paymentMethod
                                                    maskedCard:card
                                                    creditCard:self.creditCard
                                  andCompleteResponseOfPayment:self.responsePayment];
  //  vc.promos = self.promos;
    vc.bankName = [self bankNameFromNumber:card.maskedNumber];
    vc.tokenType = self.tokenType;
    vc.currentMaskedCards = self.cards;
    vc.delegate = self;
    [self.navigationController pushViewController:vc animated:YES];
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return self.cards.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    MidtransSavedCardCell *cell = [tableView dequeueReusableCellWithIdentifier:@"MidtransSavedCardCell"];
    MidtransMaskedCreditCard *card = self.cards[indexPath.row];
    cell.maskedCard = card;
    cell.bankName = [self bankNameFromNumber:card.maskedNumber];
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    MidtransMaskedCreditCard *card = self.cards[indexPath.row];
    if (CC_CONFIG.tokenStorageEnabled) {
        NSMutableDictionary *additionalData = [NSMutableDictionary dictionaryWithDictionary:@{@"card mode":@"two click"}];
        if (self.responsePayment.transactionDetails.orderId) {
            [additionalData addEntriesFromDictionary:@{@"order id":self.responsePayment.transactionDetails.orderId}];
        }
        [[SNPUITrackingManager shared] trackEventName:@"pg cc card details" additionalParameters:additionalData];

        [self performTwoClicksWithCard:card];
    }
    else {
        NSString *tokenTypeString = [[self.responsePayment.creditCard.savedTokens valueForKey:@"tokenType"] objectAtIndex:indexPath.row];
        
        if ([self.responsePayment.merchant.priorityCardFeature isEqualToString:kCreditCardTokenTypeTwoClicks] || !self.responsePayment.merchant.recurringMidIsActive) {
            tokenTypeString = kCreditCardTokenTypeTwoClicks;
        }
        
        if ([tokenTypeString isEqualToString:kCreditCardTokenTypeOneClick]) {
            self.tokenType = MTCreditCardPaymentTypeOneclick;
        } else if ([tokenTypeString isEqualToString:kCreditCardTokenTypeTwoClicks]) {
            self.tokenType = MTCreditCardPaymentTypeTwoclick;
        } else {
            self.tokenType = MTCreditCardPaymentTypeNormal;
        }
            
        NSMutableDictionary *additionalData = [NSMutableDictionary dictionaryWithDictionary:@{@"card mode":@"two click"}];
        if (self.responsePayment.transactionDetails.orderId) {
            [additionalData addEntriesFromDictionary:@{@"order id":self.responsePayment.transactionDetails.orderId}];
        }
        [[SNPUITrackingManager shared] trackEventName:@"pg cc card details" additionalParameters:additionalData];
        [self performTwoClicksWithCard:card];
    }
}
- (void)totalAmountBorderedViewTapped:(id) sender {
    MidtransTransactionDetailViewController *transactionViewController = [[MidtransTransactionDetailViewController alloc] initWithNibName:@"MidtransTransactionDetailViewController" bundle:VTBundle];
    [transactionViewController presentAtPositionOfView:self.totalAmountBorderedView items:self.token.itemDetails grossAmount:self.token.transactionDetails.grossAmount];
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    return 55;
}

- (UIView *)tableView:(UITableView *)tableView viewForFooterInSection:(NSInteger)section {
    return self.footerView;
}

- (CGFloat)tableView:(UITableView *)tableView heightForFooterInSection:(NSInteger)section {
    return 60;
}

- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath {
    return YES;
}

- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath {
    if (editingStyle == UITableViewCellEditingStyleDelete) {
        
        UIAlertController *alert = [UIAlertController
                                    alertControllerWithTitle:[VTClassHelper getTranslationFromAppBundleForString:@"alert.title"]
                                    message:[VTClassHelper getTranslationFromAppBundleForString:@"alert.message-delete-card"]
                                    preferredStyle:UIAlertControllerStyleAlert];
        UIAlertAction *noButton = [UIAlertAction
                                   actionWithTitle:[VTClassHelper getTranslationFromAppBundleForString:@"alert.no"]
                                   style:UIAlertActionStyleDefault
                                   handler:nil];
        UIAlertAction *yesButton = [UIAlertAction
                                    actionWithTitle:[VTClassHelper getTranslationFromAppBundleForString:@"alert.yes"]
                                    style:UIAlertActionStyleDefault
                                    handler:^(UIAlertAction * action) {
            [self confirmDeleteSavedCard:indexPath.row];
        }];
        [alert addAction:noButton];
        [alert addAction:yesButton];
        [self presentViewController:alert animated:YES completion:nil];
    }
}

- (void)confirmDeleteSavedCard:(NSUInteger)cardIndex{
    [self showLoadingWithText:nil];
    if (CC_CONFIG.tokenStorageEnabled == YES) {
        [self.cards removeObjectAtIndex:cardIndex];
        [[MidtransMerchantClient shared] saveMaskedCards:self.cards
                                                customer:self.token.customerDetails
                                              completion:^(id  _Nullable result, NSError * _Nullable error) {
            [self hideLoading];
            [self reloadSavedCards];
        }];
    } else {
        MidtransMaskedCreditCard *maskedCard = self.cards[cardIndex];
        [[MidtransMerchantClient shared] deleteMaskedCreditCard:maskedCard token:self.token completion:^(BOOL success) {
            [self hideLoading];
            
            if (success == NO) {
                return;
            }
            
            NSMutableArray *savedTokensM = self.creditCard.savedTokens.mutableCopy;
            NSUInteger index = [savedTokensM indexOfObjectPassingTest:^BOOL(MidtransPaymentRequestV2SavedTokens *savedToken, NSUInteger idx, BOOL * _Nonnull stop) {
                return [maskedCard.maskedNumber isEqualToString:savedToken.maskedCard];
            }];
            if (index != NSNotFound) {
                [savedTokensM removeObjectAtIndex:index];
            }
            self.creditCard.savedTokens = savedTokensM;
            [self.cards removeObjectAtIndex:cardIndex];
            [self.tableView reloadData];
            
        }];
    }
}

#pragma mark - MidtransNewCreditCardViewControllerDelegate

- (void)didDeleteSavedCard {
    [self.navigationController popToViewController:self animated:YES];
    [self reloadSavedCards];
}

@end
