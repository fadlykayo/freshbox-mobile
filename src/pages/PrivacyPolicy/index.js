import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { actNav } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import StaticText from '@components/StaticText';
import images from '@assets';
import styles from './styles';

class TermsConditions extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
			contents: [
				{
					title: 'termsConditions.content.info.definition.title',
					isOpen: false,
					data: ['termsConditions.content.info.definition.data.1', 'termsConditions.content.info.definition.data.2', 'termsConditions.content.info.definition.data.3', 'termsConditions.content.info.definition.data.4', 'termsConditions.content.info.definition.data.5']
				},
				{
					title: 'termsConditions.content.info.security.title',
					isOpen: false,
					data: ['termsConditions.content.info.security.data.1', 'termsConditions.content.info.security.data.2', 'termsConditions.content.info.security.data.3', 'termsConditions.content.info.security.data.4', 'termsConditions.content.info.security.data.5', 'termsConditions.content.info.security.data.6', 'termsConditions.content.info.security.data.7']
				},
				{
					title: 'termsConditions.content.info.creditCard.title',
					isOpen: false,
					data: ['termsConditions.content.info.creditCard.data.1', 'termsConditions.content.info.creditCard.data.2', 'termsConditions.content.info.creditCard.data.3', 'termsConditions.content.info.creditCard.data.4']
				},
				{
					title: 'termsConditions.content.info.promo.title',
					isOpen: false,
					data: ['termsConditions.content.info.promo.data.1', 'termsConditions.content.info.promo.data.2']
				},
				{
					title: 'termsConditions.content.info.delivery.title',
					isOpen: false,
					data: ['termsConditions.content.info.delivery.data.1', 'termsConditions.content.info.delivery.data.2', 'termsConditions.content.info.delivery.data.3', 'termsConditions.content.info.delivery.data.4', 'termsConditions.content.info.delivery.data.5']
				},
				{
					title: 'termsConditions.content.info.others.title',
					isOpen: false,
					data: ['termsConditions.content.info.others.data.1', 'termsConditions.content.info.others.data.2']
				},
				{
					title: 'termsConditions.content.info.update.title',
					isOpen: false,
					data: ['termsConditions.content.info.update.data.1']
				},
			]
		}
		this.navigateBack = this.navigateBack.bind(this);
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
							<View key={index} style={styles.info.place}>
								<TouchableOpacity style={styles.info.title} onPress={() => this.openInfo(index)}>
									<StaticText 
										property={content.title}
										style={styles.text.title} 
									/>
									<View style={styles.info.arrow.place}>
                    				    <Image
                    				        source={content.isOpen ? images.icon_arrow_up_red : images.icon_arrow_right_red}
                    				        style={styles.info.arrow.logo}
                    				    />
                    				</View>
								</TouchableOpacity>
								{content.isOpen 
									? (content.data.map((datum, index) => {
										return (
											<View key={index} style={styles.info.content}>
												{ content.title == 'termsConditions.content.info.others.title' || content.title == 'termsConditions.content.info.update.title' 
												? (
													<View style={styles.subinfo.place}>
														<StaticText
															property={datum}
															style={styles.text.content} 
														/>
													</View>
												)
												: (
													<View style={styles.subinfo.place}>
                                						<View style={styles.subinfo.circle}>
                                						    <Text style={styles.subinfo.index}>{index+1}</Text>
                                						</View>
														<View style={styles.subinfo.right}>
															<StaticText 
																property={datum}
																style={styles.text.content} 
															/>
														</View>
													</View>
												)
												}
											</View>
										)
									})
								): null}
							</View>
						)
					}) }
  	  	  		</ScrollView>
			</Container>
  	  	);
  	}
}

export default TermsConditions;
