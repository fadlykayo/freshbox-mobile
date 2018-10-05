import React,{ PureComponent } from 'react';
import { View, Image, TouchableWithoutFeedback, Text } from 'react-native';
import styles from './styles';
import StaticText from '@components/StaticText';
import images from '@assets';

class ResetPasswordSuccess extends PureComponent {
	constructor(props){
		super(props);
	}

	render(){
		if(this.props.modalVisible){
			return(
				<TouchableWithoutFeedback onPress={this.props.closeDialogResetPasswordSuccess}>
					<View style={styles.overlay}>
						<View style={styles.container}>
							<View style={styles.subcontainer.left}>
								<Image
									resizeMode={'contain'} 
									source={images.icon_forgot_password_success}
									style={styles.logo}
								/>
							</View>
							<View style={styles.subcontainer.right}>
								<StaticText
									style={styles.title}
									property={'forgotPassword.content.resetPasswordSuccess'}
								/>
								<Text style={styles.content}>{this.props.messageResetPassword}</Text>
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

export default ResetPasswordSuccess;