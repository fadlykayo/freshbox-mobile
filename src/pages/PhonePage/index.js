import React, { Component } from 'react';
import { View } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import FormInput from '@components/FormInput';
import VerificationText from '@components/VerificationText';
import InputText from './components/InputText';
import Button from './components/Button';
import styles from './styles';
import { connect } from 'react-redux';
import actions from '@actions';

class PhonePage extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
			user: {
				phone: props.user ? props.user.user.phone_number : '',
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

		let payload = {
			header: {
				apiToken: this.props.user.authorization
			},
			body: {
				phone_number: this.state.user.phone
			}
		}
		// console.log('masuk sini', payload)
		this.props.update_user(payload,
			(success) => {
				actNav.goBack()
			},
			(err) => {
				console.log(err)
			})
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
						</View>
						<View style={styles.buttonPlace}>
							<Button 
								title={'phonePage.button.save'}
								isEdit={this.state.isEdit}
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
								isEdit={this.state.isEdit}
								onPress={this.editPhonePage}
							/>
						</View>
  	  	  			</View>
				)}
  	  	  		
			</Container>
  	  	);
  	}
}

const mapStateToProps = (state) => ({
	user: state.user.data
})

const mapDispatchToProps = (dispatch) => ({
	update_user: (req,res,err) => dispatch(actions.user.api.update_user(req,res,err))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps)(PhonePage);
