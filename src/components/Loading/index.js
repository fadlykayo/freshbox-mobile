import React,{ PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import StaticText from '../StaticText';
import styles from './styles';
import images from '@assets';

class Loading extends PureComponent {
	constructor(){
		super()
	}

	render(){
		if(this.props.modalVisible == false) return null;
		else return(
			<View style={styles.container}>
				<View style={styles.loadingContainer}>
					<Image
						resizeMode={'contain'}
						style={styles.loadingImage}
						source={images.loading_apple}
					/>
					<StaticText 
						style={styles.loadingText}
						property={"loading"}
					/>
				</View>
			</View>
		)
	}
}

export default Loading;