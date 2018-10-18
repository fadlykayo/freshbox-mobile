import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import Button from '@components/Button';
import numeral from 'numeral';
import styles from './styles';

class CheckoutComponent extends PureComponent {
	constructor(props) {
		super(props)
	}

	render() {
		const subtotal = numeral(this.props.totalPrice).format('0,0');
		return (
			<View style={styles.container}>
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
						{subtotal}
					</Text>
				</View>
				<Button
					type={this.props.type}
					onPress={this.props.onPress}
					title={'cart.button.checkout'}
				/>
			</View>
		)
	}
}


export default CheckoutComponent;