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
import styles from './styles';
import {connect} from 'react-redux';
import actions from '@actions';

class ChangeName extends Component {
	constructor (props) {
		super(props);
		this.state = {
			name: props.user ? props.user.user.name : '',
			validateStatus: {
				name: true,
			},
			isEdit: false,
			focus: true,
		};
		this.setValidation = this.setValidation.bind(this);
		this.clearValidation = this.clearValidation.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
		this.submit = this.submit.bind(this);
		this.nameValidation = this.nameValidation.bind(this);
		this.updateNameHandler = this.updateNameHandler.bind(this);
		this.setEdit = this.setEdit.bind(this);
	}

	setEdit() {
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
		this.setState({name: value});
	}

	submit() {
		this.clearValidation();
		this.onChangeText('name', this.state.name);
		this.nameValidation();
	}

	nameValidation() {
		validation.fullName(this.state.name)
			.then(() => {
				if (this.state.validateStatus.name == false) this.setValidation('name', true);
				this.updateNameHandler();
			})
			.catch(() => {
				this.setValidation('name', false);
			});
	}

	updateNameHandler() {
		let payload = {
			header: {
				apiToken: this.props.user.authorization
			},
			body: {
				name: this.state.name
			}
		};
		this.props.update_user(payload,
			(success) => {
				console.log(success);
				//actNav.goBack();
			},
			(err) => {
				// console.log(err)
			});
	}

	render() {
		return (
			<Container
				bgColorBottom={'veryLightGrey'}
				bgColorTop={'red'}
			>
				<NavigationBar
					title={'namePage.navigationTitle'}
					onPress={actNav.goBack}
				/>
				<View style={styles.container}>
					<View style={styles.formPhone}>
						{this.state.isEdit ? (
							<View>
								<FormInput
									type={'name'}
									value={this.state.name}
									onChangeText={this.onChangeText}
									label={'namePage.formLabel.phone'}
									placeholder={'namePage.formLabel.phone'}
									onSubmitEditing={this.submit}
								/>
								<VerificationText
									validation={this.state.validateStatus.name}
									property={'namePage.validation.phone'}
								/>
							</View>
						) : (
								<InputText
									label={'namePage.label.phone'}
									input={this.props.user.user.name}
								/>
							)}
					</View>
					<View style={styles.buttonPlace}>
						<Button
							type={this.state.isEdit ? 'red' : 'white'}
							title={this.state.isEdit ? 'namePage.button.save' : 'namePage.button.edit'}
							onPress={this.state.isEdit ? this.submit : this.setEdit}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangeName);
