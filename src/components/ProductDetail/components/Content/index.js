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
		
		let productPrice = numeral(this.props.data.price).format('0,0');
		if(this.props.data.on_promo == 1) {
			productPrice = numeral(this.props.data.promo_price).format('0,0');
		}
		if(this.props.data.banner_harga_jual > 0) {
			productPrice = numeral(this.props.data.banner_harga_jual).format('0,0');
		}
		return (
			<View style={styles.container}>
				<Text style={styles.text.title}>{this.props.data.name}</Text>
				{/* <Text style={styles.text.category}>{this.props.data.product_category_name}</Text> */}
				<Text style={styles.text.category}>{this.props.data.short_description}</Text>
				<Text style={styles.text.price}>
					<StaticText 
						style={styles.text.price}
						property={'cart.content.price'}
					/>
					{this.props.bannerPrice ? numeral(this.props.bannerPrice).format('0,0'): productPrice}
					<StaticText 
						style={styles.text.pack}
						property={'cart.content.pack'}
					/>
				</Text>
			</View>
		);
	}
}

export default Content;