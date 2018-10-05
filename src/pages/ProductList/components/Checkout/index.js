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
	}

	navigateToCart(){
		actNav.navigate(navConstant.Cart);
	}

	render() {
		return (
			<TouchableOpacity
				onPress={() => this.navigateToCart()}
				style={styles.checkoutButton}
			>
				<Text style={[styles.textData, styles.checkoutText]}>
					{this.props.totalCount}
					<StaticText 
						style={[styles.textData, styles.checkoutText]}
						property={'productList.content.item'}/>	
					{numeral(this.props.totalPrice).format('0,0')}
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