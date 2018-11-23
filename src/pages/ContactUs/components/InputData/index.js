import React, { Component } from 'react';
import { View } from 'react-native';
import StaticText from '@components/StaticText';
import { language, validation } from '@helpers';
import styles from './styles';

class InputData extends Component {
	constructor() {
		super()
	}

	render() {
		return (
			<View style={styles.message.place}>
				<StaticText
					property={'contactUs.info.reviewProduct'}
					style={styles.message.text}
					params={{
						invoice: this.props.data.invoice
					}}
				/>
			</View>
		);
	}
}

export default InputData;
