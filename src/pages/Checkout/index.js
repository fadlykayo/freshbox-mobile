import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { actNav, navConstant } from '@navigations';
import moment, { min } from 'moment';
import id from 'moment/locale/id';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import StaticText from '@components/StaticText';
import TotalPrice from '@components/TotalPrice';
import DeliveryDate from './components/DeliveryDate';
import DeliveryPlace from './components/DeliveryPlace';
import images from '@assets';
import styles from './styles';
import { language } from '@helpers';
import actions from '@actions';
import FormInput from '@components/FormInput';

moment.locale('id',id);

class Checkout extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
			grandTotalPrice: 0,
			date: null,
			modalVisible:{
				showDeliveryDate: false,
				showPriceDetail: true,
			},
			delivery_date: [],
			coupon_code: this.props.coupon_code !== '' ? this.props.coupon_code : '',
			voucherValidation: false,
			payment_type: 'gopay',
			redirect_url: '',
			token: '',
			invoice: '',
			midtrans: '',
			
		}
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
		// this.onChangeTextVoucher = this.onChangeTextVoucher.bind(this);
		// this.checkVoucherApi = this.checkVoucherApi.bind(this);
	}

	componentDidMount() {
		this.getDeliveryPrice();
		this.getAddress();
		this.apiDeliveryDate();
		this.setVoucherLabel();
		this.messageOrderSuccess();
	}

	setVoucherLabel() {
		if(this.props.discount == 0) {
			this.setState({
				voucherValidation: false
			})
		} else {
			this.checkVoucherApi();
		}
	}

	apiDeliveryDate() {
		let payload = {
			header: {
				apiToken: this.props.user ? this.props.user.authorization : ''
			},
			body: {},
			params: {}
		}
		this.props.get_delivery_date(
			payload,
			() => {
				let state = this.state;
				state.delivery_date = this.props.delivery_date
				// console.warn(state.delivery_date)
				this.setState(state)
				// console.warn('success')
			},
			(err) => {
				
			}
		)
	}

	getDeliveryPrice() {
		let payload = {
			header: {
				apiToken: this.props.user.authorization
			},
			body: {},
			params: {}
		}

		this.props.get_delivery_price(payload, 
			() => {
				let state = this.state;

				console.log('min trans', this.props.minimumTrxFreeShippingCost)

				

				state.grandTotalPrice = this.props.delivery_price + this.props.totalPrice - this.props.discount

				this.setState(state)
			},
			(err) => {
				// console.log(err)
			}
		)
	}

	getAddress() {
		let payload = {
			header: {
				apiToken: this.props.user.authorization
			},
			body: {},
			params: {}
		}
		this.props.get_address(payload, 
			() => {

			},
			(err) => {
				// console.log(err)
			}
		)
	}

	setModalVisible(type,value){
        let modalVisible = this.state.modalVisible;
        modalVisible[type] = value;
        this.setState({modalVisible});
    }

	getDeliveryDate(payload){
		this.setState({
			date:{
				origin: payload,
				display: moment(payload).format('dddd, Do MMMM YYYY'),
				value: moment(payload).format('YYYY-MM-DD HH:mm:ss'),
			}
		},this.closeDeliveryDate)
	}

	navigateToChooseAddress(){
		actNav.navigate(navConstant.ChooseAddress);
	}

	addressDateValidation = (method) =>{
		let address = this.props.addresses.filter(address => address.primary == 1);
		if(address.length == 0){
			language.transformText('message.emptyAddress')
			.then(message => {
				this.props.set_error_status({
					status: true,
					title: 'formError.title.emptyAddress',
					data: message,
				});
			});
		}
		else{
			if(this.state.date == null){
				language.transformText('message.emptyDate')
				.then(message => {
					this.props.set_error_status({
						status: true,
						title: 'formError.title.emptyDate',
						data: message,
					});
				});
			}
			else{
				let today = new Date();
				let todayHour = today.getHours();
				let todayMin = today.getMinutes();
				let tomorrowDate = today.getDate()+1;
				let stateDate = new Date(this.state.date.origin).getDate();
				if(todayHour <= 21 || (todayHour == 21 && todayMin < 55)){
					this.navigateToChoosePayment(method);
				} else {
					if(tomorrowDate == stateDate){
						language.transformText('message.expiredDate','id',{
							date: this.state.date.display ? this.state.date.dispatch : '',
						})
						.then(message => {
							this.props.set_error_status({
								status: true,
								title: 'formError.title.expiredDate',
								data: message,
							});
						});
					}
					else{
						this.navigateToChoosePayment(method);
					}
				}
			}
		}
	}

	cancelInvoice(token){
        let payload = {
			header: {
				apiToken: this.props.user ? this.props.user.authorization : ''
			},
			body: {
                token: token,
            }
        }
        
        this.props.cancel_checkout(payload,
            res => {
				// console.log(res);
            },
            rej => {

            }
        );
	}

	navigateToDetail(address){
		let payload = {};
		
		payload.address_code = address.code;
		payload.request_shipping_date = this.state.date.value;

		actNav.navigate(navConstant.Detail, 
			{
				action: 'checkout', 
				transaction: payload, 
				date: this.state.date,
				cancelInvoice: this.cancelInvoice,
				...this.props.navigation.state.params
			}
		)
	}
	
	openDeliveryDate() {
		this.setModalVisible('showDeliveryDate',true);
	}
	
	closeDeliveryDate(){
		this.setModalVisible('showDeliveryDate',false);
    }
	
	_renderLabel() {
		if (this.state.date == null) return null;
		else return (
			<View style={styles.subcontainer.label}>
				<StaticText
					style={styles.text.label}
					property={'checkout.content.chooseDate'}
				/>
			</View>
		)
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
					// multiline={true}

				/>
			</View>
		)
	}

	onChangeTextVoucher = (type, value) => {
		let coupon_code = this.state.coupon_code;
		coupon_code = value;
		this.setState({coupon_code});
	}

	checkVoucherApi = () => {
		let payload = {
			header: {
				apiToken: this.props.user ? this.props.user.authorization : ''
			},
			body: {
				coupon_code: this.props.coupon_code == '' ? this.state.coupon_code : this.props.coupon_code,
				subtotal: this.props.totalPrice,
			}
		}
        
		this.props.check_voucher_api(payload,
			res => {
				let state = this.state;
				state.grandTotalPrice = this.props.totalPrice - this.props.discount
				state.voucherValidation = true;
				this.setState(state);
			},
			rej => {
				let state = this.state;
				state.grandTotalPrice = this.props.totalPrice - this.props.discount
				state.voucherValidation = false;
				this.setState(state);
			}
		);
	}

	cancelVoucherAPI = () => {
		if(this.props.coupon_code !== '' && this.state.voucherValidation == true) {
			
			let payload = {
				header: {
					apiToken: this.props.user ? this.props.user.authorization : ''
				},
				body: {
					coupon_code: this.props.coupon_code == '' ? this.state.coupon_code : this.props.coupon_code,
					// subtotal: this.props.totalPrice
				}
			}
			
			this.props.cancel_voucher(payload,
				res => {
					let state = this.state;
					state.grandTotalPrice = this.props.delivery_price + this.props.totalPrice;
					state.voucherValidation = false;
					// state.coupon_code = '';
					this.setState(state);
				},
				rej => {
					// console.log(rej)
				}
			);
		} 

	}

	navigateToChoosePayment = (method) => {
		
		// if(this.state.token.length == 0){

			let address = this.props.addresses.filter(address => address.primary == 1)[0];
	
			let payload = {
				header: {
					apiToken: this.props.user ? this.props.user.authorization : ''
				},
				body: {
					address_code: address.code,
					request_shipping_date: this.state.date.value,
					cash_on_delivery: method == 'cod' ? true : false,
					coupon_code: this.props.coupon_code,
					discount_ammount: this.props.discount,
					payment_type: method,
				}
			}
			
			this.props.request_snap_token(payload,
				res => {
					if(res.redirect_url) {
						this.setState({
							token: res.token,
							invoice: res.invoice,
							redirect_url: res.redirect_url,
							midtrans: res.midtrans_json
						},() => {

								// if(this.state.radio[2].status == true) {
								// 	analytics.trackEvent('Preferred Payment Method', {Method: 'GoPay'});
								// } else {
								// 	analytics.trackEvent('Preferred Payment Method', {Method: 'Transfer/CreditCard'});
								// }

								if(this.state.redirect_url.length !== 0) {
									
									actNav.navigate(navConstant.ChoosePayment,{
										...this.props.navigation.state.params,
										token: this.state.token,
										invoice: this.state.invoice,
										redirect_url: this.state.redirect_url,
										midtrans: this.state.midtrans,
										gopay: method == 'gopay' ? true : false,
										method: method,
										validateTransactionStatus: this.validateTransactionStatus
									});
								} else {
									// console.log('COD', res)
									this.validateTransactionStatus();
								}
						});

					} else {
						
						this.setState({
							invoice: res.invoice,
						}, () => {
							// analytics.trackEvent('Preferred Payment Method', {Method: 'Cash On Delivery'});
							this.validateTransactionStatus();
						})
					}
				},
				rej => {
	
				}
			);
	}

	validateTransactionStatus = (paymentMethod, midtransObject) => {
		// console.log('====> payment method', paymentMethod)
		let payload = {
			header: {
				apiToken: this.props.user.authorization,
			},
			type: 'validation',
			invoice: this.state.invoice
		}
		this.props.detail_transaction(payload, 
			(res) => {
				this.setState({
					token: '',
					invoice: '',
					redirect_url: '',
				},() => {
					// analytics.trackEvent('Purchase Orders', {status: 'Success'})
					this.props.navigation.state.params.createOrderHandler(res.data.invoice, paymentMethod);
				})
			},
			(err) => {
				console.warn('err checkout', err)
				if(paymentMethod == 'gopay') {
					this.cancelGopayInvoice(midtransObject.transaction_details.order_id);
					// analytics.trackEvent('Purchase Orders', {status: 'Failed'})
				} else {
					this.props.set_error_status({
						status: true,
						data: 'Pembayaran batal dilakukan.',
						title: 'formError.title.paymentCanceled'
					});
				}
			}
		)
	}

	cancelGopayInvoice (invoice) {
		let payload = {
			header: {
				apiToken: this.props.user.authorization
			},
			body: {
				invoice: invoice
			}
		};

		this.props.cancel_invoice(payload, () => actNav.navigate(navConstant.Product), () => console.log())
	}

