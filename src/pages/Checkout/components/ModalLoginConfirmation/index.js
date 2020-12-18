import React, {PureComponent} from 'react';
import {View, TouchableOpacity} from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class ModalLoginConfirmation extends PureComponent {
	constructor () {
		super();
		this.onPress = this.onPress.bind(this);
	}

	onPress() {
		this.props.onPress();
	}

	render() {
		if (this.props.modalVisible == true) {
			return (
				<TouchableOpacity onPress={this.props.onCloseModal} style={styles.background}>
					<View style={styles.container}>
						<StaticText
							style={styles.text.title}
							property={'modal.title.loginConfirmation'}
						/>
						<StaticText
							style={styles.text.content}
							property={this.props.message}
						/>
						<TouchableOpacity
							onPress={this.onPress}
							style={styles.button}
						>
							<StaticText
								style={styles.text.button}
								property={this.props.button}
							/>
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
			);
		}
		else {
			return null;
		}
	}
}


export default ModalLoginConfirmation;