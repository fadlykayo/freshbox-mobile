import React,{ PureComponent } from 'react';
import { View, Image, TouchableWithoutFeedback, Text } from 'react-native';
import styles from './styles';
import StaticText from '@components/StaticText';
import images from '@assets';

class RegisterSuccess extends PureComponent {
	constructor(){
		super();
	}

	render(){
		if(this.props.modalVisible){
			return(
				<TouchableWithoutFeedback onPress={this.props.closeModal}>
					<View style={styles.overlay}>
						<View style={styles.container}>
							<View style={styles.subcontainer.left}>
								<Image
									resizeMode={'contain'} 
									source={images.icon_success}
									style={styles.logo}
								/>
							</View>
							<View style={styles.subcontainer.right}>
								<StaticText
									style={styles.title}
									property={'formSuccess.title'}
								/>
								<Text style={styles.content}>{this.props.successMessage}</Text>
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
			)
		} else {
			return null;
		}
	}
}

export default RegisterSuccess;