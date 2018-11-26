import React, { Component } from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { actNav } from '@navigations';
import { language } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import Button from '@components/Button';
import Dropdown from './components/Dropdown';
import Logo from './components/Logo';
import FormInput from '@components/FormInput';
import InputData from './components/InputData';
import { connect } from 'react-redux';
import styles from './styles';
import actions from '@actions';

class ContactUs extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
			subjects: [
				{
					name: 'contactUs.info.question'
				},
				{
					name: 'contactUs.info.complaint'
				},
				{
					name: 'contactUs.info.advice'
				},
				{
					name: 'contactUs.info.review'
				},
				{
					name: 'contactUs.info.others'
				},
			],
			isOpen: {
				subject: false
			},
			subject: '',
			message: '',
			placeholder: '',
		}
		this.onChangeText = this.onChangeText.bind(this);
		this.submitInformation = this.submitInformation.bind(this);
		this.submitSubject = this.submitSubject.bind(this);
		this.renderSubjectHistory = this.renderSubjectHistory.bind(this);
		this.showDropdown = this.showDropdown.bind(this);
	}

	componentDidMount() {
		this.renderSubjectHistory();
	}

	submitSubject(value,nextValue) {
		this.showDropdown(value,nextValue)
	}

	showDropdown(value, nextValue){
		let isOpen = this.state.isOpen;
		if(value != null && nextValue == null) {
			isOpen[value] = !isOpen[value];
			this.setState({isOpen}, () =>{
				this.formMessage.focus();
			})
		}
		else {
			isOpen[nextValue] = !isOpen[nextValue];
			this.setState({isOpen});
		}    
    }

	onChangeText(type,value){
        let user = this.state;
        user[type] = value;
        this.setState({user});
	}

	renderSubjectHistory(lang = 'id') {
		if(this.props.navigation.state.params.action == 'history') {
			language.transformText('contactUs.info.reviewProduct',lang,{ invoice: this.props.navigation.state.params.data.invoice})
			.then((res) => {
				this.setState({subject: res});
			});
		}
	}

	submitInformation() {
		let payload = {
			header: {
				apiToken: this.props.user.authorization
			},
			body: {
				subject: this.state.subject,
				message: this.state.message
			}
		}

		this.props.message_to_cs(payload,
			(res) => {
				let state = this.state;
				language.transformText('message.sendInformationSuccess')
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
						state.subject = '';
						state.message = '';
						this.setState(state);
						actNav.goBack();
					},1000);
				});
			},
			(err) => {
				console.log(err)
			})
	}

  	render() {
  	  	return (
			<Container 				
				bgColorBottom={'veryLightGrey'} 				
				bgColorTop={'red'} 			
			>
				<NavigationBar
					title={'contactUs.navigationTitle'}
					onPress={actNav.goBack}
				/>
                
				<ScrollView
					style={styles.container}
					bounces={true}
					keyboardShouldPersistTaps={'handled'}
					keyboardDismissMode={'on-drag'}
                >
					<Logo />
					<View style={styles.middleComponent}>
						{ this.props.navigation.state.params.action == 'history'
							? (
								<InputData
									data={this.props.navigation.state.params.data}
								/>
							)
							: (
								<Dropdown
									type={'subject'}
									data={this.state.subjects}
									isOpen={this.state.isOpen.subject}
									value={this.state.subject}
									nextValue={null}
									onChangeText={this.onChangeText}
									label={'contactUs.content.subject'}
									placeholder={'contactUs.content.subject'}
									showDropdown={this.showDropdown}
									submitSubject={this.submitSubject}
								/>
							)
						}
						<FormInput
							ref={c => {this.formMessage = c}}
							returnKeyType={'done'}
							type={'message'}
							multiline={true}
							onChangeText={this.onChangeText}
							value={this.state.message}
							label={'contactUs.label.message'}
							placeholder={'contactUs.content.message'}
							onSubmitEditing={this.submitInformation}
						/>
					</View>
					<Button
						type={'red'}
						title={'contactUs.button.submit'}
						onPress={this.submitInformation}
					/>
				</ScrollView>
			</Container>
  	  	);
  	}
}

const mapStateToProps = (state) => ({
	user: state.user.data
})

const mapDispatchToProps = (dispatch) => ({
	set_success_status: (payload) => dispatch(actions.network.reducer.set_success_status(payload)),
	set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
	message_to_cs: (req,res,err) => dispatch(actions.cs.api.message_to_cs(req,res,err)),
})

export default connect(mapStateToProps,mapDispatchToProps)(ContactUs);
