import React, { Component } from 'react';
import { View } from 'react-native';
import { actNav } from '@navigations';
import { validation } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import FormInput from '@components/FormInput';
import VerificationText from '@components/VerificationText';
import Button from './components/Button';
import images from '@assets'
import styles from './styles';


class PhonePage extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
            user:{
                fullName: '',
                phone: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            validateStatus:{
                phone: true,
            }
		}
		this.setValidation = this.setValidation.bind(this);
		this.clearValidation = this.clearValidation.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
		this.submitPhone = this.submitPhone.bind(this);
		this.phoneValidation = this.phoneValidation.bind(this);
		this.updatePhoneHandler = this.updatePhoneHandler.bind(this);
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
	
	updatePhoneHandler(){
        alert(`Update Phone Number ${this.state.user.phone}`)
    }

  	render() {
  	  	return (
			<Container>
				<NavigationBar
					title={'phonePage.navigationTitle'}
					onPress={actNav.goBack}
				/>
  	  	  		<View style={styles.container}>
					<View style={styles.formPhone}>
						<FormInput 
							type={'phone'}
							keyboardType={'number-pad'}
							value={this.state.user.phone}
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
							title={'phonePage.button.editPhone'}
							onPress={this.submitPhone}
						/>
					</View>
  	  	  		</View>
			</Container>
  	  	);
  	}
}

export default PhonePage;
