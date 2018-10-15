import React,{ PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
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
						source={images.loading}
					/>
					<Text style={styles.loadingText}>Loading</Text>
				</View>
			</View>
		)
	}
}

export default Loading;