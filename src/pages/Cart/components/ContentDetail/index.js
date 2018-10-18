import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import numeral from 'numeral';
import StaticText from '@components/StaticText';
import styles from './styles';

class ContentDetail extends PureComponent {
	constructor(){
		super()
	}

	render() {
		const productPrice = numeral(this.props.data.price).format('0,0');
		return (
			<View style={styles.contentContainer}>
				<Text style={styles.fontTitle}>{this.props.data.name}</Text>
				<Text style={styles.fontCategory}>{this.props.data.category.name}</Text>
				<Text style={styles.fontPrice}>
					<StaticText 
						style={styles.fontPrice}
						property={'cart.content.price'}
					/>
					{productPrice}
					<StaticText 
						style={styles.fontPack}
						property={'cart.content.pack'}
					/>
				</Text>
			</View>
		);
	}
}

export default ContentDetail;