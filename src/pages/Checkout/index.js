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
			},
			delivery_date: [],
			coupon_code: this.props.coupon_code !== '' ? this.props.coupon_code : '',
			voucherValidation: false
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

	addressDateValidation(){
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
					this.navigateToDetail(address[0]);
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
						this.navigateToDetail(address[0]);
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
				subtotal: this.props.totalPrice
			}
		}
        
		this.props.check_voucher_api(payload,
			res => {
				let state = this.state;
				state.grandTotalPrice = this.props.delivery_price + this.props.totalPrice - this.props.discount
				state.voucherValidation = true;
				this.setState(state);
			},
			rej => {
				let state = this.state;
				state.grandTotalPrice = this.props.delivery_price + this.props.totalPrice - this.props.discount
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
					console.log(rej)
				}
			);
		} 

	}

  	render() {

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

						<View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', position: 'absolute', left: 30, bottom: 15}}>
							<Image
								style={{width: 15, height: 15, marginRight: 10}}
								source={images.info}
							/>
													<StaticText
							property	= 'checkout.content.confirmDate'
							style			= { styles.text.confirmDate }
						/>
						</View>

					
					</View>
					
				</ScrollView>
				<TotalPrice
						type={'red'}
						title={'checkout.content.checkout'}
						subTotal={this.props.totalPrice}
						grandTotal={this.state.grandTotalPrice}
						delivery_price={this.props.delivery_price}
						discount = {this.props.discount}
						onPress={this.addressDateValidation}
						action={'checkout'}
						// checkout={true}
					/>
				<DeliveryDate
					getDeliveryDate={this.getDeliveryDate}
					modalVisible={this.state.modalVisible.showDeliveryDate}
					closeDeliveryDate={this.closeDeliveryDate}
					dates={this.state.delivery_date}
				/>
			</Container>
		);
  	}
}

const mapStateToProps = (state) => ({
	user: state.user.data,
	addresses: state.user.address,
	totalPrice: state.product.total.price,
	discount: state.product.discount,
	coupon_code: state.product.coupon_code,
	delivery_price: state.product.delivery_price,
	delivery_date: state.utility.delivery_date
});

const mapDispatchToProps = (dispatch) => ({
	get_address: (req,res,err) => dispatch(actions.user.api.get_address(req,res,err)),
	set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
	cancel_checkout: (req,res,err) => dispatch(actions.transaction.api.cancel_checkout(req,res,err)),
	get_delivery_price: (req,res,err) => dispatch(actions.product.api.get_delivery_price(req,res,err)),
	get_delivery_date: (req, res, err) => dispatch(actions.utility.api.delivery_date(req,res,err)),
	check_voucher_api: (req,res,err) => dispatch(actions.voucher.api.checkVoucherValidity(req,res,err)),
	cancel_voucher: (req, res, err) => dispatch(actions.voucher.api.cancel_voucher(req, res, err)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Checkout);
