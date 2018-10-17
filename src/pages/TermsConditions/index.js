import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import StaticText from '@components/StaticText';
import numeral from 'numeral';
import styles from './styles';

class TermsConditions extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
		}
	}

  	render() {
  	  	return (
			<Container 				
				bgColorBottom={'veryLightGrey'} 				
				bgColorTop={'red'} 			
			>
				<NavigationBar
					title={'termsConditions.navigationTitle'}
					onPress={actNav.goBack}
				/>
  	  	  		<ScrollView style={styles.container}
					contentContainerStyle={styles.content}
				>
					<StaticText 
						property={'termsConditions.content.title1'}
						style={styles.titleText} 
					/>
					<StaticText 
						property={'termsConditions.content.content1'}
						style={styles.contentText} 
					/>
					<StaticText 
						property={'termsConditions.content.title2'}
						style={styles.titleText} 
					/>
					<StaticText 
						property={'termsConditions.content.content2'}
						style={styles.contentText} 
					/>
  	  	  		</ScrollView>
			</Container>
  	  	);
  	}
}

export default TermsConditions;
