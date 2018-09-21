import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import FormInput from '@components/FormInput';
import VerificationText from '@components/VerificationText';
import TotalPrice from './components/TotalPrice';
import images from '@assets';
import styles from './styles';

class Checkout extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
			user: {
				name: '',
                photo: images.icon_img_ava,
                email: '',
                phone: '',
                province: '',
                city: '',
                zipCode: '',
                kecamatan: '',
                kelurahan: '',
                address: '',
				addressDetail: '',
				deliveryPrice: 0,
				items: [{
					id: 1,
					image: images.icon_buah_segar,
					title: "Wortel",
					category: "Sayur Segar",
					price: 21000,
					favorite: false,
					pack: 1,
				},
				{
					id: 2,
					image: images.icon_sayur_segar,
					title: "Sawi",
					category: "Sayur Segar",
					price: 14000,
					favorite: false,
					pack: 1,
				},
				{
					id: 3,
					image: images.icon_buah_segar,
					title: "Blackberry",
					category: "Buah Segar",
					price: 21000,
					favorite: true,
					pack: 21,
				}
				,{
					id: 4,
					image: images.icon_sayur_segar,
					title: "Jagung Manis",
					category: "Sayur Segar",
					price: 18000,
					favorite: false,
					pack: 1,
				}]
			},
			validateStatus:{
                fullName: true,
                phone: true,
            },
			isEdit: false,
			subTotalPrice: 0,
            grandTotalPrice: 0,
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
		this.countTotalPrice = this.countTotalPrice.bind(this);
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

	componentDidMount() {
		this.countTotalPrice();
	}

	countTotalPrice(){
        let state = this.state;
        let data = this.state.user.items;
        let delivery = this.state.user.deliveryPrice;
        let subTotal = 0;
        let grandTotal = 0;
		for(i=0; i<data.length; i++){
			subTotal = subTotal + (data[i].price * data[i].pack);
        }
        grandTotal = subTotal + delivery;
        
        state.subTotalPrice = subTotal;
        state.grandTotalPrice = grandTotal;
        this.setState({state});
	}

  	render() {
		return (
			<Container>
				<NavigationBar
					title={'checkout.navigationTitle'}
					onPress={actNav.goBack}
				/>
				<ScrollView>
					<View style={styles.container}>
						<FormInput 
							ref={c => {this.formFullName = c}}
							type={'name'}
							autoFocus={true}
							value={this.state.user.name}
							onChangeText={(type,value) => this.onChangeText(type,value)}
							label={'checkout.label.name'}
							placeholder={'checkout.label.name'}
							onSubmitEditing={this.submitFullName}
						/>
						<VerificationText
							validation={this.state.validateStatus.fullName}
							property={'checkout.validation.fullName'}
                    	/>
						<FormInput 
							ref={c => {this.formPhone = c}}
							type={'phone'}
							keyboardType={'number-pad'}
							value={this.state.user.phone}
							onChangeText={(type,value) => this.onChangeText(type,value)}
							label={'checkout.label.phone'}
							placeholder={'checkout.label.phone'}
							onSubmitEditing={this.submitPhone}
						/>
						<VerificationText
							validation={this.state.validateStatus.phone}
							property={'checkout.validation.phone'}
						/>
						<FormInput 
							ref={c => {this.formProvince = c}}
							type={'province'}
							value={this.state.user.province}
							onChangeText={(type,value) => this.onChangeText(type,value)}
							label={'checkout.label.province'}
							placeholder={'checkout.label.province'}
							onSubmitEditing={this.submitProvince}
						/>
						<FormInput 
							ref={c => {this.formCity = c}}
							type={'city'}
							value={this.state.user.city}
							onChangeText={(type,value) => this.onChangeText(type,value)}
							label={'checkout.label.city'}
							placeholder={'checkout.label.city'}
							onSubmitEditing={this.submitCity}
						/>
						<FormInput 
							ref={c => {this.formZipCode = c}}
							type={'zipCode'}
							keyboardType={'number-pad'}
							value={this.state.user.zipCode}
							onChangeText={(type,value) => this.onChangeText(type,value)}
							label={'checkout.label.zipCode'}
							placeholder={'checkout.label.zipCode'}
							onSubmitEditing={this.submitZipCode}
						/>
						<FormInput 
							ref={c => {this.formKecamatan = c}}
							type={'kecamatan'}
							value={this.state.user.kecamatan}
							onChangeText={(type,value) => this.onChangeText(type,value)}
							label={'checkout.label.kecamatan'}
							placeholder={'checkout.label.kecamatan'}
							onSubmitEditing={this.submitKecamatan}
						/>
						<FormInput 
							ref={c => {this.formKelurahan = c}}
							type={'kelurahan'}
							value={this.state.user.kelurahan}
							onChangeText={(type,value) => this.onChangeText(type,value)}
							label={'checkout.label.kelurahan'}
							placeholder={'checkout.label.kelurahan'}
							onSubmitEditing={this.submitKelurahan}
						/>
						<FormInput 
							ref={c => {this.formAddress = c}}
							type={'address'}
							value={this.state.user.address}
							onChangeText={(type,value) => this.onChangeText(type,value)}
							label={'checkout.label.address'}
							placeholder={'checkout.label.address'}
							onSubmitEditing={this.submitAddress}
						/>
						<FormInput 
							ref={c => {this.formAddressDetails = c}}
							type={'addressDetail'}
							value={this.state.user.addressDetail}
							onChangeText={(type,value) => this.onChangeText(type,value)}
							label={'checkout.label.addressDetails'}
							placeholder={'checkout.label.addressDetails'}
							onSubmitEditing={this.submitAddressDetails}
						/>
					</View>
					<TotalPrice
                        subTotal={this.state.subTotalPrice}
                        grandTotal={this.state.grandTotalPrice}
                        data={this.state.user}
                        navigateToCart={this.navigateToCart}
                    />
				</ScrollView>
			</Container>
		);
  	}
}

export default Checkout;
