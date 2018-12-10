import React, { Component } from 'react';
import { ScrollView, View, Clipboard, Platform, ToastAndroid } from 'react-native';
import { actNav } from '@navigations';
import { language } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import StaticText from '@components/StaticText';
import Content from './components/Content';
import styles from './styles';
import { connect } from 'react-redux';

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
					title: 'termsConditions.content.info.refund.title',
					isOpen: false,
					preInfo: ['termsConditions.content.info.refund.preInfo.1','termsConditions.content.info.refund.preInfo.2','termsConditions.content.info.refund.preInfo.3'],
					data: ['termsConditions.content.info.refund.data.1', 'termsConditions.content.info.refund.data.2','termsConditions.content.info.refund.data.3', 'termsConditions.content.info.refund.data.4']
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
			],
			outputText: '',
		}
		this.navigateBack = this.navigateBack.bind(this);
		this.openInfo = this.openInfo.bind(this);
		this.getClipboardData = this.getClipboardData.bind(this);
	}

	navigateBack() {
		actNav.goBack();
	}

	openInfo(index) {
		let state = this.state;
		state.contents[index].isOpen = !state.contents[index].isOpen;
		this.setState(state);
	}

	async getClipboardData(input) {
        await Clipboard.setString(String(input));
        if(Platform.OS == 'android') {
            language.transformText('formSuccess.title.copyData')
            .then(message => {
                ToastAndroid.show(message, ToastAndroid.SHORT)
            })
        } else {
            language.transformText('formSuccess.title.copyData')
			.then(message => {
				this.props.set_success_status({
					status: true,
					data: message,
					title: 'formSuccess.title.default'
				});
			});
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
					onPress={this.navigateBack}
				/>
				<ScrollView 
					style={styles.container}
					contentContainerStyle={styles.content}
				>
					<View style={styles.intro.place}>
						<StaticText 
							property={'termsConditions.content.introduction'}
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
								getClipboardData={this.getClipboardData}
							/>
						)
					}) }
  	  	  		</ScrollView>
			</Container>
  	  	);
  	}
}

const mapDispatchToProps = (dispatch) => ({
	set_success_status: (payload) => dispatch(actions.network.reducer.set_success_status(payload)),
})
	

export default connect(null,mapDispatchToProps)(TermsConditions);
