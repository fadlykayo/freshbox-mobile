import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import FormInput from '@components/FormInput';
import VerificationText from '@components/VerificationText';
import Button from './components/Button';
import ResetPasswordSuccess from './components/ResetPasswordSuccess';
import styles from './styles';

class ResetPasswordPage extends Component {
	constructor(props) {
		super(props)
	  	this.state = {
			user:{
                oldPassword: '',
				newPassword: '',
                confirmPassword: ''
            },
            validateStatus:{
				oldPasswordLength: true,
				oldPassword: true,
                password: true,
                passwordLength: true,
                confirmPassword: true,
			},
			modalVisible:{
                resetPasswordSuccess: false,
            }
	  	}
	  	this.setValidation = this.setValidation.bind(this);
	  	this.clearValidation = this.clearValidation.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
		this.submitOldPassword = this.submitOldPassword.bind(this);  
		this.submitPassword = this.submitPassword.bind(this);
		this.submitConfirmPassword = this.submitConfirmPassword.bind(this);  
	  	this.passwordValidation = this.passwordValidation.bind(this);
		this.updatePasswordHandler = this.updatePasswordHandler.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);
		this.closeDialogResetPasswordSuccess = this.closeDialogResetPasswordSuccess.bind(this);
  	}

	setModalVisible(type,value){
        let modalVisible = this.state.modalVisible;
        modalVisible[type] = value;
        this.setState({modalVisible});
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
	  
	submitOldPassword(){
        let userPassword = this.state.user.password.trim();
        this.clearValidation();
		this.onChangeText('password',userPassword);
		this.formPassword.focus();
    }

	submitPassword(){
        let userPassword = this.state.user.newPassword.trim();
        this.clearValidation();
		this.onChangeText('newPassword',userPassword);
        this.formConfirmPassword.focus();
    }

    submitConfirmPassword() {
        let userConfirmPassword = this.state.user.confirmPassword.trim();
        this.clearValidation();
		this.onChangeText('confirmPassword',userConfirmPassword);
        this.passwordValidation();
    }

  	passwordValidation(){
		validation.passwordLength(this.state.user.oldPassword)
        .then(() => {
			if(this.state.validateStatus.oldPasswordLength == false) this.setValidation('oldPasswordLength',true);
			validation.password(this.state.user.newPassword)
        	.then(() => {
				if(this.state.validateStatus.oldPassword == false) this.setValidation('oldPassword',true);
				validation.passwordLength(this.state.user.newPassword)
        		.then(() => {
        		    if(this.state.validateStatus.passwordLength == false) this.setValidation('passwordLength',true);
        		    validation.password(this.state.user.newPassword)
        		    .then(() => {
						if(this.state.validateStatus.password == false) this.setValidation('password',true);
        		        validation.confirmPassword(this.state.user.newPassword,this.state.user.confirmPassword)
        		        .then(() => {
        		            if(this.state.validateStatus.confirmPassword == false) this.setValidation('confirmPassword',true);
        		            this.updatePasswordHandler();
        		        })
        		        .catch(() => {
        		            this.setValidation('confirmPassword',false);
        		        })
        		    })
        		    .catch(() => {
        		        this.setValidation('password',false);
        		    })
        		})
        		.catch(() => {
        		    this.setValidation('passwordLength',false);
				})
			})
			.catch(() => {
				this.setValidation('oldPassword',false);
			})
		})
		.catch(() => {
			this.setValidation('oldPassword', false);
		})
		
  	}
  
  	updatePasswordHandler(){
		Keyboard.dismiss();
		this.setModalVisible('resetPasswordSuccess',true);
	}
	  
	closeDialogResetPasswordSuccess(){
		actNav.navigate(navConstant.Menu);
    }

  	render() {
		console.log(this.props.navigation.state.params);
  	  	return (
			<Container>
				<NavigationBar
					title={'resetPasswordPage.navigationTitle'}
					onPress={actNav.goBack}
				/>
  	  	  		<View style={styles.container}>
					<View style={styles.formPassword}>
						<FormInput 
                    	    ref={c => {this.formEmail = c}}
                    	    type={'email'}
                    	    keyboardType={'email-address'}
                    	    value={this.state.user.email}
                    	    onChangeText={(type,value) => this.onChangeText(type,value)}
                    	    label={'register.formLabel.email'}
                    	    placeholder={'register.formLabel.email'}
                    	    onSubmitEditing={this.submitEmail}
                    	/>
	
                    	<VerificationText
                    	    validation={this.state.validateStatus.emailFormat}
                    	    property={'register.validation.emailFormat'}
                    	/>
                    	<VerificationText
                    	    validation={this.state.validateStatus.emailLength}
                    	    property={'register.validation.emailLength'}
                    	/>
						<FormInput 
                    	    ref={c => {this.formPassword = c}}
                    	    type={'newPassword'}
                    	    isPassword={true}
                    	    value={this.state.user.newPassword}
                    	    onChangeText={(type,value) => this.onChangeText(type,value)}
                    	    label={'resetPasswordPage.formLabel.newPassword'}
                    	    placeholder={'resetPasswordPage.formLabel.newPassword'}
                    	    onSubmitEditing={this.submitPassword}
                    	/>
                    	<VerificationText
                    	    validation={this.state.validateStatus.passwordLength}
                    	    property={'resetPasswordPage.validation.passwordLength'}
                    	/>
                    	<VerificationText
                    	    validation={this.state.validateStatus.password}
                    	    property={'resetPasswordPage.validation.password'}
                    	/>
                    	<FormInput 
                    	    ref={c => {this.formConfirmPassword = c}}
                    	    type={'confirmPassword'}
                    	    isPassword={true}
                    	    value={this.state.user.confirmPassword}
                    	    onChangeText={(type,value) => this.onChangeText(type,value)}
                    	    label={'resetPasswordPage.formLabel.confirmPassword'}
                    	    placeholder={'resetPasswordPage.formLabel.confirmPassword'}
                    	    onSubmitEditing={this.submitConfirmPassword}
                    	/>
                    	<VerificationText
                    	    validation={this.state.validateStatus.confirmPassword}
                    	    property={'resetPasswordPage.validation.confirmPassword'}
                    	/>
					</View>
					<View style={styles.buttonPlace}>
						<Button 
							title={'resetPasswordPage.button.changePassword'}
							onPress={this.passwordValidation}
						/>
					</View>
  	  	  		</View>
				<ResetPasswordSuccess
                    modalVisible={this.state.modalVisible.resetPasswordSuccess}
                    closeDialogResetPasswordSuccess={this.closeDialogResetPasswordSuccess}
                />
			</Container>
  	  	);
  	}
}

export default ResetPasswordPage;
