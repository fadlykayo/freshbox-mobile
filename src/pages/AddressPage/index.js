import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import StaticText from '@components/StaticText';
import FormInput from '@components/FormInput';
import VerificationText from '@components/VerificationText';
import Button from './components/Button';
import InputText from './components/InputText';
import images from '@assets';
import styles from './styles';

class AddressPage extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
			user: {
				name: 'John Doe',
                photo: images.icon_img_ava,
                email: 'john.doe@freshbox.com',
                phone: '082212345678',
                province: 'Jawa Barat',
                city: 'Bandung',
                zipCode: '14016',
                kecamatan: 'Ujungberung',
                kelurahan: 'Passanggrahan',
                address: 'Jl. Jatiluhur III No. 167 B',
                addressDetail: 'Pagar Hijau Dekat Tiang Listrik'
			},
			validateStatus:{
                fullName: true,
                phone: true,
            },
			isEdit: false,
		}
		this.onChangeText = this.onChangeText.bind(this);
		this.setValidation = this.setValidation.bind(this);
		this.clearValidation = this.clearValidation.bind(this);
		this.submitFullName = this.submitFullName.bind(this);
		this.submitPhone = this.submitPhone.bind(this);
		this.submitProvince = this.submitProvince.bind(this);
		this.submitCity = this.submitCity.bind(this);
		this.submitZipCode = this.submitZipCode.bind(this);
		this.submitKecamatan = this.submitKecamatan.bind(this);
		this.submitKelurahan = this.submitKelurahan.bind(this);
		this.submitAddress = this.submitAddress.bind(this);
		this.submitAddressDetails = this.submitAddressDetails.bind(this);
		this.updateAddressValidation = this.updateAddressValidation.bind(this);
		this.updateHandler = this.updateHandler.bind(this);
		this.editAddressPage = this.editAddressPage.bind(this);
		this.navigateToProfilePage = this.navigateToProfilePage.bind(this);
		this.setStateValidation = this.setStateValidation.bind(this);
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

    submitFullName(){
        let userFullName = this.state.user.name.trim();
        this.clearValidation();
		this.onChangeText('name',userFullName);
		this.formPhone.focus();
    }

	submitPhone(){
        let userPhone = this.state.user.phone.trim();
        this.clearValidation();
        this.onChangeText('phone',userPhone);
        this.formProvince.focus();
	}
	
	submitProvince(){
        let userProvince = this.state.user.province.trim();
        this.onChangeText('province',userProvince);
        this.formCity.focus();
	}

	submitCity(){
        let userCity = this.state.user.city.trim();
        this.onChangeText('city',userCity);
        this.formZipCode.focus();
	}
	
	submitZipCode(){
        let userZipCode = this.state.user.zipCode.trim();
        this.onChangeText('zipCode',userZipCode);
        this.formKecamatan.focus();
	}
	
	submitKecamatan(){
        let userKecamatan = this.state.user.kecamatan.trim();
        this.onChangeText('kecamatan',userKecamatan);
        this.formKelurahan.focus();
	}
	
	submitKelurahan(){
        let userKelurahan = this.state.user.kelurahan.trim();
        this.onChangeText('kelurahan',userKelurahan);
        this.formAddress.focus();
	}
	
	submitAddress(){
        let userAddress = this.state.user.address.trim();
        this.onChangeText('address',userAddress);
        this.formAddressDetails.focus();
	}
	
	submitAddressDetails(){
        let userAddressDetails = this.state.user.addressDetail.trim();
        this.onChangeText('addressDetail',userAddressDetails);
        this.updateAddressValidation();
	}

	onChangeText(type, value){
        let user = this.state.user;
        user[type] = value;
        this.setState({user});
	}

	updateAddressValidation() {
		validation.fullName(this.state.user.name)
        .then(() => {
            if(this.state.validateStatus.fullName == false) this.setValidation('fullName',true);
            validation.phone(this.state.user.phone)
            .then(() => {
                if(this.state.validateStatus.phone == false) this.setValidation('phone',true);
                this.updateHandler();
            })
            .catch(() => {
                this.setValidation('phone',false);
            })
        })
        .catch(() => {
            this.setValidation('fullName',false);
        })
	}

	updateHandler() {
		alert('Succes Update Address')
		this.navigateToProfilePage()
	}

	editAddressPage() {
		this.setState({isEdit: true})
	}

	navigateToProfilePage() {
		actNav.navigate(navConstant.ProfilePage)
	}

  	render() {
		return (
			<Container>
				<NavigationBar
					title={'addressPage.navigationTitle'}
					onPress={actNav.goBack}
				/>
				<ScrollView>
					{ this.state.isEdit ? (
						<View style={styles.container}>
							<FormInput 
								ref={c => {this.formFullName = c}}
								type={'name'}
								autoFocus={true}
								value={this.state.user.name}
								onChangeText={(type,value) => this.onChangeText(type,value)}
								label={'addressPage.label.name'}
								placeholder={'addressPage.label.name'}
								onSubmitEditing={this.submitFullName}
							/>
							<VerificationText
                    		    validation={this.state.validateStatus.fullName}
                    		    property={'addressPage.validation.fullName'}
                    		/>
							<FormInput 
								ref={c => {this.formPhone = c}}
								type={'phone'}
								keyboardType={'number-pad'}
								value={this.state.user.phone}
								onChangeText={(type,value) => this.onChangeText(type,value)}
								label={'addressPage.label.phone'}
								placeholder={'addressPage.label.phone'}
								onSubmitEditing={this.submitPhone}
							/>
							<VerificationText
								validation={this.state.validateStatus.phone}
								property={'addressPage.validation.phone'}
							/>
							<FormInput 
								ref={c => {this.formProvince = c}}
								type={'province'}
								value={this.state.user.province}
								onChangeText={(type,value) => this.onChangeText(type,value)}
								label={'addressPage.label.province'}
								placeholder={'addressPage.label.province'}
								onSubmitEditing={this.submitProvince}
							/>
							<FormInput 
								ref={c => {this.formCity = c}}
								type={'city'}
								value={this.state.user.city}
								onChangeText={(type,value) => this.onChangeText(type,value)}
								label={'addressPage.label.city'}
								placeholder={'addressPage.label.city'}
								onSubmitEditing={this.submitCity}
							/>
							<FormInput 
								ref={c => {this.formZipCode = c}}
								type={'zipCode'}
								keyboardType={'number-pad'}
								value={this.state.user.zipCode}
								onChangeText={(type,value) => this.onChangeText(type,value)}
								label={'addressPage.label.zipCode'}
								placeholder={'addressPage.label.zipCode'}
								onSubmitEditing={this.submitZipCode}
							/>
							<FormInput 
								ref={c => {this.formKecamatan = c}}
								type={'kecamatan'}
								value={this.state.user.kecamatan}
								onChangeText={(type,value) => this.onChangeText(type,value)}
								label={'addressPage.label.kecamatan'}
								placeholder={'addressPage.label.kecamatan'}
								onSubmitEditing={this.submitKecamatan}
							/>
							<FormInput 
								ref={c => {this.formKelurahan = c}}
								type={'kelurahan'}
								value={this.state.user.kelurahan}
								onChangeText={(type,value) => this.onChangeText(type,value)}
								label={'addressPage.label.kelurahan'}
								placeholder={'addressPage.label.kelurahan'}
								onSubmitEditing={this.submitKelurahan}
							/>
							<FormInput 
								ref={c => {this.formAddress = c}}
								type={'address'}
								value={this.state.user.address}
								onChangeText={(type,value) => this.onChangeText(type,value)}
								label={'addressPage.label.address'}
								placeholder={'addressPage.label.address'}
								onSubmitEditing={this.submitAddress}
							/>
							<FormInput 
								ref={c => {this.formAddressDetails = c}}
								type={'addressDetail'}
								value={this.state.user.addressDetail}
								onChangeText={(type,value) => this.onChangeText(type,value)}
								label={'addressPage.label.addressDetails'}
								placeholder={'addressPage.label.addressDetails'}
								onSubmitEditing={this.submitAddressDetails}
							/>
							<Button
								isEdit={this.state.isEdit}
								onPress={this.updateAddressValidation}
								title={'addressPage.button.save'}
							/>
						</View>
					) : (
						<View style={styles.container}>
							<InputText
								label={'addressPage.label.name'}
								input={this.state.user.name}
							/>
							<InputText
								label={'addressPage.label.phone'}
								input={this.state.user.phone}
							/>
							<InputText
								label={'addressPage.label.province'}
								input={this.state.user.province}
							/>
							<InputText
								label={'addressPage.label.city'}
								input={this.state.user.city}
							/>
							<InputText
								label={'addressPage.label.zipCode'}
								input={this.state.user.zipCode}
							/>
							<InputText
								label={'addressPage.label.kecamatan'}
								input={this.state.user.kecamatan}
							/>
							<InputText
								label={'addressPage.label.kelurahan'}
								input={this.state.user.kelurahan}
							/>
							<InputText
								label={'addressPage.label.address'}
								input={this.state.user.address}
							/>
							<InputText
								label={'addressPage.label.addressDetails'}
								input={this.state.user.addressDetail}
							/>
							<Button
								onPress={this.editAddressPage}
								title={'addressPage.button.edit'}
							/>	
						</View>
					) }
				</ScrollView>
			</Container>
		);
  	}
}

export default AddressPage;
