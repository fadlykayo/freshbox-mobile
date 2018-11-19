import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { actNav } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import Button from '@components/Button';
import Dropdown from './components/Dropdown';
import Logo from './components/Logo';
import FormInput from '@components/FormInput';
import InputData from './components/InputData';
import styles from './styles';

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
	}

	onChangeText(type,value){
        let user = this.state;
        user[type] = value;
        this.setState({user});
	}

	submitSubject() {
		this.formMessage.focus();
	}

	submitInformation() {
		alert(`${this.state.subject} ${this.state.message}`)
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
                >
					<Logo />
					<View style={styles.middleComponent}>
						<Dropdown
							type={'subject'}
							data={this.state.subjects}
							isOpen={true}
							value={this.state.subject}
							onChangeText={this.onChangeText}
							label={'contactUs.content.subject'}
							placeholder={'contactUs.content.subject'}
						/>
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
					<View style={styles.bottomComponent}>
						<Button
							type={'red'}
							title={'contactUs.button.submit'}
							onPress={this.submitInformation}
						/>
					</View>
				</ScrollView>
			</Container>
  	  	);
  	}
}

export default ContactUs;
