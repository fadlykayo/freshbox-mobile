import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { actNav } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import Logo from './components/Logo';
import FormInput from '@components/FormInput';
import Button from '@components/Button';
import InputData from './components/InputData';
import styles from './styles';

class ContactUs extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
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
                <Logo />
				<ScrollView 
					style={styles.container}
                >
					<View style={styles.middleComponent}>
						<InputData
							ref={c => {this.formSubject = c}}
							type={'subject'}
							onChangeText={(type, value) => this.onChangeText(type, value)}
							title={'contactUs.content.subject'}
							onSubmitEditing={this.submitSubject}
						/>
						<FormInput
							ref={c => {this.formMessage = c}}
							type={'message'}
							onChangeText={(type, value) => this.onChangeText(type, value)}
							value={this.state.message}
							label={'contactUs.label.message'}
							placeholder={'contactUs.content.message'}
							onSubmitEditing={this.submitInformation}
						/>
					</View>
					<View style={styles.bottomComponent}>
						<Button
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
