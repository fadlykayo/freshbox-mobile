import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StaticText from '@components/StaticText';
import numeral from 'numeral';
import images from '@assets';
import styles from './styles';
import { colour } from '@styles';

class CheckoutComponent extends PureComponent {
	constructor() {
		super();
		this.validateCart = this.validateCart.bind(this);
	}

	validateCart() {
		this.props.validateCart();
	}

	render(){
		const totalPrice = numeral(this.props.totalPrice).format('0,0');
		if(this.props.totalCount == 0) return null;
		else {
			return(
				<TouchableOpacity onPress={this.validateCart} >
					<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colour.darkRedTransition, colour.redTransition]} style={styles.checkoutButton}>
					<Text style={styles.checkoutText}>
						{this.props.totalCount}
						<StaticText 
							style={styles.checkoutText}
							property={'productList.content.item'}
						/>
						{totalPrice}
					</Text>
					<Image
						resizeMode={'contain'} 
						source={images.icon_cart}
						style={styles.icon}
					/>
					</LinearGradient>
				</TouchableOpacity>
			)
		}
	}
}


export default CheckoutComponent;