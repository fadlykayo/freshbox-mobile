import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import StaticText from '@components/StaticText';
import numeral from 'numeral';
import images from '@assets';
import styles from './styles';

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
		if(this.props.totalCount == 0){
			return null;
		}
		else {
			return(
				<TouchableOpacity
					onPress={this.validateCart}
					style={styles.checkoutButton}
				>
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
				</TouchableOpacity>
			)
		}
	}
}


export default CheckoutComponent;