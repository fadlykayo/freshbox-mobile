import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import moment from 'moment';

import {actNav, navConstant} from '@navigations';
import id from 'moment/locale/id';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import StaticText from '@components/StaticText';
import TotalPrice from '@components/TotalPrice';
import DeliveryDate from './components/DeliveryDate';
import DeliveryPlace from './components/DeliveryPlace';
import DiscountDetail from './components/DiscountDetail';
import AlertDialog from './components/AlertDialog';
import images from '@assets';
import ModalLoginConfirmation from './components/ModalLoginConfirmation';
import styles from './styles';

import {language, hasObjectValue } from '@helpers';
import actions from '@actions';
import FormInput from '@components/FormInput';
import ChangesAreaPopUp from './components/ChangesAreaPopUp'

moment.locale('id', id);

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grandTotalPrice: 0,
      date: null,
      modalVisible: {
        showDeliveryDate: false,
        showPriceDetail: true,
        showDiscountDetail: false,
        showDeliveryTime: false,
        showModalPhone: false,
        changesArea: false,
        confirmAddress: false
      },
      delivery_date: [],
      coupon_code: this.props.coupon_code !== '' ? this.props.coupon_code : '',
      voucherValidation: false,
      payment_type: 'gopay',
      redirect_url: '',
      token: '',
      invoice: '',
      midtrans: '',
      selectedArea: {},
      paymentMethod: ''
    };
    this.getAddress = this.getAddress.bind(this);
    this._renderLabel = this._renderLabel.bind(this);
    this.cancelInvoice = this.cancelInvoice.bind(this);
    this.getDeliveryDate = this.getDeliveryDate.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.getDeliveryPrice = this.getDeliveryPrice.bind(this);
    this.openDeliveryDate = this.openDeliveryDate.bind(this);
    this.navigateToDetail = this.navigateToDetail.bind(this);
    this.closeDeliveryDate = this.closeDeliveryDate.bind(this);
    this.addressDateValidation = this.addressDateValidation.bind(this);
    this.navigateToChooseAddress = this.navigateToChooseAddress.bind(this);
    this.checkBranch = this.checkBranch.bind(this)
    this.onCancelSelectedArea = this.onCancelSelectedArea.bind(this)
    this.onConfirmSelectedArea = this.onConfirmSelectedArea.bind(this)
    this.closePopUpChangesArea = this.closePopUpChangesArea.bind(this)
    // this.onChangeTextVoucher = this.onChangeTextVoucher.bind(this);
    // this.checkVoucherApi = this.checkVoucherApi.bind(this);
  }

  componentDidMount() {
    this.getDeliveryPrice();
    this.getAddress();
    this.apiDeliveryDate();
    this.setVoucherLabel();
    this.messageOrderSuccess();
    this.checkBranch()
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.checkBranch()
      }
    )
  }

  componentWillUnmount() {
    this.willFocusListener.remove()
  }
  
  checkBranch () {
    const branchID = this.props.selectedBranch.id
    let payload = {
			header: {
				apiToken: this.props.user ? this.props.user.authorization : '',
			},
      params: {
        branch_id: branchID
      }
		}

    this.props.check_branch( payload,
      (res) => {
        if (res) {
          if(!hasObjectValue(res.data, 'branch_id')) {
            this.openPopUpChangesArea()
          }
        }
      },
      (err) => {
        if(err !== null || err) {
          const currentIndex = this.props.listBranch.findIndex(list => list.id === err.branch_id)
          const selectedArea = this.props.listBranch[currentIndex]
          this.setState({
            selectedArea: selectedArea
          })
          this.openPopUpChangesArea()
        } else {
          this.openPopUpChangesArea()
        }
      }
    )
  }

  setVoucherLabel() {
    if (this.props.discount == 0) {
      this.setState({
        voucherValidation: false,
      });
    } else {
      this.checkVoucherApi();
    }
  }

  apiDeliveryDate() {
    const branchID = this.props.selectedBranch.id
    let payload = {
      header: {
        apiToken: this.props.user ? this.props.user.authorization : '',
      },
      body: {},
      params: {
        branch_id: branchID
      }
    };
    this.props.get_delivery_date(
      payload,
      () => {
        this.setState({
          delivery_date: this.props.delivery_date.slice(0, 3),
        });
      },
      (err) => {},
    );
  }

  getDeliveryPrice() {
    const branchID = this.props.selectedBranch.id
    let payload = {
      header: {
        apiToken: this.props.user.authorization,
      },
      body: {},
      params: {
        branch_id: branchID
      },
    };

    this.props.get_delivery_price(
      payload,
      () => {
        this.setState({
          grandTotalPrice:
            this.props.delivery_price +
            this.props.totalPrice -
            this.props.discount,
        });
      },
      (err) => {},
    );
  }

  getAddress() {
    let payload = {
      header: {
        apiToken: this.props.user.authorization,
      },
      body: {},
      params: {},
    };
    this.props.get_address(
      payload,
      () => {},
      (err) => {},
    );
  }

  setModalVisible(type, value) {
    let modalVisible = this.state.modalVisible;
    modalVisible[type] = value;
    this.setState({modalVisible});
  }

  getDeliveryDate(payload) {
    this.setState(
      {
        date: {
          origin: payload,
          display: moment(payload).format('dddd, Do MMMM YYYY'),
          value: moment(payload).format('YYYY-MM-DD HH:mm:ss'),
        },
      },
      this.closeDeliveryDate,
    );
  }

  getDeliveryTime = (payload) => {
    this.setState(
      {
        delivery_time: payload,
      },
      this.closeDeliveryDate,
    );
  };

  navigateToChooseAddress() {
    actNav.navigate(navConstant.ChooseAddress, {
      action: 'checkout',
      key: true
    });
  }

  addressDateValidation = (method) => {
    let address = this.props.addresses.filter(
      (address) => address.primary == 1,
    );
    if (address.length == 0) {
      language.transformText('message.emptyAddress').then((message) => {
        this.props.set_error_status({
          status: true,
          title: 'formError.title.emptyAddress',
          data: message,
        });
      });
    } else {
      if (this.state.date == null) {
        language.transformText('message.emptyDate').then((message) => {
          this.props.set_error_status({
            status: true,
            title: 'formError.title.emptyDate',
            data: message,
          });
        });
      } else {
        let today = new Date();
        let todayHour = today.getHours();
        let todayMin = today.getMinutes();
        let tomorrowDate = today.getDate() + 1;
        let stateDate = new Date(this.state.date.origin).getDate();
        if (todayHour <= 21 || (todayHour == 21 && todayMin < 55)) {
          this.setState({
            paymentMethod: method,
          }, () => {
            this.setModalVisible('confirmAddress', true);
          })
        } else {
          if (tomorrowDate == stateDate) {
            language
              .transformText('message.expiredDate', 'id', {
                date: this.state.date.display ? this.state.date.dispatch : '',
              })
              .then((message) => {
                this.props.set_error_status({
                  status: true,
                  title: 'formError.title.expiredDate',
                  data: message,
                });
              });
          } else {
            this.setState({
              paymentMethod: method,
            }, () => {
              this.setModalVisible('confirmAddress', true);
            })
          }
        }
      }
    }
  };

  onConfirmAddress = () => {
    this.setModalVisible('confirmAddress', false);
    this.navigateToChoosePayment(this.state.paymentMethod);
  }
  onCancelAddress = () => {
    this.setState({
      paymentMethod: '',
    }, () => this.setModalVisible('confirmAddress', false))
  }

  cancelInvoice(token) {
    let payload = {
      header: {
        apiToken: this.props.user ? this.props.user.authorization : '',
      },
      body: {
        token: token,
      },
    };

    this.props.cancel_checkout(
      payload,
      (res) => {},
      (rej) => {},
    );
  }

  navigateToDetail(address) {
    let payload = {};

    payload.address_code = address.code;
    payload.request_shipping_date = this.state.date.value;

    actNav.navigate(navConstant.Detail, {
      action: 'checkout',
      transaction: payload,
      date: this.state.date,
      cancelInvoice: this.cancelInvoice,
      ...this.props.navigation.state.params,
    });
  }

  openDeliveryDate() {
    this.setModalVisible('showDeliveryDate', true);
  }

  openPopUpChangesArea() {
    this.setModalVisible('changesArea', true);
  }

  closePopUpChangesArea() {
    this.setModalVisible('changesArea', false);
  }

  onConfirmSelectedArea = async () => {
    await this.navigateToChooseAddress()
    await this.closePopUpChangesArea()
  }

  onCancelSelectedArea = () =>  {
    this.closePopUpChangesArea()
    this.props.change_branch(this.state.selectedArea)
    actNav.reset(navConstant.Dashboard);
  }

  closeDeliveryDate() {
    this.setModalVisible('showDeliveryDate', false);
    this.setModalVisible('showDeliveryTime', false);
  }
  openDiscountDetail = () => {
    this.setModalVisible('showDiscountDetail', true);
  };
  closeDiscountDetail = () => {
    this.setModalVisible('showDiscountDetail', false);
  };
  showDeliveryTime = () => {
    this.setModalVisible('showDeliveryTime', true);
  };

  renderDateInfoText = () => {
    let selectedDate = this.state.date?.origin;
    if (
      selectedDate &&
      moment(selectedDate).diff(
        moment(this.props.delivery_date[3].current_system_time),
        'day',
      ) === 0 &&
      moment(this.props.delivery_date[3].current_system_time).diff(
        moment(this.props.delivery_date[3].current_closing_time),
        'minute',
      ) >= -60 &&
      moment(this.props.delivery_date[3].current_system_time).diff(
        moment(this.props.delivery_date[3].current_closing_time),
        'minute',
      ) < 0
    ) {
      return (
        <Text style={styles.text.confirmDate2}>
          Pembayaran yang kami terima di atas jam{' '}
          {moment(this.props.delivery_date[3].current_closing_time).format(
            'HH:mm',
          )}
          , akan berpotensi dikrimkan pada hari{' '}
          {moment(this.props.delivery_date[1]).format('dddd, DD MMMM YYYY')}!
        </Text>
      );
    }

    return (
      <StaticText
        property="checkout.content.confirmDate"
        style={styles.text.confirmDate}
      />
    );
  };

  _renderLabel() {
    if (this.state.date == null) {
      return null;
    } else {
      return (
        <View style={styles.subcontainer.label}>
          <StaticText
            style={styles.text.label}
            property={'checkout.content.chooseDate'}
          />
        </View>
      );
    }
  }

  _renderVoucherInput = () => {
    return (
      <View style={styles.subcontainer.voucher.container}>
        <FormInput
          type={'voucher'}
          autoFocus={false}
          value={this.state.coupon_code}
          onChangeText={this.onChangeTextVoucher}
          label={'checkout.label.voucher'}
          placeholder={'checkout.placeholder.voucher'}
          voucherAPI={this.checkVoucherApi}
          statusVerification={this.state.voucherValidation}
          editable={this.state.voucherValidation ? false : true}
          cancelVoucherAPI={this.cancelVoucherAPI}
        />
      </View>
    );
  };

  onChangeTextVoucher = (type, value) => {
    let coupon_code = this.state.coupon_code;
    coupon_code = value;
    this.setState({coupon_code});
  };

  checkVoucherApi = () => {
    let payload = {
      header: {
        apiToken: this.props.user ? this.props.user.authorization : '',
      },
      body: {
        coupon_code:
          this.props.coupon_code == ''
            ? this.state.coupon_code
            : this.props.coupon_code,
        subtotal: this.props.totalPrice,
        branch_id: this.props.selectedBranch.id
      },
    };

    this.props.check_voucher_api(
      payload,
      (res) => {
        let state = this.state;
        state.grandTotalPrice = this.props.totalPrice;
        state.voucherValidation = true;
        this.setState(state);
      },
      (rej) => {
        let state = this.state;
        state.grandTotalPrice =
          this.props.delivery_price +
          this.props.totalPrice -
          this.props.discount;
        state.voucherValidation = false;
        this.setState(state);
      },
    );
  };

  cancelVoucherAPI = () => {
    if (this.props.coupon_code !== '' && this.state.voucherValidation == true) {
      let payload = {
        header: {
          apiToken: this.props.user ? this.props.user.authorization : '',
        },
        body: {
          coupon_code:
            this.props.coupon_code == ''
              ? this.state.coupon_code
              : this.props.coupon_code,
          // subtotal: this.props.totalPrice
        },
      };

      this.props.cancel_voucher(
        payload,
        (res) => {
          let state = this.state;
          state.grandTotalPrice =
            this.props.delivery_price +
            this.props.totalPrice -
            this.props.discount;
          state.voucherValidation = false;
          this.setState(state);
        },
        (rej) => {},
      );
    }
  };

  navigateToChoosePayment = (method) => {
    let address = this.props.addresses.filter(
      (address) => address.primary == 1,
    )[0];

    let payload = {
      header: {
        apiToken: this.props.user ? this.props.user.authorization : '',
      },
      body: {
        address_code: address.code,
        request_shipping_date: this.state.date.value,
        cash_on_delivery: method == 'cod' ? true : false,
        coupon_code: this.props.coupon_code,
        discount_ammount: this.props.discount,
        payment_type: method,
        branch_id: this.props.selectedBranch.id
      }
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
              if (this.state.redirect_url.length !== 0) {
                actNav.navigate(navConstant.ChoosePayment, {
                  ...this.props.navigation.state.params,
                  token: this.state.token,
                  invoice: this.state.invoice,
                  redirect_url: this.state.redirect_url,
                  midtrans: this.state.midtrans,
                  //gopay: method == 'gopay' ? true : false,
                  method: method,
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
              this.validateTransactionStatus();
            },
          );
        }
      },
      (rej) => {
        if (rej.data.update_profile) {
          this.setState({
            modalVisible: {
              ...this.state.modalVisible,
              showModalPhone: true,
            },
          });
        }
      },
    );
  };

  validateTransactionStatus = (paymentMethod, midtransObject) => {
    let payload = {
      header: {
        apiToken: this.props.user.authorization,
      },
      type: 'validation',
      invoice: this.state.invoice,
      // params: {
      //   branch_id: this.props.selectedBranch.id
      // }
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
            this.props.navigation.state.params.createOrderHandler(
              res.data.invoice,
              res.data.payment_method,
            );
          },
        );
      },
      (err) => {
        if (paymentMethod == 'gopay') {
          this.cancelGopayInvoice(midtransObject.transaction_details.order_id);
        } else {
          this.props.set_error_status({
            status: true,
            data: 'Pembayaran batal dilakukan.',
            title: 'formError.title.paymentCanceled',
          });
        }
      },
    );
  };

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
      () => console.log(),
    );
  }

  messageOrderSuccess = () => {
    if (this.props.navigation.state.params.createOrderSuccess) {
      if (this.props.navigation.state.params.invoice == 'credit_card') {
        language.transformText('message.paymentSuccess').then((message) => {
          this.props.set_success_status({
            status: true,
            data: message,
            title: 'formSuccess.title.createOrder',
          });
        });
        this.props.navigation.state.params.createOrderSuccess = null;
      } else {
        language.transformText('message.createOrderSuccess').then((message) => {
          this.props.set_success_status({
            status: true,
            data: message,
            title: 'formSuccess.title.createOrder',
          });
        });
      }
    }
  };

  render() {
    return (
      <Container bgColorBottom={'veryLightGrey'} bgColorTop={'red'}>
        <NavigationBar
          cancelVoucher={this.cancelVoucherAPI}
          title={'checkout.navigationTitle'}
        />
        <ModalLoginConfirmation
          button={'button.ok'}
          message={'modal.content.addPhoneNumber'}
          onPress={() => {
            actNav.navigate(navConstant.PhonePage, {
              type: 'otp',
              isName: true,
            });
          }}
          onCloseModal={() => {
            this.setState({
              modalVisible: {
                ...this.state.modalVisible,
                showModalPhone: false,
              },
            });
          }}
          modalVisible={this.state.modalVisible.showModalPhone}
        />
        <ModalLoginConfirmation
          button={'changesArea.button.next'}
          message={'modal.content.addAddress'}
          onPress={this.onConfirmSelectedArea}
          modalVisible={this.state.modalVisible.changesArea}
          onCloseModal={() => {}}
        />
        <ScrollView style={styles.container}>
          {this._renderVoucherInput()}
          <DeliveryPlace
            type={'white'}
            address={'checkout.content.otherAddress'}
            addAddress={'checkout.content.addAddress'}
            addresses={this.props.addresses}
            onPress={this.navigateToChooseAddress}
          />
          <View style={styles.subcontainer.bottom}>
            {/* {this._renderLabel()} */}
            <TouchableOpacity
              style={styles.subcontainer.buttonDate}
              onPress={this.openDeliveryDate}>
              {this.state.date == null ? (
                <StaticText
                  style={styles.text.date}
                  property={'checkout.content.chooseDate'}
                />
              ) : (
                <Text style={styles.text.dateChoosen}>
                  {this.state.date.display}
                </Text>
              )}

              <View style={styles.subcontainer.icon}>
                <Image source={images.icon_calendar} style={styles.icon} />
              </View>
            </TouchableOpacity>

            <View style={styles.subcontainer.info.container}>
              <Image
                style={styles.subcontainer.info.icon}
                source={images.ic_info_grey}
              />
              <View>{this.renderDateInfoText()}</View>
            </View>
          </View>
          <View style={styles.subcontainer.totalprice}>
            <TotalPrice
              type={'red'}
              title={'checkout.content.checkout'}
              subTotal={this.props.totalPrice}
              grandTotal={this.state.grandTotalPrice}
              delivery_price={this.props.delivery_price}
              discount={this.props.discount}
              onPress={this.addressDateValidation}
              action={'checkout'}
              additional={this.props.additional}
              checkout={true}
              freeShipping={this.props.minimumTrxFreeShippingCost}
              openDiscountDetail={this.openDiscountDetail}
            />
          </View>

          <View style={styles.subcontainer.paymentMethod}>
            <View style={styles.subcontainer.paymentText}>
              <StaticText
                style={styles.paymentText}
                property={'checkout.content.payment'}
              />
            </View>
            <View style={styles.outerContainer}>
              <TouchableOpacity
                onPress={() => this.addressDateValidation('transfer')}>
                <View style={styles.radioContainer}>
                  <StaticText
                    style={styles.text.methods}
                    property={'checkout.methods.transfer'}
                  />
                  <View style={styles.payment.imageContainer('transfer')}>
                    <Image
                      resizeMode={'contain'}
                      source={images.icon_logo_bca}
                      style={styles.bank.bca}
                    />
                    <Image
                      resizeMode={'contain'}
                      source={images.icon_logo_mandiri}
                      style={styles.bank.mandiri}
                    />
                    <Image
                      resizeMode={'contain'}
                      source={images.bri_bank}
                      style={styles.bank.bri}
                    />
                  </View>
                  <Image
                    resizeMode={'contain'}
                    source={images.icon_arrow_right_red}
                    style={styles.icon}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.addressDateValidation('credit_card')}>
                <View style={styles.radioContainer}>
                  <StaticText
                    style={styles.text.methods}
                    property={'checkout.methods.creditCard'}
                  />
                  <View style={styles.payment.imageContainer('credit_card')}>
                    <Image
                      // resizeMode={'contain'}
                      source={images.icon_visa}
                      style={styles.bank.visa}
                    />
                    <Image
                      resizeMode={'contain'}
                      source={images.master_card}
                      style={styles.bank.master}
                    />
                  </View>
                  <Image
                    resizeMode={'contain'}
                    source={images.icon_arrow_right_red}
                    style={styles.icon}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.addressDateValidation('gopay')}>
                <View style={styles.radioContainer}>
                  <StaticText
                    style={styles.text.methods}
                    property={'checkout.methods.gopay'}
                  />
                  <View style={styles.payment.imageContainer('gopay')}>
                    <Image
                      resizeMode={'contain'}
                      source={images.logo_gopay}
                      style={styles.bank.gopay}
                    />
                  </View>
                  <Image
                    resizeMode={'contain'}
                    source={images.icon_arrow_right_red}
                    style={styles.icon}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

          <AlertDialog
            modalVisible={this.state.modalVisible.confirmAddress}
            content={'checkout.label.alertDialog'}
            subcontent={this.props.addresses}
            requestHandler={this.onConfirmAddress}
            requestCancel={this.onCancelAddress}
          />

        <DeliveryDate
          getDeliveryDate={this.getDeliveryDate}
          modalVisible={this.state.modalVisible.showDeliveryDate}
          closeDeliveryDate={this.closeDeliveryDate}
          dates={this.state.delivery_date}
          // dateChosen				=	{this.state.date.origin}
        />
        <DiscountDetail
          getDeliveryDate={this.getDeliveryDate}
          modalVisible={this.state.modalVisible.showDiscountDetail}
          closeDeliveryDate={this.closeDiscountDetail}
          dates={this.state.delivery_date}
          freeShipping={this.props.minimumTrxFreeShippingCost}
          additional={this.props.additional}
          delivery_price={this.props.delivery_price}
          discount={this.props.discount}
          subTotal={this.props.totalPrice}
          grandTotal={this.state.grandTotalPrice}
        />
        {/* {this.renderPriceDetail()} */}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.data,
  addresses: state.user.address,
  notif: state.notif.notification,
  totalPrice: state.product.total.price,
  discount: state.product.discount,
  coupon_code: state.product.coupon_code,
  delivery_price: state.product.delivery_price,
  minimumTrxFreeShippingCost: state.product.minimumTrxFreeShippingCost,
  delivery_date: state.utility.delivery_date,
  additional: state.product.additional.credit_card,
  cart: state.product.cart.products,
  selectedBranch: state.utility.selectedBranch,
  listBranch: state.utility.listBranch,
});

