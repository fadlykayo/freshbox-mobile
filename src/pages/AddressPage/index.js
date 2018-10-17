import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import Content from './components/Content';
import styles from './styles';
import { connect } from 'react-redux';
import actions from '@actions';

class AddressPage extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
			user: {
				name: props.navigation.state.params.action == "editAddress" ? props.address_detail.name :'',
                receiver_name: props.navigation.state.params.action == "editAddress" ? props.address_detail.receiver_name :'',
                phone: props.navigation.state.params.action == "editAddress" ? props.address_detail.phone_number :'',
                province: props.navigation.state.params.action == "editAddress" ? props.address_detail.province.name :'',
                city: props.navigation.state.params.action == "editAddress" ? props.address_detail.city.name :'',
                kecamatan: props.navigation.state.params.action == "editAddress" ? props.address_detail.subdistrict.name :'',
				kelurahan: props.navigation.state.params.action == "editAddress" ? props.address_detail.zip_code.place_name :'',
				zipCode: props.navigation.state.params.action == "editAddress" ? props.address_detail.zip_code.zip_code :'',
                address: props.navigation.state.params.action == "editAddress" ? props.address_detail.address :'',
				addressDetail: props.navigation.state.params.action == "editAddress" ? props.address_detail.detail :'',
			},
			validateStatus:{
                fullName: true,
                phone: true,
			},
			province: [
				{
					id: 1,
					name: "Jawa Barat"
				},
				{
					id: 2,
					name: "Jawa Tengah"
				},
				{
					id: 3,
					name: "Jawa Timur"
				},
				{
					id: 4,
					name: "Jakarta"
				},
				{
					id: 5,
					name: "Sumatera Barat"
				},
				{
					id: 6,
					name: "Sumatera Utara"
				},
				{
					id: 7,
					name: "Sumatera Selatan"
				},
				{
					id: 8,
					name: "Sulawesi Tengah"
				} 
			],
			isEdit: false,
			content: {}
		}
		this.onChangeText = this.onChangeText.bind(this);
		this.submitNameAddress = this.submitNameAddress.bind(this);
		this.submitReceiverName = this.submitReceiverName.bind(this);
		this.submitPhone = this.submitPhone.bind(this);
		this.submitProvince = this.submitProvince.bind(this);
		this.submitCity = this.submitCity.bind(this);
		this.submitZipCode = this.submitZipCode.bind(this);
		this.submitKecamatan = this.submitKecamatan.bind(this);
		this.submitKelurahan = this.submitKelurahan.bind(this);
		this.submitAddress = this.submitAddress.bind(this);
		this.submitAddressDetails = this.submitAddressDetails.bind(this);
		this.editAddressPage = this.editAddressPage.bind(this);
		this.addressValidation = this.addressValidation.bind(this);
		this.getDataProvince = this.getDataProvince.bind(this);
		this.setValidation = this.setValidation.bind(this);
		this.clearValidation = this.clearValidation.bind(this);
		this.updateHandler = this.updateHandler.bind(this);
		this.addHandler = this.addHandler.bind(this);
		this.navigateToProfilePage = this.navigateToProfilePage.bind(this);
		this.setStateValidation = this.setStateValidation.bind(this);
		this.setContentFlex = this.setContentFlex.bind(this);
		this.setContentFlexNull = this.setContentFlexNull.bind(this);
	}

	getDataProvince(index) {
		let dataProvince = this.state.province;
		let province = dataProvince[index].name;
		this.onChangeText('province', province)
	}

	setStateValidation(input) {
		this.setState({validateStatus: input})
	}

	setValidation(type,value){
        let validateStatus = this.state.validateStatus;
        validateStatus[type] = value;
        this.setState({validateStatus});
    }

    clearValidation(){
        let validateStatus = this.state.validateStatus;
        validateStatus.fullName = true;
        validateStatus.phone = true;
		this.setState({validateStatus});
		
    }

	submitPassword(){
        let userPassword = this.state.user.password.trim();
        this.clearValidation();
        this.onChangeText('password',userPassword);
        this.formProvince.focus();
    }

    submitNameAddress(){
        let userNameAddress = this.state.user.name.trim();
        this.clearValidation();
		this.onChangeText('name', userNameAddress);
	}
	
	submitReceiverName(){
        let userReceiverName = this.state.user.receiver_name.trim();
        this.clearValidation();
		this.onChangeText('receiver_name',userReceiverName);
    }

	submitPhone(){
        let userPhone = this.state.user.phone.trim();
        this.clearValidation();
        this.onChangeText('phone',userPhone);
	}
	
	submitProvince(){
        let userProvince = this.state.user.province.trim();
        this.onChangeText('province', userProvince);

	}

	submitCity(){
        let userCity = this.state.user.city.trim();
        this.onChangeText('city',userCity);

	}
	
	submitZipCode(){
        let userZipCode = this.state.user.zipCode.trim();
        this.onChangeText('zipCode',userZipCode);
        
	}
	
	submitKecamatan(){
        let userKecamatan = this.state.user.kecamatan.trim();
        this.onChangeText('kecamatan',userKecamatan);
	}
	
	submitKelurahan(){
        let userKelurahan = this.state.user.kelurahan.trim();
        this.onChangeText('kelurahan',userKelurahan);
	}
	
	submitAddress(){
        let userAddress = this.state.user.address.trim();
        this.onChangeText('address',userAddress);
	}
	
	submitAddressDetails(){
        let userAddressDetails = this.state.user.addressDetail.trim();
		this.onChangeText('addressDetail',userAddressDetails);

	}

	onChangeText(type, value){
        let user = this.state.user;
        user[type] = value;
        this.setState({user});
	}

	addressValidation() {
		//Update Validation
		if (this.props.navigation.state.params.action == 'editAddress') {
			this.updateHandler();
		}
		else {
			this.addHandler();
		}
	}

	updateHandler() {
		// alert('Success Update Address')
		this.props.navigation.goBack(this.props.navigation.state.params.key)
	}

	addHandler() {
		// alert('Add Address')
		this.props.navigation.goBack(this.props.navigation.state.params.key)
	}

	editAddressPage() {
		let state = this.state;
		state.isEdit = true;
		this.setState(state)
	}

	navigateToProfilePage() {
		actNav.navigate(navConstant.ProfilePage)
	}

	setContentFlex(e) {
		console.log(e)
		let content = this.state.content;
		let newContent = styles.outerScrollView;
		content = newContent
		this.setState({content})
	}

	setContentFlexNull() {
		this.setState({content: {}})
	}

  	render() {
		return (
			<Container 				
				bgColorBottom={'veryLightGrey'} 				
				bgColorTop={'red'} 			
			>
				<NavigationBar
					title={'addressPage.navigationTitle'}
					onPress={actNav.goBack}
				/>
				<ScrollView
					contentContainerStyle={this.state.content}
				>
					<Content
						action={this.props.navigation.state.params.action}
						isEdit={this.state.isEdit}
						address={this.state.user}
						addressValidation = {this.addressValidation} 
						validateStatus={this.state.validateStatus}
						editAddressPage={this.editAddressPage}
						onChangeText={this.onChangeText}
						submitNameAddress={this.submitNameAddress}
						submitReceiverName={this.submitReceiverName}
						submitPhone={this.submitPhone}
						submitProvince={this.submitProvince}
						submitCity={this.submitCity}
						submitZipCode={this.submitZipCode}
						submitKecamatan={this.submitKecamatan}
						submitKelurahan={this.submitKelurahan}
						submitAddress={this.submitAddress}
						submitAddressDetails={this.submitAddressDetails}
					/>
				</ScrollView>
			</Container>
		);
  	}
}

const mapStateToProps = (state) => {
	return {
		address_detail: state.user.address_detail
	}
}


export default connect(
	mapStateToProps,
	null)(AddressPage);
