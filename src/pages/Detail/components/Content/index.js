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
		if(this.props.action == 'history') {
			let productPrice = numeral(this.props.data.sub_total).format('0,0');
			return (
				<View style={styles.container}>
					<Text style={styles.text.title}>{this.props.data.product_name}</Text>
					<Text style={styles.text.desc}>{this.props.data.category}</Text>
					<Text style={styles.text.price}>
						<StaticText 
							style={styles.text.price}
							property={'cart.content.price'}
						/>
						{productPrice}
						<StaticText 
							style={styles.desc}
							property={'cart.content.pack'}
						/>
					</Text>
				</View>
			)
		}
		else {
			let productPrice = numeral(this.props.data.price).format('0,0');
			return (
				<View style={styles.container}>
					<Text style={styles.text.title}>{this.props.data.name}</Text>
					<Text style={styles.text.desc}>{this.props.data.category.name}</Text>
					<Text style={styles.text.price}>
						<StaticText 
							style={styles.text.price}
							property={'cart.content.price'}
						/>
						{productPrice}
						<Text style={styles.text.desc}>/{this.props.data.unit}</Text>
					</Text>
				</View>
			)
		}
	}
}

export default Content;