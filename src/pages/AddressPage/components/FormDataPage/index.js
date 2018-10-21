import React, { Component } from 'react';
import { View } from 'react-native';
import FormInput from '@components/FormInput';
import Dropdown from '../Dropdown';
import VerificationText from '@components/VerificationText';
import Button from '@components/Button';
import styles from './styles';

class FormDataPage extends Component {
  	constructor(props) {
  		super(props)
        this.onChangeText = this.onChangeText.bind(this);
        this.onPress = this.onPress.bind(this);
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
	}

    onChangeText(type,value) {
        this.props.onChangeText(type, value);
    }

    onPress() {
        this.props.onPress();
    }

    submitNameAddress() {
		this.props.submitNameAddress();
		this.formReceiverName.focus();
    }

    submitReceiverName() {
		this.props.submitReceiverName();
		this.formPhone.focus();
    }

    submitPhone() {
		this.props.submitPhone();
		this.formProvince.focus();
    }

    submitProvince() {
		this.props.submitProvince();
		this.formCity.focus();
	}
	
	submitCity() {
		this.props.submitCity();
		this.formZipCode.focus();
	}

	submitZipCode() {
		this.props.submitZipCode();
		this.formKecamatan.focus();
	}

	submitKecamatan() {
		this.props.submitKecamatan();
		this.formKelurahan.focus();
    }

    submitKelurahan() {
		this.props.submitKelurahan();
		this.formAddress.focus();
    }

    submitAddress() {
		this.props.submitAddress();
		this.formAddressDetails.focus();
    }

    submitAddressDetails() {
        this.props.submitAddressDetails()
    }

  	render() {
		return (
			<View style={styles.container}>
                <FormInput 
					ref={c => {this.formNameAddress = c}}
					type={'name'}
					autoFocus={true}
					value={this.props.address.name}
					onChangeText={this.onChangeText}
					label={'addressPage.label.nameAddress'}
					placeholder={'addressPage.label.nameAddress'}
					onSubmitEditing={this.submitNameAddress}
				/>
				<FormInput 
					ref={c => {this.formReceiverName = c}}
					type={'receiver_name'}
					value={this.props.address.receiver_name}
					onChangeText={this.onChangeText}
					label={'addressPage.label.name'}
					placeholder={'addressPage.label.name'}
					onSubmitEditing={this.submitReceiverName}
				/>
				<FormInput 
					ref={c => {this.formPhone = c}}
					type={'phone'}
					keyboardType={'number-pad'}
					value={this.props.address.phone}
					onChangeText={this.onChangeText}
					label={'addressPage.label.phone'}
					placeholder={'addressPage.label.phone'}
					onSubmitEditing={this.submitPhone}
				/>
				<VerificationText
					validation={this.props.validateStatus.phone}
					property={'addressPage.validation.phone'}
				/>
				<Dropdown 
					type={'province'}
					data={this.props.province}
					isOpen={true}
					value={this.props.address.province}
					onChangeText={this.props.onSpecificChangeText}
					label={'addressPage.label.province'}
					placeholder={'addressPage.label.province'}
					onSubmitEditing={this.submitProvince}
				/>
				<Dropdown 
					type={'city'}
					data={this.props.city}
					isOpen={true}
					value={this.props.address.city}
					onChangeText={this.props.onSpecificChangeText}
					label={'addressPage.label.city'}
					placeholder={'addressPage.label.city'}
					onSubmitEditing={this.submitProvince}
				/>
				<Dropdown 
					type={'subdistrict'}
					data={this.props.subdistrict}
					isOpen={true}
					value={this.props.address.subdistrict}
					onChangeText={this.props.onSpecificChangeText}
					label={'addressPage.label.kecamatan'}
					placeholder={'addressPage.label.kecamatan'}
					onSubmitEditing={this.submitProvince}
				/>
				<Dropdown 
					type={'zip_code'}
					data={this.props.zip_code}
					isOpen={true}
					value={this.props.address.zip_code}
					onChangeText={this.props.onSpecificChangeText}
					label={'addressPage.label.kelurahan'}
					placeholder={'addressPage.label.kelurahan'}
					onSubmitEditing={this.submitProvince}
				/>
				<FormInput 
					ref={c => {this.formZipCode = c}}
					type={'zipCode'}
					keyboardType={'number-pad'}
					value={this.props.address.zip_code.zip_code}
					onChangeText={this.onChangeText}
					label={'addressPage.label.zipCode'}
					placeholder={'addressPage.label.zipCode'}
					onSubmitEditing={this.submitZipCode}
				/>
				{/* <FormInput 
					ref={c => {this.formProvince = c}}
					type={'province'}
					value={this.props.address.province}
					onChangeText={this.onChangeText}
					label={'addressPage.label.province'}
					placeholder={'addressPage.label.province'}
					onSubmitEditing={this.submitProvince}
				/>

				<FormInput 
					ref={c => {this.formCity = c}}
					type={'city'}
					value={this.props.address.city.name}
					onChangeText={this.onChangeText}
					label={'addressPage.label.city'}
					placeholder={'addressPage.label.city'}
					onSubmitEditing={this.submitCity}
				/>
				<FormInput 
					ref={c => {this.formKecamatan = c}}
					type={'kecamatan'}
					value={this.props.address.subdistrict.name}
					onChangeText={this.onChangeText}
					label={'addressPage.label.kecamatan'}
					placeholder={'addressPage.label.kecamatan'}
					onSubmitEditing={this.submitKecamatan}
				/>
				<FormInput 
					ref={c => {this.formKelurahan = c}}
					type={'kelurahan'}
					value={this.props.address.zip_code.place_name}
					onChangeText={this.onChangeText}
					label={'addressPage.label.kelurahan'}
					placeholder={'addressPage.label.kelurahan'}
					onSubmitEditing={this.submitKelurahan}
				/> */}
				<FormInput 
					ref={c => {this.formAddress = c}}
					type={'address'}
					value={this.props.address.address}
					onChangeText={this.onChangeText}
					label={'addressPage.label.address'}
					placeholder={'addressPage.label.address'}
					onSubmitEditing={this.submitAddress}
				/>
				<FormInput 
					ref={c => {this.formAddressDetails = c}}
					type={'addressDetail'}
					value={this.props.address.addressDetail}
					onChangeText={this.onChangeText}
					label={'addressPage.label.addressDetails'}
					placeholder={'addressPage.label.addressDetails'}
					onSubmitEditing={this.submitAddressDetails}
				/>
				<Button
					type={'red'}
					onPress={this.onPress}
					title={'addressPage.button.save'}
				/>
			</View>
		);
  	}
}

export default FormDataPage;
