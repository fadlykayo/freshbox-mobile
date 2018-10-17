import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import StaticText from '@components/StaticText';
import TotalPrice from '@components/TotalPrice';
import DeliveryDate from './components/DeliveryDate';
import DeliveryPlace from './components/DeliveryPlace';
import images from '@assets';
import styles from './styles';
import { connect } from 'react-redux';
import actions from '@actions';

class Checkout extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
			grandTotalPrice: 0,
			setDate: '',
			modalVisible:{
                showDeliveryDate: false,
            }
		}
		this.onChangeText = this.onChangeText.bind(this);
		this.navigateToChooseAddress = this.navigateToChooseAddress.bind(this);
		this._renderLabel = this._renderLabel.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);
		this.openDeliveryDate = this.openDeliveryDate.bind(this);
		this.closeDeliveryDate = this.closeDeliveryDate.bind(this);
		this.getDeliveryDate = this.getDeliveryDate.bind(this);
		this.navigateToChoosePayment = this.navigateToChoosePayment.bind(this);
		this.getAddress = this.getAddress.bind(this);
		this.getDeliveryPrice = this.getDeliveryPrice.bind(this);
	}

	componentDidMount() {
		this.getDeliveryPrice()
		if (this.props.addresses.length == 0) {
			this.getAddress()
		}
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
			(success) => {
				let state = this.state;
				state.grandTotalPrice = this.props.delivery_price + this.props.totalPrice

				this.setState(state)
			},
			(err) => {
				console.log(err)
			})
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
			null,
			(err) => {
				console.log(err)
			})
	}

	setModalVisible(type,value){
        let modalVisible = this.state.modalVisible;
        modalVisible[type] = value;
        this.setState({modalVisible});
    }

	onChangeText(type, value){
        let state = this.state;
        state[type] = value;
        this.setState({state});
	}

	getDeliveryDate(type, value) {
		this.onChangeText(type, value);
		this.closeDeliveryDate();
	}

	navigateToChooseAddress() {
		actNav.navigate(navConstant.ChooseAddress);
	}

	navigateToChoosePayment() {
		let address = this.props.addresses.filter(address => address.primary == 1);
		if(address.length == 0) {
			alert("Isi alamat nya")
		}
		else {
			if (this.state.setDate == '') {
				alert("Isi Tanggal nya")
			}
			else {
				let payload = {};
		
				payload.address_id = address[0].id;
				payload.request_shipping_date = this.state.setDate.post;
		
				// console.log("data masuk", payload)
				actNav.navigate(navConstant.ChoosePayment, 
					{transaction: payload }
				)
			}
		}
	}

	_renderLabel() {
		if (this.state.setDate.length == 0) return null
		else return (
			<View style={styles.textLabelPlace}>
				<StaticText
					style={styles.textLabel}
					property={'checkout.content.chooseDate'}
				/>
			</View>
			)
	}

	openDeliveryDate() {
		this.setModalVisible('showDeliveryDate',true);
	}

	closeDeliveryDate(){
		this.setModalVisible('showDeliveryDate',false);
    }

  	render() {
		return (
			<Container 				
				bgColorBottom={'veryLightGrey'} 				
				bgColorTop={'red'} 			
			>
				<NavigationBar
					title={'checkout.navigationTitle'}
					onPress={actNav.goBack}
				/>
				<View style={styles.container}>
					<DeliveryPlace
						type={'white'}
						title={'checkout.content.otherAddress'}
						addresses={this.props.addresses}
						onPress={this.navigateToChooseAddress}
					/>
					<View style={styles.bottomComponent}>
						{ this._renderLabel() }
						<TouchableOpacity style={styles.datePlace} onPress={this.openDeliveryDate}>
						{ this.state.setDate == '' ? (
							<StaticText
								style={styles.textDate}
								property={'checkout.content.chooseDate'}
							/>
						) : (
								<Text style={[styles.textDate, styles.date ]}>{ this.state.setDate.display }</Text>
						) }

							<View style={styles.dateImage}>
								<Image
									source={images.icon_calendar}
									style={styles.logo}
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
					onPress={this.navigateToChoosePayment}
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

const mapStateToProps = (state) => {
	return {
		user: state.user.data,
		addresses: state.user.address,
		totalPrice: state.product.total.price,
		delivery_price: state.product.delivery_price
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		get_delivery_price: (req,res,err) => dispatch(actions.product.api.get_delivery_price(req,res,err)),
		get_address: (req,res,err) => dispatch(actions.user.api.get_address(req,res,err)),
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Checkout);
