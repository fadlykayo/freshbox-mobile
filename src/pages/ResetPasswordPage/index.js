import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation, language } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import FormInput from '@components/FormInput';
import VerificationText from '@components/VerificationText';
import Button from '@components/Button';
import ResetPasswordSuccess from './components/ResetPasswordSuccess';
import styles from './styles';
import { connect } from 'react-redux';
import actions from '@actions';

class ResetPasswordPage extends Component {
	constructor(props) {
		super(props)
	  	this.state = {
			user:{
				otp: '',
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
				otp: true,
				otpLength: true,
			},
			modalVisible:{
                resetPasswordSuccess: false,
            }
		}
		this.createNewPassword = this.createNewPassword.bind(this);
	  	this.setValidation = this.setValidation.bind(this);
	  	this.clearValidation = this.clearValidation.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
		this.submitOldPassword = this.submitOldPassword.bind(this);  
		this.submitPassword = this.submitPassword.bind(this);
		this.submitConfirmPassword = this.submitConfirmPassword.bind(this);
		this.submitOTP = this.submitOTP.bind(this);
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
		validateStatus.oldPasswordLength = true;
		validateStatus.oldPassword = true;
        validateStatus.password = true;
        validateStatus.passwordLength = true;
		validateStatus.confirmPassword = true;
		validateStatus.otp = true;
  	    this.setState({validateStatus});
    }

    onChangeText(type,value){
	    let user = this.state.user;
	    user[type] = value;
	    this.setState({user});
    }
	  
	submitOldPassword(){
        let userPassword = this.state.user.oldPassword.trim();
        this.clearValidation();
		this.onChangeText('oldPassword',userPassword);
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
		if(this.props.navigation.state.params.action == 'profile') {
			this.passwordValidation();
		} else this.formOTP.focus();
	}
	
	submitOTP() {
		let userOTP = this.state.user.otp.trim();
        this.clearValidation();
		this.onChangeText('otp', userOTP);
		this.passwordValidation();
	}

  	passwordValidation(){
		if(this.props.navigation.state.params.action == 'profile') {
			validation.resetPassword(this.state.user)
			.then(() => {
				this.updatePasswordHandler();
			})
			.catch(err => {
				this.setValidation(err, false)
			})
		} else {
			validation.forgotPassword(this.state.user)
			.then(() => {
				this.createNewPassword();
			})
			.catch(err => {
				this.setValidation(err, false)
			})
		}
  	}
  
  	updatePasswordHandler(){
		let payload = {
			header: {
				apiToken: this.props.user.authorization
			},
			body: {
				old_password: this.state.user.oldPassword,
				new_password: this.state.user.newPassword,
				new_password_confirmation: this.state.user.confirmPassword
			}
		}

		this.props.edit_password(payload,
			(res) => {
				language.transformText('message.successResetPassword')
				.then(message => {
					this.props.set_success_status({
						status: true,
						data: message,
						title: 'formSuccess.title.default'
					});
					setTimeout(() => {
						this.props.set_success_status({
							status: false,
							data: '',
							title: ''
						});
						actNav.goBack();
					},2000);
				});
			},
			(err) => {
				console.log(err)
			})
	}

	createNewPassword() {
		let payload = {
			header: {},
			body: {
				phone_number: this.props.navigation.state.params.phone,
				password: this.state.user.newPassword,
				password_confirmation: this.state.user.confirmPassword,
				otp_validation: this.state.user.otp
			}
		}

		this.props.reset_password(payload,
			(res) => {
				console.log(res)
				actNav.reset(navConstant.Product)
			},
			(err) => {
				console.log(err)
			})
	}
	  
	closeDialogResetPasswordSuccess(){
		setTimeout(() => {
            actNav.goBack();
        },2000);
    }

  	render() {
  	  	return (
			<Container 				
				bgColorBottom={'veryLightGrey'} 				
				bgColorTop={'red'} 			
			>
				<NavigationBar
					title={'resetPasswordPage.navigationTitle'}
					onPress={actNav.goBack}
				/>
  	  	  		<View style={styles.container}>
					<View style={styles.formPassword}>
						{this.props.navigation.state.params.action == 'profile'
							? (
								<FormInput 
                    			    ref={c => {this.formOldPassword = c}}
									type={'oldPassword'}
									autoFocus={this.props.navigation.state.params.action == 'profile' ? true : false}
                    			    isPassword={true}
                    			    value={this.state.user.oldPassword}
                    			    onChangeText={this.onChangeText}
                    			    label={'resetPasswordPage.formLabel.oldPassword'}
                    			    placeholder={'resetPasswordPage.formLabel.oldPassword'}
                    			    onSubmitEditing={this.submitOldPassword}
                    			/>
							) : null
						}
                    	<VerificationText
                    	    validation={this.state.validateStatus.oldPassword}
                    	    property={'resetPasswordPage.validation.password'}
                    	/>
						<VerificationText
                    	    validation={this.state.validateStatus.oldPasswordLength}
                    	    property={'resetPasswordPage.validation.passwordLength'}
                    	/>
						<FormInput 
                    	    ref={c => {this.formPassword = c}}
                    	    type={'newPassword'}
							isPassword={true}
							autoFocus={this.props.navigation.state.params.action == 'forgotPassword' ? true : false}
                    	    value={this.state.user.newPassword}
                    	    onChangeText={this.onChangeText}
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
                    	    onChangeText={this.onChangeText}
                    	    label={'resetPasswordPage.formLabel.confirmPassword'}
                    	    placeholder={'resetPasswordPage.formLabel.confirmPassword'}
                    	    onSubmitEditing={this.submitConfirmPassword}
                    	/>
                    	<VerificationText
                    	    validation={this.state.validateStatus.confirmPassword}
                    	    property={'resetPasswordPage.validation.confirmPassword'}
                    	/>
						{this.props.navigation.state.params.action == 'forgotPassword'
							? (
								<FormInput 
                    			    ref={c => {this.formOTP = c}}
									type={'otp'}
									maxLength = {4}
                    			    value={this.state.user.otp}
                    			    onChangeText={this.onChangeText}
                    			    label={'resetPasswordPage.formLabel.otp'}
                    			    placeholder={'resetPasswordPage.formLabel.otp'}
                    			    onSubmitEditing={this.submitOTP}
                    			/>
							) : null
						}
						<VerificationText
                    	    validation={this.state.validateStatus.otp}
                    	    property={'resetPasswordPage.validation.otp'}
                    	/>
						<VerificationText
                    	    validation={this.state.validateStatus.otpLength}
                    	    property={'resetPasswordPage.validation.otpLength'}
                    	/>
					</View>
					<View style={styles.buttonPlace}>
						<Button
							type={'red'}
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

const mapStateToProps = (state) => ({
	user: state.user.data
})

const mapDispatchToProps = (dispatch) => ({
	edit_password: (req,res,err) => dispatch(actions.user.api.edit_password(req,res,err)),
	reset_password: (req,res,err) => dispatch(actions.auth.api.reset_password(req,res,err)),
	set_success_status: (payload) => dispatch(actions.network.reducer.set_success_status(payload)),
	set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