messageOrderSuccess = () => {
		if(this.props.navigation.state.params.createOrderSuccess){
			console.log('======>', this.props.navigation.state.params.invoice)
			if(this.props.navigation.state.params.invoice == 'credit_card') {
				language.transformText('message.paymentSuccess')
				.then(message => {
					this.props.set_success_status({
						status: true,
						data: message,
						title: 'formSuccess.title.createOrder'
					});
				});
				this.props.navigation.state.params.createOrderSuccess = null;
			}
			else {
				language.transformText('message.createOrderSuccess')
				.then(message => {
					this.props.set_success_status({
						status: true,
						data: message,
						title: 'formSuccess.title.createOrder'
					});
				});
			}
		}
	}

	// renderPriceDetail = () => {
	// 	return (
	// 		<DeliveryDate
	// 			type={'price'}
	// 			getDeliveryDate={this.getDeliveryDate}
	// 			modalVisible={this.state.modalVisible.showDeliveryDate}
	// 			closeDeliveryDate={this.closePriceDetail}
	// 			dates={this.state.delivery_date}
	// 		/>
	// 	)
	// }

	// closePriceDetail = () => {
	// 	this.setModalVisible('showPriceDetail', false);
	// }

	render() {
		// console.warn(this.props.cart)
		return (
			<Container 				
				bgColorBottom={'veryLightGrey'} 				
				bgColorTop={'red'} 			
			>
				<NavigationBar
					cancelVoucher={this.cancelVoucherAPI}
					title={'checkout.navigationTitle'}
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
							onPress={this.openDeliveryDate}
						>
							{ 
								this.state.date == null 
								? 	<StaticText
										style={styles.text.date}
										property={'checkout.content.chooseDate'}
									/>
								: 	<Text style={styles.text.dateChoosen}>{this.state.date.display}</Text>
							}
							
							<View style={styles.subcontainer.icon}>
								<Image
									source={images.icon_calendar}
									style={styles.icon}
								/>
							</View>
						</TouchableOpacity>

						<View style={{flex: 1, flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
							<Image
								style={{width: 15, height: 15, marginRight: 10}}
								source={images.ic_info_grey}
							/>
							<View>
								<StaticText
									property	= 'checkout.content.confirmDate'
									style			= { styles.text.confirmDate }
								/>
							<StaticText
									property	= 'checkout.content.confirmPerson'
									style			= { styles.text.confirmPerson }
								/>

							</View>
							
						</View>

					
					</View>
					<View style = {styles.subcontainer.totalprice }>
						<TotalPrice
							type={'red'}
							title={'checkout.content.checkout'}
							subTotal={this.props.totalPrice}
							grandTotal={this.state.grandTotalPrice}
							delivery_price={this.props.delivery_price}
							discount = {this.props.discount}
							onPress={this.addressDateValidation}
							action={'checkout'}
							additional = {this.props.additional}
							checkout={true}
							freeShipping={this.props.minimumTrxFreeShippingCost}
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

							<TouchableOpacity onPress={() => this.addressDateValidation('transfer')}>
								<View style={styles.radioContainer}>
									<StaticText
										style={styles.text.methods}
										property={'checkout.methods.transfer'}
									/>
									<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', height: 15}}>
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
							<TouchableOpacity onPress = {() => this.addressDateValidation('credit_card')}>
								<View style={styles.radioContainer}>
				
									<StaticText
										style={styles.text.methods}
										property={'checkout.methods.creditCard'}
									/>
									<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginRight: -4, height: 15}}>
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
							<TouchableOpacity onPress={() => this.addressDateValidation('gopay')}>
								<View style={styles.radioContainer}>
									<StaticText
										style={styles.text.methods}
										property={'checkout.methods.gopay'}
									/>
									<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginRight: 10, height: 15}}>
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
							{/* <TouchableOpacity onPress = {() => this.addressDateValidation('cod')}>
								<View style={styles.radioContainer}>
								<View>

									<StaticText
										style={styles.text.methods}
										property={'checkout.methods.COD'}
									/>
									<StaticText
										style={styles.text.codText}
										property={'checkout.methods.codWarning'}
									/>
								</View>
												<Image
													resizeMode={'contain'} 
													source={images.icon_arrow_right_red}
													style={styles.icon}
												/>
								</View>
							</TouchableOpacity> */}
							
						</View>

					</View>

				</ScrollView>

				<DeliveryDate
					getDeliveryDate={this.getDeliveryDate}
					modalVisible={this.state.modalVisible.showDeliveryDate}
					closeDeliveryDate={this.closeDeliveryDate}
					dates={this.state.delivery_date}
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
	cart: state.product.cart.products
});

const mapDispatchToProps = (dispatch) => ({
	get_address: (req,res,err) => dispatch(actions.user.api.get_address(req,res,err)),
	set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
	cancel_checkout: (req,res,err) => dispatch(actions.transaction.api.cancel_checkout(req,res,err)),
	get_delivery_price: (req,res,err) => dispatch(actions.product.api.get_delivery_price(req,res,err)),
	get_delivery_date: (req, res, err) => dispatch(actions.utility.api.delivery_date(req,res,err)),
	check_voucher_api: (req,res,err) => dispatch(actions.voucher.api.checkVoucherValidity(req,res,err)),
	cancel_voucher: (req, res, err) => dispatch(actions.voucher.api.cancel_voucher(req, res, err)),
	request_snap_token: (req,res,err) => dispatch(actions.transaction.api.request_snap_token(req,res,err)),
	cancel_invoice: (req,res,err) => dispatch(actions.transaction.api.cancel_invoice(req,res,err)),
	detail_transaction: (req,res,err) => dispatch(actions.transaction.api.detail_transaction(req,res,err)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Checkout);
