import React, {Component} from 'react';
import {View, Text} from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class InputText extends Component {
	constructor () {
		super();
	}

	render() {
		return (
			<View style={styles.container}>
				<StaticText
					style={styles.text.title}
					property={this.props.label}
				/>
				<Text style={styles.text.content}>{this.props.input}</Text>
				<View style={styles.underline} />
			</View>
		);
	}
}

export default InputText;
