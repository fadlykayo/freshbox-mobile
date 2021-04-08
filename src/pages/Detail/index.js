import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  ScrollView,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  Platform,
  BackHandler,
} from 'react-native';
import moment from 'moment';
import {actNav, navConstant} from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import DetailOrder from './components/DetailOrder';
import CartComponent from './components/CartComponent';
import TotalPrice from './components/TotalPrice';
import AlertDialog from '@components/AlertDialog';
import {language, analytics} from '@helpers';
import styles from './styles';
import actions from '@actions';

const BANK_TRANSFER = 'bank_transfer';

class Detail extends Component {
  constructor(props) {
    super(props);
    (this.state = {
      status: 'historyDetail.content.checkout',
      totalPrice: 0,
      deliveryPrice: 0,
      grandTotalPrice: 0,
      redirect_url: '',
      token: '',
      invoice: '',
      midtrans: '',
      refreshing: false,
      isNavigateBack: false,
      modalVisible: {
        alertDialog: false,
        reorder: false,
      },
      radio: [
        {
          name: 'cod',
          status: false,
        },
        {
          name: 'transfer',
          status: true,
        },
        {
          name: 'gopay',
          status: false,
        },
        {
          name: 'credit_card',
          status: false,
        },
      ],
      payment_type: 'transfer',
    }),
      (this._onRefresh = this._onRefresh.bind(this));
    this.navigateBack = this.navigateBack.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.navigateToCart = this.navigateToCart.bind(this);
    this.refreshHandler = this.refreshHandler.bind(this);
    this.getDeliveryPrice = this.getDeliveryPrice.bind(this);
    this.clearNotification = this.clearNotification.bind(this);
    this.messageOrderSuccess = this.messageOrderSuccess.bind(this);
    this.setDetailTransaction = this.setDetailTransaction.bind(this);
    this.toggleFavoriteHistory = this.toggleFavoriteHistory.bind(this);
    this.navigateToChoosePayment = this.navigateToChoosePayment.bind(this);
    this.validateTransactionStatus = this.validateTransactionStatus.bind(this);
    this.navigateToTransferInstruction = this.navigateToTransferInstruction.bind(
      this,
    );
    this.onPressRadio = this.onPressRadio.bind(this);
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillUnmount() {
    if (this.state.isNavigateBack == true) {
      if (this.props.navigation.state.params.refreshHandler) {
        if (this.props.navigation.state.params.fromThanksPage) {
          return null;
        } else {
          this.props.navigation.state.params.refreshHandler();
        }
      } else {
        if (
          this.props.navigation.state.params.cancelInvoice &&
          this.state.token.length > 0
        ) {
          this.props.navigation.state.params.cancelInvoice(this.state.token);
        }
      }
    }
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidMount() {
    this.setDetailTransaction();
    this.messageOrderSuccess();
    this.clearNotification();
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    // console.warn(this.props.detailTransaction.sub_total)
  }

  // handleBackButtonClick = () => {
  // 	if(this.props.navigation.state.params.fromThanksPage) {
  // 		this.props.set_success_status({
  // 			status: false,
  // 			data: '',
  // 		});
  // 	} else {
  // 		this.props.navigation.state.params.refreshHandler();
  // 		console.warn('back .....')
  // 	}
  // }

  clearNotification() {
    if (this.props.notif) {
      this.props.reset_notification();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.detailTransaction.status !== nextState.status) {
      this.setState({
        status: nextProps.detailTransaction.status,
      })
    }

    return true;
  }

  //status itu payment method
  validateTransactionStatus(paymentMethod, midtransObject) {
    let payload = {
      header: {
        apiToken: this.props.user.authorization,
      },
      type: 'validation',
      invoice: this.state.invoice,
    };
    this.props.detail_transaction(
      payload,
      (res) => {
        this.setState(
          {
            token: '',
            invoice: '',
            redirect_url: '',
          },
          () => {
            // analytics.trackEvent('Purchase Orders', {status: 'Success'})
            this.props.navigation.state.params.createOrderHandler(
              res.data.invoice,
            );
          },
        );
      },
      (err) => {
        if (paymentMethod == 'gopay') {
          this.cancelGopayInvoice(midtransObject.transaction_details.order_id);
          // analytics.trackEvent('Purchase Orders', {status: 'Failed'})
        } else {
          this.props.set_error_status({
            status: true,
            data: 'Pembayaran batal dilakukan.',
            title: 'formError.title.paymentCanceled',
          });
        }
      },
    );
  }

  cancelGopayInvoice(invoice) {
    let payload = {
      header: {
        apiToken: this.props.user.authorization,
      },
      body: {
        invoice: invoice,
      },
      info: 'gopay',
    };

    this.props.cancel_invoice(
      payload,
      () => actNav.navigate(navConstant.Product),
      (err) => {},
    );
  }

  messageOrderSuccess() {
    if (this.props.navigation.state.params.createOrderSuccess) {
      if (this.props.navigation.state.params.invoice == 'credit_card' || this.props.navigation.state.params.invoice == 'gopay') {
        language.transformText('message.paymentSuccess').then((message) => {
          this.props.set_success_status({
            status: true,
            data: message,
            title: 'formSuccess.title.createOrder',
          });
        });
        this.props.navigation.state.params.createOrderSuccess = null;
      } else if (this.props.detailTransaction.status === 'pending_payment') {
        language
          .transformText('message.createOrderSuccess')
          .then((message) => {
            this.props.set_success_status({
              status: true,
              data: message,
              title: 'formSuccess.title.createOrder',
            });
          });
      } else if (this.props.detailTransaction.status === 'paid') {
        const {request_shipping_date, request_shipping_date_old} = this.props.detailTransaction
        const dateDisplay = moment(request_shipping_date).format('dddd, Do MMMM YYYY');
        const dateDisplayOld = request_shipping_date_old && moment(request_shipping_date_old).format('dddd, Do MMMM YYYY') || moment(request_shipping_date).format('dddd, Do MMMM YYYY');

        if(dateDisplay !== dateDisplayOld) {
          let newDate = moment(request_shipping_date).format('dddd, Do MMMM YYYY')
          this.props.set_success_status({
            status: true,
            data: `Pesanan akan dikirimkan tanggal ${newDate} karena pembayaran anda melewati batas waktu untuk pengiriman besok.`,
            title: 'formSuccess.title.paymentSuccess',
          });
        }
      }
    } else {
      this.props.set_error_status({
        status: true,
        data: 'Pembayaran batal dilakukan.',
        title: 'formError.title.paymentCanceled',
      });
    }
  }

  setDetailTransaction() {
    if (this.props.navigation.state.params.action == 'history') {
      this.setState({
        status: this.props.detailTransaction.status,
        totalPrice: this.props.detailTransaction.sub_total,
        deliveryPrice: this.props.detailTransaction.shipping_cost,
        grandTotalPrice:
          this.props.detailTransaction.grand_total -
          this.props.detailTransaction.discount_ammount,
      });
    } else {
      this.getDeliveryPrice();
    }
  }

  getDeliveryPrice() {
    let payload = {
      header: {
        apiToken: this.props.user.authorization,
      },
      body: {},
      params: {},
    };

    this.props.get_delivery_price(
      payload,
      () => {
        this.setState({
          status: 'historyDetail.content.checkout',
          totalPrice: this.props.totalPrice,
          deliveryPrice: this.props.delivery_price,
          grandTotalPrice:
            this.props.delivery_price +
            this.props.totalPrice -
            this.props.discount,
        });
      },
      (err) => {},
    );
  }

  toggleFavorite(payload) {
    if (payload.wishlisted == 1) {
      let data = {
        request: {
          header: {
            apiToken: this.props.user.authorization,
          },
          body: {},
        },
        favorite: payload,
      };
      this.props.delete_favorite(
        data,
        () => {},
        (err) => {},
      );
    } else {
      let data = {
        request: {
          header: {
            apiToken: this.props.user.authorization,
          },
          body: {
            product_code: payload.code,
          },
        },
        favorite: payload,
      };
      this.props.add_favorite(
        data,
        () => {},
        (err) => {},
      );
    }
  }

  toggleFavoriteHistory(payload) {
    if (payload.product.wishlisted == 1) {
      let data = {
        request: {
          header: {
            apiToken: this.props.user.authorization,
          },
          body: {},
        },
        favorite: payload,
      };
      this.props.delete_favorite_history(
        data,
        () => {},
        (err) => {},
      );
    } else {
      let data = {
        request: {
          header: {
            apiToken: this.props.user.authorization,
          },
          body: {
            product_code: payload.product.code,
          },
        },
        favorite: payload,
      };

      this.props.add_favorite_history(
        data,
        () => {},
        (err) => {},
      );
    }
  }

  navigateToCart() {
    //test
    const branchID = this.props.selectedBranch.id
    let payload = {
      header: {
        apiToken: this.props.user.authorization,
      },
      invoice: this.props.detailTransaction.invoice,
      body: {
        branch_id: branchID
      }
    };

    this.props.reorder_transaction(
      payload,
      (res) => {
        if(res) {
          const data = this.checkCart(res.data)
          let payloadData = {
            header: {
              apiToken: this.props.user.authorization,
            },
            body: data,
          };
          this.props.bulk_add_products(
            payloadData,
            (res) => {
              // this.getCart()
              if(res) {
                actNav.reset(navConstant.Dashboard, {
                  action: 'reorder',
                });
              }
            },
            (err) => {
              console.warn(err);
            },
          );
        }
      },
      (err) => {},
    );
  }
  checkCart = (cart_product) => {
    let buyProducts = [];
      cart_product.map((cart) => {
        buyProducts.push({
          product_code: cart.product.code,
          qty: cart.product.count,
          status_promo: cart.product.on_promo,
          cart_price: cart.product.price,
          cart_promo_price:
            Number(cart.product.on_promo) === 1
              ? cart.product.banner_harga_jual
                ? cart.product.banner_harga_jual
                : cart.product.promo_price
              : cart.product.promo_price,
          remaining_quota:
            Number(cart.product.on_promo) === 1
              ? Number(cart.product.quota_claim) > 0
                ? Number(cart.product.quota_claim) -
                  Number(cart.product.total_claim_product || 0)
                : 0
              : 0,
          quota_claim: Number(cart.product.quota_claim || 0),
        });
      });


      return buyProducts
  }

  navigateToChoosePayment() {
    // if(this.state.token.length == 0){

    let address = this.props.addresses.filter(
      (address) => address.primary == 1,
    )[0];

    let payload = {
      header: {
        apiToken: this.props.user ? this.props.user.authorization : '',
      },
      body: {
        address_code: address.code,
        request_shipping_date: this.props.navigation.state.params.date.value,
        cash_on_delivery: this.state.radio[0].status,
        coupon_code: this.props.coupon_code,
        discount_ammount: this.props.discount,
        payment_type: this.state.payment_type,
      },
    };

    this.props.request_snap_token(
      payload,
      (res) => {
        if (res.redirect_url) {
          this.setState(
            {
              token: res.token,
              invoice: res.invoice,
              redirect_url: res.redirect_url,
              midtrans: res.midtrans_json,
            },
            () => {
              if (this.state.radio[2].status == true) {
                // analytics.trackEvent('Preferred Payment Method', {Method: 'GoPay'});
              } else {
                // analytics.trackEvent('Preferred Payment Method', {Method: 'Transfer/CreditCard'});
              }

              if (this.state.redirect_url.length !== 0) {
                actNav.navigate(navConstant.ChoosePayment, {
                  ...this.props.navigation.state.params,
                  token: this.state.token,
                  invoice: this.state.invoice,
                  redirect_url: this.state.redirect_url,
                  midtrans: this.state.midtrans,
                  gopay: this.state.radio[2].status,
                  validateTransactionStatus: this.validateTransactionStatus,
                });
              } else {
                this.validateTransactionStatus();
              }
            },
          );
        } else {
          this.setState(
            {
              invoice: res.invoice,
            },
            () => {
              // analytics.trackEvent('Preferred Payment Method', {Method: 'Cash On Delivery'});
              this.validateTransactionStatus();
            },
          );
        }
      },
      (rej) => {},
    );
  }

  navigateToTransferInstruction() {
    actNav.navigate(navConstant.TransferInstruction, {
      refreshHandler: this.refreshHandler,
    });
  }

  navigateBack(key) {
    this.setState(
      {
        isNavigateBack: true,
      },
      () => {
        if (key) {
          actNav.goBack(key);
        } else {
          actNav.goBack();
        }
      },
    );
  }

  refreshHandler() {
    this.setState({refreshing: true}, () => {
      this._onRefresh();
    });
  }

  _onRefresh() {
    let payload = {
      header: {
        apiToken: this.props.user.authorization,
      },
      invoice: this.props.detailTransaction.invoice,
    };

    this.props.detail_transaction(
      payload,
      () => {
        if (this.state.refreshing) {
          this.setState({refreshing: false});
        }
      },
      (err) => {},
    );
  }

  onPressRadio(type) {
    let radio = this.state.radio;

    for (let index = 0; index < radio.length; index++) {
      if (radio[index].name == type) {
        radio[index].status = !radio[index].status;
      } else {
        radio[index].status = false;
      }
    }
    this.setState({
      radio: radio,
      payment_type: type,
    });
  }

  clearCartAndReorder = () => {
    return new Promise((resolve) => {
      this.props.clear_products();
      resolve();
    }).then(() => {
      this.navigateToCart();
    });
  };

  cancelInvoice = () => {
    let payload = {
      header: {
        apiToken: this.props.user.authorization,
      },
      body: {
        invoice: this.props.detailTransaction.invoice,
      },
    };
    this.props.cancel_invoice(
      payload,
      () => {
        this.setModalVisible('alertDialog', false);
        actNav.goBack();
      },
      () => {
        this.setModalVisible('alertDialog', false);
      },
    );
  };

  cancelAlert = () => {
    this.setModalVisible('alertDialog', false);
  };

  alertReorder = () => {
    if (this.props.cart_product.length > 0) {
      this.setModalVisible('reorder', true);
    } else {
      this.navigateToCart();
    }
  };
  cancelReorder = () => {
    this.setModalVisible('reorder', false);
  };

  setModalVisible = (type, value) => {
    let modalVisible = JSON.parse(JSON.stringify(this.state.modalVisible));
    modalVisible[type] = value;
    this.setState({modalVisible});
  };

  
  render() {
    return (
      <Container bgColorBottom={'veryLightGrey'} bgColorTop={'red'}>
        <NavigationBar
          title={'historyDetail.navigationTitle'}
          onPress={this.navigateBack}
        />
        <ScrollView
          refreshControl={
            this.props.navigation.state.params.action == 'history' ? (
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.refreshHandler}
              />
            ) : null
          }
          style={styles.container}>
          <DetailOrder
            setDate={this.props.navigation.state.params.date}
            addresses={this.props.addresses}
            transaction={this.props.detailTransaction}
            status={this.state.status}
            action={this.props.navigation.state.params.action}
          />
          <View style={styles.subcontainer}>
            <FlatList
              data={
                this.props.navigation.state.params.action == 'history'
                  ? this.props.detailTransaction.details
                  : this.props.cart_product
              }
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item, index}) => (
                <CartComponent
                  data={item}
                  index={index}
                  toggleFavorite={this.toggleFavorite}
                  toggleFavoriteHistory={this.toggleFavoriteHistory}
                  action={this.props.navigation.state.params.action}
                />
              )}
            />
          </View>
        </ScrollView>
        {this.props.navigation.state.params.action !== 'history' ? (
          <View style={styles.outerContainer}>
            <View style={styles.radioContainer}>
              <Text style={styles.text}>Transfer</Text>
              <TouchableOpacity onPress={() => this.onPressRadio('transfer')}>
                <View style={styles.radioOuter}>
                  <View style={styles.radioInner(this.state.radio[1].status)} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.radioContainer}>
              <Text style={styles.text}>CreditCard</Text>
              <TouchableOpacity
                onPress={() => this.onPressRadio('credit_card')}>
                <View style={styles.radioOuter}>
                  <View style={styles.radioInner(this.state.radio[3].status)} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.radioContainer}>
              <Text style={styles.text}>GoPay</Text>
              <TouchableOpacity onPress={() => this.onPressRadio('gopay')}>
                <View style={styles.radioOuter}>
                  <View style={styles.radioInner(this.state.radio[2].status)} />
                </View>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.radioContainer}>
									<View>
										<Text style={styles.text}>Cash On Delivery (COD)</Text>

										{
											this.state.radio[0].status ?
											<Text style={styles.codText}>Pembayaran dengan metode COD tidak dapat dibatalkan</Text> :
											null
										}

									</View>
									<TouchableOpacity onPress = {() => this.onPressRadio('cod')}><View style={styles.radioOuter}><View style={styles.radioInner(this.state.radio[0].status)}></View></View></TouchableOpacity>
								</View> */}
          </View>
        ) : null}

        <TotalPrice
          type={'red'}
          status={this.state.status}
          paymentMethod={this.props.detailTransaction.payment_method}
          additional={this.props.additional}
          subTotal={this.props.totalPrice}
          navigateToCart={this.alertReorder}
          grandTotal={this.state.grandTotalPrice}
          delivery_price={this.state.deliveryPrice}
          action={this.props.navigation.state.params.action}
          subtotalHistory={this.props.detailTransaction.sub_total}
          navigateToChoosePayment={this.navigateToChoosePayment}
          navigateToTransferInstruction={this.navigateToTransferInstruction}
          discount={
            this.props.detailTransaction.discount_ammount > 0
              ? this.props.detailTransaction.discount_ammount
              : this.props.discount
          }
          freeShipping={this.props.minimumTrxFreeShippingCost}
          modalVisible={this.setModalVisible}
        />
        <AlertDialog
          modalVisible={this.state.modalVisible.alertDialog}
          content={'dialog.cancelInvoice'}
          requestHandler={this.cancelInvoice}
          requestCancel={this.cancelAlert}
        />
        <AlertDialog
          modalVisible={this.state.modalVisible.reorder}
          content={'dialog.reorder'}
          requestHandler={this.clearCartAndReorder}
          requestCancel={this.cancelReorder}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.data,
  addresses: state.user.address,
  notif: state.notif.notification,
  totalPrice: state.product.total.price,
  cart_product: state.product.cart.products,
  detailTransaction: state.transaction.detail,
  transactions: state.transaction.transactions,
  delivery_price: state.product.delivery_price,
  minimumTrxFreeShippingCost: state.product.minimumTrxFreeShippingCost,
  additional: state.product.additional.credit_card,
  discount: state.product.discount,
  coupon_code: state.product.coupon_code,
  selectedBranch: state.utility.selectedBranch,
});

