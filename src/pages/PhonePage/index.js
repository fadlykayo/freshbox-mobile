import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import FormInput from '@components/FormInput';
import VerificationText from '@components/VerificationText';
import InputText from './components/InputText';
import Button from './components/Button';
import images from '@assets'
import styles from './styles';
import { connect } from 'react-redux';
import actions from '@actions';

class PhonePage extends PureComponent {
  	constructor(props) {
  		super(props)
		this.state = {
            user:{
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
                phone: true,
			},
			isEdit: false,
		}
		this.setValidation = this.setValidation.bind(this);
		this.clearValidation = this.clearValidation.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
		this.submitPhone = this.submitPhone.bind(this);
		this.phoneValidation = this.phoneValidation.bind(this);
		this.updatePhoneHandler = this.updatePhoneHandler.bind(this);
		this.editPhonePage = this.editPhonePage.bind(this);
		this.spacePhoneNumber = this.spacePhoneNumber.bind(this);
	}

	editPhonePage() {
		this.setState({isEdit: true})
	}

	setValidation(type,value){
        let validateStatus = this.state.validateStatus;
        validateStatus[type] = value;
        this.setState({validateStatus});
    }

    clearValidation(){
        let validateStatus = this.state.validateStatus;
        validateStatus.phone = true;
        this.setState({validateStatus});
    }

	onChangeText(type,value){
        let user = this.state.user;
        user[type] = value;
        this.setState({user});
    }

	submitPhone(){
		let userPhone = this.state.user.phone.trim();
        this.clearValidation();
		this.onChangeText('phone',userPhone);
		this.phoneValidation();
	}

	phoneValidation(){
        validation.phone(this.state.user.phone)
        	.then(() => {
				if(this.state.validateStatus.phone == false) this.setValidation('phone',true);
				this.updatePhoneHandler();
        	})
        	.catch(() => {
        	    this.setValidation('phone',false);
        	})
	}

	spacePhoneNumber(input) {
        return input.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'')
    }
	
	updatePhoneHandler(){
		// alert(`Update Phone Number ${this.state.user.phone}`)
		actNav.reset(navConstant.Product)
    }

  	render() {
  	  	return (
			<Container>
				<NavigationBar
					title={'phonePage.navigationTitle'}
					onPress={actNav.goBack}
				/>
				{ this.state.isEdit ? (
					<View style={styles.container}>
						<View style={styles.formPhone}>
							<FormInput 
								type={'phone'}
								keyboardType={'number-pad'}
								value={this.props.user.user.phone_number}
								onChangeText={(type,value) => this.onChangeText(type,value)}
								label={'phonePage.formLabel.phone'}
								placeholder={'phonePage.formLabel.phone'}
								onSubmitEditing={this.submitPhone}
							/>
							<VerificationText
								validation={this.state.validateStatus.phone}
								property={'phonePage.validation.phone'}
							/>
						</View>
						<View style={styles.buttonPlace}>
							<Button 
								title={'phonePage.button.save'}
								onPress={this.submitPhone}
							/>
						</View>
  	  	  			</View>
				) : (
					<View style={styles.container}>
						<View style={styles.formPhone}>
							<InputText
								label={'phonePage.label.phone'}
								input={this.spacePhoneNumber(this.props.user.user.phone_number)}
							/>
						</View>
						<View style={styles.buttonPlace}>
							<Button
								title={'phonePage.button.edit'}
								onPress={this.editPhonePage}
							/>
						</View>
  	  	  			</View>
				)}
  	  	  		
			</Container>
  	  	);
  	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user.data
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps)(PhonePage);
