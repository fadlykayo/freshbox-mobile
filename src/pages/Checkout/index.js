import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import StaticText from '@components/StaticText';
import TotalPrice from './components/TotalPrice';
import DeliveryDate from './components/DeliveryDate';
import images from '@assets';
import styles from './styles';
import { connect } from 'react-redux';
import actions from '@actions';

class Checkout extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
			user: {
				deliveryPrice: 0,
			},
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
			<Container>
				<NavigationBar
					title={'checkout.navigationTitle'}
					onPress={actNav.goBack}
				/>
				<View style={styles.container}>
					<View style={styles.topComponent}>
						{ this.props.addresses.map((address, index) => {
							if (address.primary == 1) {
								return (
									<View key={index}>
										<StaticText
											style={styles.staticText}
											property={'checkout.label.deliveryAddress'}
										/>
							            <Text style={styles.addressText}>{address.receiver_name} <Text style={styles.nameAddressText}>({address.name})</Text></Text>
							            { address.detail.length == 0 ? (
                    	                    <Text style={styles.addressText}>{address.address}, {address.zip_code.place_name}, {address.subdistrict.name}, {address.city.name}, {address.province.name}, {address.zip_code.zip_code}</Text>
							            ) : (
                    	                    <Text style={styles.addressText}>{address.detail}, {address.address}, {address.zip_code.place_name}, {address.subdistrict.name}, {address.city.name}, {address.province.name}, {address.zip_code.zip_code}</Text>
							            )}
							            <Text style={styles.addressText}>{address.phone_number}</Text>
									</View>
								)
							}
						}) }
						<TouchableOpacity 
							style={styles.buttonOtherAddress}
							onPress={this.navigateToChooseAddress}	
						>
							<StaticText
								style={[styles.staticText,styles.otherAddressText]}
								property={'checkout.content.otherAddress'}
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.bottomComponent}>
						{ this._renderLabel() }
						<TouchableOpacity style={styles.datePlace} onPress={this.openDeliveryDate}>
						{ this.state.setDate == '' ? (
							<StaticText
								style={styles.textDate}
								property={'checkout.content.chooseDate'}
							/>
						) : (
								<Text style={[styles.textDate, styles.date ]}>{ this.state.setDate }</Text>
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
                    subTotal={this.props.totalPrice}
                    grandTotal={this.state.grandTotalPrice}
                    data={this.state.user}
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
		addresses: state.user.address,
		totalPrice: state.product.total.price,
	}
}

export default connect(mapStateToProps,null)(Checkout);
