import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import StaticText from '@components/StaticText';
import { actNav, navConstant } from '@navigations';
import numeral from 'numeral';
import images from '@assets';
import styles from './styles';

class CheckoutComponent extends PureComponent {
	constructor(props) {
		super(props);
		this.navigateToCart = this.navigateToCart.bind(this);
	}

	navigateToCart(){
		actNav.navigate(navConstant.Cart);
	}

	render(){
		const totalPrice = numeral(this.props.totalPrice).format('0,0');
		return(
			<TouchableOpacity
				onPress={this.navigateToCart}
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


export default CheckoutComponent;