const mapDispatchToProps = (dispatch) => ({
  reset_notification: () =>
    dispatch(actions.notif.reducer.reset_notification()),
  toggle_favorite: (index) =>
    dispatch(actions.product.reducer.toggle_favorite(index)),
  add_favorite: (req, res, err) =>
    dispatch(actions.product.api.add_favorite(req, res, err)),
  set_error_status: (payload) =>
    dispatch(actions.network.reducer.set_error_status(payload)),
  delete_favorite: (req, res, err) =>
    dispatch(actions.product.api.delete_favorite(req, res, err)),
  set_success_status: (payload) =>
    dispatch(actions.network.reducer.set_success_status(payload)),
  get_delivery_price: (req, res, err) =>
    dispatch(actions.product.api.get_delivery_price(req, res, err)),
  request_snap_token: (req, res, err) =>
    dispatch(actions.transaction.api.request_snap_token(req, res, err)),
  clear_products: () => dispatch(actions.product.reducer.clear_products()),
  detail_transaction: (req, res, err) =>
    dispatch(actions.transaction.api.detail_transaction(req, res, err)),
  reorder_transaction: (req, res, err) =>
    dispatch(actions.transaction.api.reorder_transaction(req, res, err)),
  add_favorite_history: (req, res, err) =>
    dispatch(actions.transaction.api.add_favorite_history(req, res, err)),
  delete_favorite_history: (req, res, err) =>
    dispatch(actions.transaction.api.delete_favorite_history(req, res, err)),
  cancel_invoice: (req, res, err) =>
    dispatch(actions.transaction.api.cancel_invoice(req, res, err)),
    bulk_add_products: (req, res, err) =>
    dispatch(actions.transaction.api.bulk_add_products(req, res, err)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
