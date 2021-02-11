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
import actions from '@actions';

class PhonePage extends Component {
	constructor (props) {
		super(props);
		this.state = {
			user: {
				email: props.user ? props.user.user.email : ''
			},
			validateStatus: {
				email: true
			},
			isEdit: false,
			focus: true,
			type: props.navigation.state.params.type,
		};
		this.setValidation = this.setValidation.bind(this);
		this.clearValidation = this.clearValidation.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
		this.submitPhone = this.submitPhone.bind(this);
		this.updatePhoneHandler = this.updatePhoneHandler.bind(this);
		this.editPhonePage = this.editPhonePage.bind(this);
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
		this.clearValidation();
		this.onChangeText('email', this.state.user.email);
		this.updatePhoneHandler();
	}

	updatePhoneHandler() {
		let payload = {
			header: {
				apiToken: this.props.user.authorization
			},
			body: {
				email: this.state.user.email,
			}
		};

		if (this.state.user.email !== this.props.user.user.email) {
			this.props.update_user(payload,
				(success) => {
						actNav.goBack()
				},
				(err) => {});
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
					title={'emailPage.navigationTitle'}
					onPress={actNav.goBack}
				/>
				<View style={styles.container}>
					<View style={styles.formPhone}>
			
						{this.state.isEdit ? (
							<View>
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
							</View>
						) : (
								<InputText
									label={'namePage.label.email'}
									input={this.props.user.user.email}
								/>
							)}
					</View>
					<View style={styles.buttonPlace}>
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
