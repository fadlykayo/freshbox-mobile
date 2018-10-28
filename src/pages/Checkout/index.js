import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, TouchableOpacity } from 'react-native';
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

moment.locale('id',id);

class Checkout extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
			grandTotalPrice: 0,
			date: null,
			modalVisible:{
                showDeliveryDate: false,
            }
		}
		this.getAddress = this.getAddress.bind(this);
		this._renderLabel = this._renderLabel.bind(this);
		this.getDeliveryDate = this.getDeliveryDate.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);
		this.getDeliveryPrice = this.getDeliveryPrice.bind(this);
		this.openDeliveryDate = this.openDeliveryDate.bind(this);
		this.navigateToDetail = this.navigateToDetail.bind(this);
		this.closeDeliveryDate = this.closeDeliveryDate.bind(this);
		this.addressDateValidation = this.addressDateValidation.bind(this);
		this.navigateToChooseAddress = this.navigateToChooseAddress.bind(this);
	}

	componentDidMount() {
		this.getDeliveryPrice();
		this.getAddress();
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
				state.grandTotalPrice = this.props.delivery_price + this.props.totalPrice

				this.setState(state)
			},
			(err) => {
				console.log(err)
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
				console.log(err)
			}
		)
	}

	setModalVisible(type,value){
        let modalVisible = this.state.modalVisible;
        modalVisible[type] = value;
        this.setState({modalVisible});
    }

	getDeliveryDate(payload){
		console.log('date selected',payload)
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
				let todayDate = today.getDate();
				let stateDate = new Date(this.state.date.origin).getDate();
				if(todayHour >= 21 && todayMin >= 55){
					if(todayDate == stateDate){
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
				else{
					this.navigateToDetail(address[0]);
				}
			}
		}
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

  	render() {
		return (
			<Container 				
				bgColorBottom={'veryLightGrey'} 				
				bgColorTop={'red'} 			
			>
				<NavigationBar
					title={'checkout.navigationTitle'}
				/>
				<View style={styles.container}>
					<DeliveryPlace
						type={'white'}
						address={'checkout.content.otherAddress'}
						addAddress={'checkout.content.addAddress'}
						addresses={this.props.addresses}
						onPress={this.navigateToChooseAddress}
					/>
					<View style={styles.subcontainer.bottom}>
						{this._renderLabel()}
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
								: 	<Text style={styles.text.date}>{this.state.date.display}</Text>
							}
							<View style={styles.subcontainer.icon}>
								<Image
									source={images.icon_calendar}
									style={styles.icon}
								/>
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<TotalPrice
					type={'red'}
					title={'checkout.content.checkout'}
                    subTotal={this.props.totalPrice}
                    grandTotal={this.state.grandTotalPrice}
					delivery_price={this.props.delivery_price}
					onPress={this.addressDateValidation}
                />
				<DeliveryDate
					getDeliveryDate={this.getDeliveryDate}
                    modalVisible={this.state.modalVisible.showDeliveryDate}
                    closeDeliveryDate={this.closeDeliveryDate}
                />
			</Container>
		);
  	}
}

const mapStateToProps = (state) => ({
	user: state.user.data,
	addresses: state.user.address,
	totalPrice: state.product.total.price,
	delivery_price: state.product.delivery_price
});

const mapDispatchToProps = (dispatch) => ({
	get_address: (req,res,err) => dispatch(actions.user.api.get_address(req,res,err)),
	set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
	get_delivery_price: (req,res,err) => dispatch(actions.product.api.get_delivery_price(req,res,err)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Checkout);
