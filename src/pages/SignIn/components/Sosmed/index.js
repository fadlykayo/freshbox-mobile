import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';
import styles from './styles';
import images from '@assets';

export default class Facebook extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.onPressButton = this.onPressButton.bind(this);
		this.selectImage = this.selectImage.bind(this);
	}

	componentDidMount() {
		if (this.props.type !== 'facebook') {
			this.setupGoogleClient();
		}
	}

	async setupGoogleClient() {
		try {
			await GoogleSignin.hasPlayServices({ autoResolve: true, showPlayServicesUpdateDialog: true });
			await GoogleSignin.configure({
				// webClientId: '73889112804-3lequnciqmah8j8pmu9poeh1onq1gh6h.apps.googleusercontent.com',
				webClientId: '1001907324369-h5jbjeel8j06mgl4fqu0shod5uqpdjo5.apps.googleusercontent.com',
				androidClientId: '1001907324369-7qaek55la7n09rkee68aofcqit2idlk6.apps.googleusercontent.com',
				iosClientId: '1001907324369-l350sb913u97kfarp0ilna02p2gd8h2r.apps.googleusercontent.com',
				offlineAccess: true,
			});
		}
		catch (err) {
			console.log('[Sign In Setup] Error #2: ', err);
		}
	}

	onPressButton() {
		this.props.onPress();
	}

	selectImage() {
		switch (this.props.type) {
			case 'facebook': return images.icon_facebook;
			case 'apple': return images.icon_apple;
			default: return images.icon_google;
		}
	}

	render() {
		return (
			<View style={ styles.container }>
				<TouchableWithoutFeedback onPress={ this.onPressButton }>
					<Image
						resizeMode={ 'contain' }
						source={ this.selectImage() }
						style={ styles.image(this.props.type) }
					/>
				</TouchableWithoutFeedback>
			</View>

		);
	}
}
