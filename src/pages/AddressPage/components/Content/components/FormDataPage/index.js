import React, { Component } from 'react';
import { View } from 'react-native';
import FormInput from './components/FormInput';
import Dropdown from './components/Dropdown';
import VerificationText from '@components/VerificationText';
import Button from '@components/Button';
import styles from './styles';

class FormDataPage extends Component {
  	constructor(props) {
		super(props)
		this.state = {
		  	isOpen: {
				province: false,
				city: false,
				subdistrict: false,
				zip_code: false,
		  	}
		}
		this.onChangeText = this.onChangeText.bind(this);
		this.onSpecificChangeText = this.onSpecificChangeText.bind(this);
		this.onPress = this.onPress.bind(this);
		this.submitNameAddress = this.submitNameAddress.bind(this);
		this.submitReceiverName = this.submitReceiverName.bind(this);
		this.submitPhone = this.submitPhone.bind(this);
		this.submitZipCode = this.submitZipCode.bind(this);
		this.submitAddress = this.submitAddress.bind(this);
		this.submitAddressDetails = this.submitAddressDetails.bind(this);
		this.showDropdown = this.showDropdown.bind(this);
	}

	showDropdown(type, nextType){
		let isOpen = this.state.isOpen;
		if(type !== null && nextType != null) {
			isOpen[type] = !isOpen[type];
			isOpen[nextType] = !isOpen[nextType];
			this.setState({isOpen});
		}
		else if (type == null && nextType != null) {
			isOpen[nextType] = !isOpen[nextType];
			this.setState({isOpen});
		}
		else {
			isOpen[type] = !isOpen[type];
			this.setState({isOpen});
		}
    }
	
	onChangeText(type,value) {
		this.props.onChangeText(type,value);
	}

	onSpecificChangeText(type,value,nextValue) {
		this.props.onSpecificChangeText(type,value);
		if(type == 'zip_code') {
			this.showDropdown(type,null);
			this.formZipCode.focus();
		}
		else {
			this.showDropdown(type,nextValue);
		}
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
		this.showDropdown(null,'province')
	}

	submitZipCode() {
		this.props.submitZipCode();
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
					required={'addressPage.label.required'}
					placeholder={'addressPage.label.nameAddress'}
					onSubmitEditing={this.submitNameAddress}
				/>
				<VerificationText
					validation={this.props.validateStatus.name}
					property={'addressPage.validation.name'}
				/>
				<FormInput 
					ref={c => {this.formReceiverName = c}}
					type={'receiver_name'}
					value={this.props.address.receiver_name}
					onChangeText={this.onChangeText}
					label={'addressPage.label.name'}
					required={'addressPage.label.required'}
					placeholder={'addressPage.label.name'}
					onSubmitEditing={this.submitReceiverName}
				/>
				<VerificationText
					validation={this.props.validateStatus.receiver_name}
					property={'addressPage.validation.receiver_name'}
				/>
				<FormInput 
					ref={c => {this.formPhone = c}}
					type={'phone'}
					keyboardType={'number-pad'}
					maxLength={13}
					value={this.props.address.phone}
					onChangeText={this.onChangeText}
					label={'addressPage.label.phone'}
					required={'addressPage.label.required'}
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
					isOpen={this.state.isOpen.province}
					value={this.props.address.province}
					nextValue={'city'}
					onSpecificChangeText={this.onSpecificChangeText}
					label={'addressPage.label.province'}
					required={'addressPage.label.required'}
					placeholder={'addressPage.label.province'}
					showDropdown={this.showDropdown}
				/>
				<VerificationText
					validation={this.props.validateStatus.province}
					property={'addressPage.validation.province'}
				/>
				<Dropdown 
					type={'city'}
					data={this.props.city}
					isOpen={this.state.isOpen.city}
					value={this.props.address.city}
					nextValue={'subdistrict'}
					onSpecificChangeText={this.onSpecificChangeText}
					label={'addressPage.label.city'}
					required={'addressPage.label.required'}
					placeholder={'addressPage.label.city'}
					showDropdown={this.showDropdown}
				/>
				<VerificationText
					validation={this.props.validateStatus.city}
					property={'addressPage.validation.city'}
				/>
				<Dropdown 
					type={'subdistrict'}
					data={this.props.subdistrict}
					isOpen={this.state.isOpen.subdistrict}
					value={this.props.address.subdistrict}
					nextValue={'zip_code'}
					onSpecificChangeText={this.onSpecificChangeText}
					label={'addressPage.label.kecamatan'}
					required={'addressPage.label.required'}
					placeholder={'addressPage.label.kecamatan'}
					showDropdown={this.showDropdown}
				/>
				<VerificationText
					validation={this.props.validateStatus.subdistrict}
					property={'addressPage.validation.subdistrict'}
				/>
				<Dropdown 
					type={'zip_code'}
					data={this.props.zip_code}
					isOpen={this.state.isOpen.zip_code}
					value={this.props.address.zip_code}
					onSpecificChangeText={this.onSpecificChangeText}
					label={'addressPage.label.kelurahan'}
					required={'addressPage.label.required'}
					placeholder={'addressPage.label.kelurahan'}
					showDropdown={this.showDropdown}
				/>
				<VerificationText
					validation={this.props.validateStatus.kelurahan}
					property={'addressPage.validation.kelurahan'}
				/>
				<FormInput 
					ref={c => {this.formZipCode = c}}
					type={'zipCode'}
					editable={false}
					keyboardType={'number-pad'}
					value={this.props.address.zip_code.zip_code}
					onChangeText={this.onChangeText}
					label={'addressPage.label.zipCode'}
					required={'addressPage.label.required'}
					placeholder={'addressPage.label.zipCode'}
					onSubmitEditing={this.submitZipCode}
				/>
				<VerificationText
					validation={this.props.validateStatus.zip_code}
					property={'addressPage.validation.zip_code'}
				/>
				<FormInput 
					ref={c => {this.formAddress = c}}
					type={'address'}
					value={this.props.address.address}
					onChangeText={this.onChangeText}
					label={'addressPage.label.address'}
					required={'addressPage.label.required'}
					placeholder={'addressPage.label.address'}
					onSubmitEditing={this.submitAddress}
				/>
				<VerificationText
					validation={this.props.validateStatus.address}
					property={'addressPage.validation.address'}
				/>
				<FormInput 
					ref={c => {this.formAddressDetails = c}}
					type={'addressDetail'}
					value={this.props.address.addressDetail}
					onChangeText={this.onChangeText}
					label={'addressPage.label.addressDetails'}
					required={''}
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
