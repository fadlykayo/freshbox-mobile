import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import numeral from 'numeral';
import styles from './styles';

class CheckoutComponent extends PureComponent {
	constructor(props) {
		super(props)
	}

	render() {
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
				<TouchableOpacity
					onPress={() => this.props.onPress()}
					style={styles.checkoutButton}
				>
					<StaticText 
						style={[styles.textData, styles.checkoutText]}
						property={'cart.button.checkout'}
					/>
				</TouchableOpacity>
			</View>
		)
	}
}


export default CheckoutComponent;