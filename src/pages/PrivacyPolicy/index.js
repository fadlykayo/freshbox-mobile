import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { actNav } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import StaticText from '@components/StaticText';
import Content from './components/Content';
import images from '@assets';
import styles from './styles';

class TermsConditions extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
			contents: [
				{
					title: 'privacyPolicy.content.info.collectData.title',
					isOpen: false,
					preInfo: {
						data: "privacyPolicy.content.info.collectData.preInfo"	
					},
					data: ['privacyPolicy.content.info.collectData.data.1', 'privacyPolicy.content.info.collectData.data.2']
				},
				{
					title: 'privacyPolicy.content.info.useData.title',
					isOpen: false,
					preInfo: {
						data: "privacyPolicy.content.info.useData.preInfo"	
					},
					data: ['privacyPolicy.content.info.useData.data.1', 'privacyPolicy.content.info.useData.data.2', 'privacyPolicy.content.info.useData.data.3', 'privacyPolicy.content.info.useData.data.4', 'privacyPolicy.content.info.useData.data.5', 'privacyPolicy.content.info.useData.data.6', 'privacyPolicy.content.info.useData.data.7']
				},
				{
					title: 'privacyPolicy.content.info.disclosure.title',
					isOpen: false,
					preInfo: {
						data: "privacyPolicy.content.info.disclosure.preInfo"	
					},
					data: ['privacyPolicy.content.info.disclosure.data.1', 'privacyPolicy.content.info.disclosure.data.2', 'privacyPolicy.content.info.disclosure.data.3', 'privacyPolicy.content.info.disclosure.data.4', 'privacyPolicy.content.info.disclosure.data.5', 'privacyPolicy.content.info.disclosure.data.6', 'privacyPolicy.content.info.disclosure.data.7']
				},
				{
					title: 'privacyPolicy.content.info.cookies.title',
					isOpen: false,
					preInfo: null,
					data: ['privacyPolicy.content.info.cookies.data.1', 'privacyPolicy.content.info.cookies.data.2', 'privacyPolicy.content.info.cookies.data.3', 'privacyPolicy.content.info.cookies.data.4']
				},
				{
					title: 'privacyPolicy.content.info.userChoice.title',
					isOpen: false,
					preInfo: null,
					data: ['privacyPolicy.content.info.userChoice.data.1', 'privacyPolicy.content.info.userChoice.data.2', 'privacyPolicy.content.info.userChoice.data.3', 'privacyPolicy.content.info.userChoice.data.4', 'privacyPolicy.content.info.userChoice.data.5']
				},
				{
					title: 'privacyPolicy.content.info.informationStorage.title',
					isOpen: false,
					preInfo: null,
					data: ['privacyPolicy.content.info.informationStorage.data.1']
				},
				{
					title: 'privacyPolicy.content.info.update.title',
					isOpen: false,
					preInfo: null,
					data: ['privacyPolicy.content.info.update.data.1']
				},
			]
		}
		this.navigateBack = this.navigateBack.bind(this);
		this.openInfo = this.openInfo.bind(this);
	}

	navigateBack() {
		actNav.goBack();
	}

	openInfo(index) {
		let state = this.state;
		state.contents[index].isOpen = !state.contents[index].isOpen;
		this.setState(state);
	}

  	render() {
  	  	return (
			<Container 				
				bgColorBottom={'veryLightGrey'} 				
				bgColorTop={'red'} 			
			>
				<NavigationBar
					title={'privacyPolicy.navigationTitle'}
					onPress={this.navigateBack}
				/>
				<ScrollView 
					style={styles.container}
					contentContainerStyle={styles.content}
				>
					<View style={styles.intro.place}>
						<StaticText 
							property={'privacyPolicy.content.introduction'}
							style={styles.text.content} 
						/>
					</View>
					{ this.state.contents.map((content, index) => {
						return (
							<Content
								key={index}
								content={content}
								index={index}
								openInfo={this.openInfo}
							/>
						)
					}) }
  	  	  		</ScrollView>
			</Container>
  	  	);
  	}
}

export default TermsConditions;
