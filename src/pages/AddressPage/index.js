import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
import Container from '@components/Container';
import NavigationBar from './components/NavigationBar';
import Content from './components/Content';
import AlertDialog from './components/AlertDialog';
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
				name: true,
				receiver_name: true,
				phone: true,
				province: true,
				city: true,
				subdistrict: true,
				kelurahan: true,
				zip_code: true,
                address: true,
			},
			isEdit: false,
			modalVisible: {
				dialog: false,
			},
			action: '',
			address_code: ''
		}
		this.onChangeText = this.onChangeText.bind(this);
		this.onSpecificChangeText = this.onSpecificChangeText.bind(this);
		this.submitNameAddress = this.submitNameAddress.bind(this);
		this.submitReceiverName = this.submitReceiverName.bind(this);
		this.submitPhone = this.submitPhone.bind(this);
		this.submitZipCode = this.submitZipCode.bind(this);
		this.submitAddress = this.submitAddress.bind(this);
		this.submitAddressDetails = this.submitAddressDetails.bind(this);
		this.editAddressPage = this.editAddressPage.bind(this);
		this.addressValidation = this.addressValidation.bind(this);
		this.setValidation = this.setValidation.bind(this);
		this.clearValidation = this.clearValidation.bind(this);
		this.updateHandler = this.updateHandler.bind(this);
		this.addHandler = this.addHandler.bind(this);
		this.navigateToProfilePage = this.navigateToProfilePage.bind(this);
		this.setStateValidation = this.setStateValidation.bind(this);
		this.loadProvince = this.loadProvince.bind(this);
		this.loadCity = this.loadCity.bind(this);
		this.loadSubdistrict = this.loadSubdistrict.bind(this);
		this.loadZipCode = this.loadZipCode.bind(this);
		this.deleteAddress = this.deleteAddress.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);
		this.setAction = this.setAction.bind(this);
		this.navigateBack = this.navigateBack.bind(this);
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
        validateStatus.name = true;
		validateStatus.receiver_name = true;
		validateStatus.phone = true;
		validateStatus.province = true;
		validateStatus.city = true;
		validateStatus.subdistrict = true;
		validateStatus.kelurahan = true;
		validateStatus.zip_code = true;
        validateStatus.address = true;
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
	
	submitZipCode(){
		let user = this.state.user;
		let newZipCode = user.zip_code.zip_code.trim();
		user.zip_code.zip_code = newZipCode;
        this.setState({user})
	}
	
	submitAddress(){
        let userAddress = this.state.user.address.trim();
        this.onChangeText('address',userAddress);
	}
	
	submitAddressDetails(){
        let userAddressDetails = this.state.user.addressDetail.trim();
		this.onChangeText('addressDetail',userAddressDetails);
		this.addressValidation()
	}

	onChangeText(type, value){
        let user = this.state.user;
        user[type] = value;
        this.setState({user});
	}

	onSpecificChangeText(type, value){
		let newUser = this.state.user;
		let allType = ['province', 'city', 'subdistrict', 'zip_code'];
		let indexType = allType.indexOf(type)

		for(let i = indexType; i < allType.length; i++) {
			if (allType[i] == type) {
				if (allType[i] == 'zip_code') {
					newUser[allType[i]].code = value.code;
					newUser[allType[i]].place_name = value.place_name;
					newUser[allType[i]].zip_code = value.zip_code;
					this.setState({user: newUser})
				}
				else {
					newUser[allType[i]].code = value.code;
					newUser[allType[i]].name = value.name;
					this.setState({user: newUser})
				}
			}
			else {
				if (allType[i] == 'zip_code') {
					newUser[allType[i]].code = '';
					newUser[allType[i]].place_name = '';
					newUser[allType[i]].zip_code = '';
					this.setState({user: newUser})
				}
				else {
					newUser[allType[i]].code = '';
					newUser[allType[i]].name = '';
					this.setState({user: newUser})
				}
			}
		}

		this.props.clear_region(type);

		switch(type) {
			case 'province': return this.loadCity()
			case 'city': return this.loadSubdistrict()
			case 'subdistrict': return this.loadZipCode()
			default: return null
		}
	}

	addressValidation() {
		//Update Validation
		this.clearValidation();
        validation.address(this.state.user)
        .then(() => {
			if (this.props.navigation.state.params.action == 'editAddress') {
				this.updateHandler();
			}
			else {
				this.addHandler();
			}
        })
        .catch((err) => {
            console.log(err);
            this.setValidation(err,false);
        });
		
	}

	updateHandler() {
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
			},
			data: this.props.address_detail
		}
		this.props.update_address(payload,
			(success) => {
				this.props.navigation.goBack(this.props.navigation.state.params.key)
			},
			(err) => {
				console.log(err)
			})
	}

	addHandler() {
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

	deleteAddress() {
		let payload = {
			header: {
				apiToken: this.props.user.authorization
			},
			addressCode: this.props.address_detail.code
		}

		this.props.delete_address(payload,
			(success) => {
				actNav.goBack()
			},
			(err) => {
				console.log("error nih", err)
			})
	}

	navigateToProfilePage() {
		actNav.navigate(navConstant.ProfilePage)
	}

	componentDidMount() {
		this.props.reset_region();
		this.loadProvince();
		this.loadCity();
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

	setModalVisible(type) {
		let modalVisible = this.state.modalVisible;
		modalVisible[type] = !modalVisible[type]
		this.setState({modalVisible})
	}

	setAction(type, action) {
		this.setModalVisible(type)
		let state = this.state;
		state.action = action;
		this.setState(state)
	}

	navigateBack() {
		actNav.goBack()
	}

  	render() {
		return (
			<Container 				
				bgColorBottom={'veryLightGrey'} 				
				bgColorTop={'red'} 			
			>
				<NavigationBar
					type={'dialog'}
					title={'addressPage.navigationTitle'}
					isEdit={this.state.isEdit}
					action={this.props.navigation.state.params.action}
					backPress={actNav.goBack}
					setAction={this.setAction}
				/>
				<ScrollView
					keyboardDismissMode={'on-drag'}
				>
					<Content
						type={'dialog'}
						province={this.props.province}
						city={this.props.city}
						subdistrict={this.props.subdistrict}
						zip_code={this.props.zip_code}
						action={this.props.navigation.state.params.action}
						isEdit={this.state.isEdit}
						address={this.state.user}
						addressValidation = {this.addressValidation} 
						validateStatus={this.state.validateStatus}
						editAddressPage={this.editAddressPage}
						deleteAddress={this.deleteAddress}
						onChangeText={this.onChangeText}
						onSpecificChangeText={this.onSpecificChangeText}
						submitNameAddress={this.submitNameAddress}
						submitReceiverName={this.submitReceiverName}
						submitPhone={this.submitPhone}
						submitZipCode={this.submitZipCode}
						submitAddress={this.submitAddress}
						submitAddressDetails={this.submitAddressDetails}
						setModalVisible={this.setModalVisible}
					/>
				</ScrollView>
				<AlertDialog
					type={'dialog'}
					isEdit={this.state.isEdit}
					navigateBack={this.navigateBack}
					deleteAddress={this.deleteAddress}
					action={this.state.action}
					modalVisible={this.state.modalVisible.dialog}
					setModalVisible={this.setModalVisible}
					addressValidation={this.addressValidation}
				/>
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
	add_address: (req,res,err) => dispatch(actions.user.api.add_address(req,res,err)),
	update_address: (req,res,err) => dispatch(actions.user.api.update_address(req,res,err)),
	clear_region: (type) => dispatch(actions.region.reducer.clear_region(type)),
	reset_region: () => dispatch(actions.region.reducer.reset_region()),
	delete_address: (req,res,err) => dispatch(actions.user.api.delete_address(req,res,err))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps)(AddressPage);
