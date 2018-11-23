import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
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
			subject: '',
			message: '',
			placeholder: '',
		}
		this.onChangeText = this.onChangeText.bind(this);
		this.submitInformation = this.submitInformation.bind(this);
		this.submitSubject = this.submitSubject.bind(this);
		this.renderSubjectHistory = this.renderSubjectHistory.bind(this);
	}

	componentDidMount() {
		this.renderSubjectHistory();
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

	submitSubject() {
		this.formMessage.focus();
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
				console.log(res)
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
				// language.transformText('message.invalidCreditCard')
				// .then(message => {
				// 	this.props.set_error_status({
				// 		status: true,
				// 		title: 'formError.title.default',
				// 		data: message,
            	//     });
            	// });
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
                <Logo />
				<ScrollView 
					style={styles.container}
					keyboardShouldPersistTaps={'handled'}
                >
					
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
									isOpen={true}
									value={this.state.subject}
									onChangeText={this.onChangeText}
									label={'contactUs.content.subject'}
									placeholder={'contactUs.content.subject'}
								/>
							)
						}
						<FormInput
							ref={c => {this.formMessage = c}}
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
