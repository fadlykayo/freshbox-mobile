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
                province: {
					code: props.navigation.state.params.action == "editAddress" ? props.address_detail.province.code : '',
					name: props.navigation.state.params.action == "editAddress" ? props.address_detail.province.name : '',
				},
                city: {
					code: props.navigation.state.params.action == "editAddress" ? props.address_detail.city.code : '',
					name: props.navigation.state.params.action == "editAddress" ? props.address_detail.city.name : '',
				},
				subdistrict: {
					code: props.navigation.state.params.action == "editAddress" ? props.address_detail.subdistrict.code :'',
					name: props.navigation.state.params.action == "editAddress" ? props.address_detail.subdistrict.name :'',
				},
				zip_code: {
					code: props.navigation.state.params.action == "editAddress" ? props.address_detail.zip_code.code :'',
					place_name: props.navigation.state.params.action == "editAddress" ? props.address_detail.zip_code.place_name :'',
					zip_code: props.navigation.state.params.action == "editAddress" ? props.address_detail.zip_code.zip_code :'',
				},	
				address: props.navigation.state.params.action == "editAddress" ? props.address_detail.address :'',
				addressDetail: props.navigation.state.params.action == "editAddress" ? props.address_detail.detail :'',
			},
			validateStatus:{
                fullName: true,
                phone: true,
			},
			isEdit: false,
			content: {}
		}
		this.onChangeText = this.onChangeText.bind(this);
		this.onSpecificChangeText = this.onSpecificChangeText.bind(this);
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
		this.loadProvince = this.loadProvince.bind(this);
		this.loadCity = this.loadCity.bind(this);
		this.loadSubdistrict = this.loadSubdistrict.bind(this);
		this.loadZipCode = this.loadZipCode.bind(this);
	}

	getDataProvince(index) {
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

	onSpecificChangeText(type, value){
		if (type == 'zip_code') {
			let user = this.state.user;
			user[type].code = value.code;
			user[type].place_name = value.place_name;
			user[type].zip_code = value.zip_code;
			this.setState({user});
		}
		else {
			let user = this.state.user;
			user[type].code = value.code;
			user[type].name = value.name;
			this.setState({user});
		}
		switch(type) {
			case 'province': return this.loadCity()
			case 'city': return this.loadSubdistrict()
			case 'subdistrict': return this.loadZipCode()
			default: return null
		}
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
		let payload = {
			header: {
				apiToken: this.props.user.authorization
			},
			body: {
				primary: true,
				name: this.state.user.name,
				receiver_name: this.state.user.receiver_name,
				phone_number: this.state.user.phone,
				province_code: this.state.user.province.code,
				city_code: this.state.user.city.code,
				subdistrict_code: this.state.user.subdistrict.code,
				zip_code_code: this.state.user.zip_code.code,
				address: this.state.user.address,
				detail: this.state.user.addressDetail
			}
		}

		this.props.add_address(payload,
			(success) => {
				this.props.navigation.goBack(this.props.navigation.state.params.key)
				console.log("akhirnya berhasil buat add", payload)
			},
			(err) => {
				console.log(err)
			})
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

	componentDidMount() {
		this.loadProvince()
		this.loadCity()
		this.loadSubdistrict();
		this.loadZipCode();
	}

	loadProvince() {
		let payload = {
			header: this.props.user.authorization
		}
		this.props.load_province(payload, 
			(success) => {
			},
			(err) => {
				console.log(err)
			})
	}

	loadCity() {
		if (this.state.user.province.code.length !== 0) {
			let payload = {
				header: this.props.user.authorization,
				provinceCode: this.state.user.province.code
			}
			this.props.load_city(payload, 
				(success) => {
				},
				(err) => {
					console.log(err)
				})
		}
	}

	loadSubdistrict() {
		if (this.state.user.city.code.length !== 0) {
			let payload = {
				header: this.props.user.authorization,
				cityCode: this.state.user.city.code
			}
			this.props.load_subdistrict(payload, 
				(success) => {
				},
				(err) => {
					console.log(err)
				})
		}
	}

	loadZipCode() {
		if (this.state.user.subdistrict.code.length !== 0) {
			let payload = {
				header: this.props.user.authorization,
				subdistrictCode: this.state.user.subdistrict.code
			}
			this.props.load_zip_code(payload, 
				(success) => {
				},
				(err) => {
					console.log(err)
				})
		}
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
						province={this.props.province}
						city={this.props.city}
						subdistrict={this.props.subdistrict}
						zip_code={this.props.zip_code}
						getDataProvince={this.getDataProvince}
						action={this.props.navigation.state.params.action}
						isEdit={this.state.isEdit}
						address={this.state.user}
						addressValidation = {this.addressValidation} 
						validateStatus={this.state.validateStatus}
						editAddressPage={this.editAddressPage}
						onChangeText={this.onChangeText}
						onSpecificChangeText={this.onSpecificChangeText}
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

const mapStateToProps = (state) => ({
	user: state.user.data,
	address_detail: state.user.address_detail,
	province: state.region.province,
	city: state.region.city,
	subdistrict: state.region.subdistrict,
	zip_code: state.region.zip_code
})

const mapDispatchToProps = (dispatch) => ({
	load_province: (req,res,err) => dispatch(actions.region.api.load_province(req,res,err)),
	load_city: (req,res,err) => dispatch(actions.region.api.load_city(req,res,err)),
	load_subdistrict: (req,res,err) => dispatch(actions.region.api.load_subdistrict(req,res,err)),
	load_zip_code: (req,res,err) => dispatch(actions.region.api.load_zip_code(req,res,err)),
	add_address: (req,res,err) => dispatch(actions.user.api.add_address(req,res,err))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps)(AddressPage);
