import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, Text, View, Animated } from 'react-native';
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
		if(this.props.totalCount == 0 && this.props.modalVisible == false) return null;
		else {
			return(
				<Animated.View
    				style={styles.checkout}>
    				{/* style={styles.animated.checkout(this.props.totalCount,this.props.modalVisible,this.props.outroButton,this.props.introButton)}> */}
					<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colour.darkRedTransition, colour.redTransition]} style={styles.container}>
						<TouchableOpacity onPress={this.validateCart} style={styles.subcontainer.button}>
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
					</LinearGradient>
				</Animated.View>
			)
		}
	}
}


export default CheckoutComponent;