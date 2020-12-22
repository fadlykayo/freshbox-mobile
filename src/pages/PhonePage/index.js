import React, {Component} from 'react';
import {View} from 'react-native';
import {actNav, navConstant} from '@navigations';
import {validation} from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import FormInput from '@components/FormInput';
import VerificationText from '@components/VerificationText';
import InputText from './components/InputText';
import Button from '@components/Button';
import StaticText from '@components/StaticText';
import styles from './styles';
import {connect} from 'react-redux';
import ModalConfirmation from './components/ModalConfirmation';
import actions from '@actions';

class PhonePage extends Component {
	constructor (props) {
		super(props);
		this.state = {
			user: {
				phone: props.user ? props.user.user.phone_number : '',
				name: props.user ? props.user.user.name : '',
				email: props.user ? props.user.user.email : ''
			},
			isName: props.navigation.state.params.isName,
			isEmail: this.props.user.user.email.includes("privaterelay.appleid.com"),
			validateStatus: {
				phone: true,
				name: true,
				email: true
			},
			isEdit: false,
			focus: true,
			type: props.navigation.state.params.type,
			modalConfirmation: false
		};
		this.setValidation = this.setValidation.bind(this);
		this.clearValidation = this.clearValidation.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
		this.submitPhone = this.submitPhone.bind(this);
		this.phoneValidation = this.phoneValidation.bind(this);
		this.updatePhoneHandler = this.updatePhoneHandler.bind(this);
		this.editPhonePage = this.editPhonePage.bind(this);
		this.spacePhoneNumber = this.spacePhoneNumber.bind(this);
		this.formatPhoneNumber = this.formatPhoneNumber.bind(this);
	}

	componentDidMount() {
		if (this.props.navigation.state.params.type === 'otp') {
			this.setState({isEdit: true});
		}
	}

	editPhonePage() {
		this.setState({isEdit: true});
	}

	setValidation(type, value) {
		let validateStatus = this.state.validateStatus;
		validateStatus[type] = value;
		this.setState({validateStatus});
	}

	clearValidation() {
		let validateStatus = this.state.validateStatus;
		validateStatus.phone = true;
		this.setState({validateStatus});
	}

	onChangeText(type, value) {
		let user = this.state.user;
		user[type] = value;
		this.setState({user});
	}

	submitPhone() {
		let userPhone = this.state.user.phone ? this.state.user.phone.trim() : '';
		this.clearValidation();
		this.onChangeText('phone', userPhone);
		this.onChangeText('name', this.state.user.name);
		this.onChangeText('email', this.state.user.email);
		this.phoneValidation();
	}

	phoneValidation() {
		validation.updateProfile(this.state.user.phone, this.state.user.name, this.state.user.email)
			.then(() => {
				if (this.state.validateStatus.phone == false) this.setValidation('phone', true);
				if (this.state.validateStatus.name == false) this.setValidation('name', true);
				//if (this.state.validateStatus.email == false) this.setValidation('email', true);
				this.setState({
					modalConfirmation: true
				})
				//this.updatePhoneHandler();
			})
			.catch((type) => {
				this.setValidation(type, false);
			});
	}

	spacePhoneNumber(input) {
		return input ? input.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/, '') : '';
	}

	formatPhoneNumber() {
		this.onChangeText('phone', this.state.user.phone.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/, ''));
	}

	updatePhoneHandler() {
		let payload = {
			header: {
				apiToken: this.props.user.authorization
			},
			body: {
				phone_number: this.state.user.phone,
			}
		};

		if (this.state.isName) {
			payload.body.name = this.state.user.name;
		};
		//if (this.state.isEmail) {
		//	payload.body.email = this.state.user.email;
		//};

		if (this.state.user.phone !== this.props.user.user.phone_number) {
			if (!this.state.isName) {
				payload.body.profile_page = true;
			};

			this.props.update_user(payload,
				(success) => {
					let params = {
						action: 'phone',
						phone_number: this.state.user.phone,
						verifyOTP: true,
					}
					if (this.state.isName) {
						params.isCart = true
						actNav.navigate(navConstant.OTP, params);
					} else {
						actNav.goBack()
					}
				},
				(err) => {
						console.log(err)
				});
		} else {
			this.setState({isEdit: false})
		}
	}

	render() {
		return (
			<Container
				bgColorBottom={'veryLightGrey'}
				bgColorTop={'red'}
			>
				<NavigationBar
					title={'phonePage.navigationTitle'}
					onPress={actNav.goBack}
				/>
				<ModalConfirmation
					button={'button.ok'}
					message={'modal.content.changePhoneConfirmation'}
					onPress={this.updatePhoneHandler}
					modalVisible={this.state.modalConfirmation}
					onPressClose={() => this.setState({
						modalConfirmation: false
					})}
				/>
				<View style={styles.container}>
					<View style={styles.formPhone}>
			
						{this.state.isEdit ? (
							<View>
								<FormInput
									type={'phone'}
									keyboardType={'number-pad'}
									value={this.state.user.phone}
									onChangeText={this.onChangeText}
									label={'phonePage.formLabel.phone'}
									placeholder={'phonePage.formLabel.phone'}
									onSubmitEditing={this.submitPhone}
								/>
								<VerificationText
									validation={this.state.validateStatus.phone}
									property={'phonePage.validation.phone'}
								/>
								{
									this.state.isName && (
										<>
											<FormInput
												type={'name'}
												value={this.state.user.name}
												onChangeText={this.onChangeText}
												label={'namePage.formLabel.phone'}
												placeholder={'namePage.formLabel.phone'}
												onSubmitEditing={this.submit}
											/>
											<VerificationText
												validation={this.state.validateStatus.name}
												property={'namePage.validation.phone'}
											/>
									</>
									)
								}
								{/*{
									this.state.isEmail && (
										<>
											<FormInput
												type={'email'}
												value={this.state.user.email}
												onChangeText={this.onChangeText}
												label={'namePage.formLabel.email'}
												placeholder={'namePage.formLabel.email'}
												onSubmitEditing={this.submit}
											/>
											<VerificationText
												validation={this.state.validateStatus.email}
												property={'namePage.validation.email'}
											/>
										</>
									)
								}*/}
							</View>
						) : (
							<>
								<InputText
									label={'phonePage.label.phone'}
									input={this.spacePhoneNumber(this.props.user.user.phone_number)}
								/>
								{
									this.state.isName && (
											<InputText
												label={'namePage.label.phone'}
												input={this.props.user.user.name}
											/>
									)	
								}
								{/*{
									this.state.isEmail && (
										<InputText
											label={'namePage.label.email'}
											input={this.props.user.user.email}
										/>
									)
								}*/}
								</>
							)}
					</View>
					<View style={styles.buttonPlace}>
						<StaticText
							style={styles.text}
							property={'modal.content.changePhoneConfirmation'}
						/>
						<Button
							type={this.state.isEdit ? 'red' : 'white'}
							title={this.state.isEdit ? 'phonePage.button.save' : 'phonePage.button.edit'}
							onPress={this.state.isEdit ? this.submitPhone : this.editPhonePage}
						/>
					</View>
				</View>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user.data
});

const mapDispatchToProps = (dispatch) => ({
	update_user: (req, res, err) => dispatch(actions.user.api.update_user(req, res, err))
});

export default connect(mapStateToProps, mapDispatchToProps)(PhonePage);
