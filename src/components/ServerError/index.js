import React,{ Component } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import StaticText from '@components/StaticText';
import images from '@assets';

class ServerError extends Component {
	constructor(){
		super();
	}

	render(){
		if(this.props.modalVisible == true){
			return(
				<TouchableWithoutFeedback onPress={this.props.closeModal}>
					<View style={styles.overlay}>
						<View style={styles.container}>
							<View style={styles.subcontainer.left}>
								<Image
									resizeMode={'contain'} 
									source={images.icon_error}
									style={styles.logo}
								/>
							</View>
							<View style={styles.subcontainer.right}>
								<StaticText
									style={styles.title}
									property={'formError.title.serverError'}
								/>
								<StaticText
									style={styles.content}
									property={'message.serverError'}
								/>
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

export default ServerError;