const mapDispatchToProps = (dispatch) => ({
  get_address: (req, res, err) =>
    dispatch(actions.user.api.get_address(req, res, err)),
  set_error_status: (payload) =>
    dispatch(actions.network.reducer.set_error_status(payload)),
  cancel_checkout: (req, res, err) =>
    dispatch(actions.transaction.api.cancel_checkout(req, res, err)),
  get_delivery_price: (req, res, err) =>
    dispatch(actions.product.api.get_delivery_price(req, res, err)),
  get_delivery_date: (req, res, err) =>
    dispatch(actions.utility.api.delivery_date(req, res, err)),
  check_voucher_api: (req, res, err) =>
    dispatch(actions.voucher.api.checkVoucherValidity(req, res, err)),
  cancel_voucher: (req, res, err) =>
    dispatch(actions.voucher.api.cancel_voucher(req, res, err)),
  request_snap_token: (req, res, err) =>
    dispatch(actions.transaction.api.request_snap_token(req, res, err)),
  cancel_invoice: (req, res, err) =>
    dispatch(actions.transaction.api.cancel_invoice(req, res, err)),
  detail_transaction: (req, res, err) =>
    dispatch(actions.transaction.api.detail_transaction(req, res, err)),
  check_branch: (req,res,err) => dispatch(actions.utility.api.check_branch(req,res,err)),
  change_branch: (payload) =>
    dispatch(actions.utility.reducer.change_branch(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
