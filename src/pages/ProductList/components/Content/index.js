import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import numeral from 'numeral';
import StaticText from '@components/StaticText';
import styles from './styles';

class Content extends PureComponent {
	constructor(){
		super()
	}

	render() {
		return (
			<View style={styles.contentContainer}>
				<Text style={styles.fontTitle}>{this.props.data.title}</Text>
				<Text style={styles.fontCategory}>{this.props.data.category}</Text>
				<Text style={styles.fontTitle}>
					<StaticText 
						style={styles.fontTitle}
						property={'cart.content.price'}
					/>
					{numeral(this.props.data.price).format('0,0')}
					<StaticText 
						style={styles.fontPack}
						property={'cart.content.pack'}
					/>
				</Text>
			</View>
		);
	}
}

export default Content;