import React, { PureComponent } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import StaticText from '@components/StaticText';
import numeral from 'numeral';
import styles from './styles';

class CheckoutComponent extends PureComponent {
	constructor() {
		super()
	}

	render() {
		console.log(this.props.totalPrice)
		return (
			<View style={styles.checkoutContainer}>
				<View style={styles.totalPrice}>
					<StaticText 
						style={styles.textData}
						property={'cart.content.subTotal'}
					/>
					<Text style={styles.textData}>
						<StaticText 
							style={styles.textData}
							property={'cart.content.price'}
						/> 
						{numeral(this.props.totalPrice).format('0,0')}
					</Text>
				</View>
				<TouchableHighlight
					onPress={() => alert('success')}
					style={styles.checkoutButton}
				>
				<StaticText 
					style={[styles.textData, styles.checkoutText]}
					property={'cart.button.checkout'}/>
				</TouchableHighlight>
			</View>
		)
	}
}


export default CheckoutComponent;