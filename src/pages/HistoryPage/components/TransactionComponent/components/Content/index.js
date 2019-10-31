import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import StaticText from '@components/StaticText';
import numeral from 'numeral';
import moment from 'moment';
import styles from './styles';

class Content extends PureComponent {
  	constructor() {
		super()
	}

  	render() {
		const discountAmount = this.props.data.discount_ammount;
		let productPrice;
		if(discountAmount && discountAmount > 0) {
			productPrice = numeral(this.props.data.grand_total - discountAmount).format('0,0')
		} else {
			productPrice = numeral(this.props.data.grand_total).format('0,0')
		}
		// const productPrice = numeral(this.props.data.grand_total).format('0,0')
		const dateDisplay = moment(this.props.data.request_shipping_date).format('dddd, Do MMMM YYYY')
  	  	return (
			<View>
  	  			<Text style={styles.transaction.name}>{this.props.data.invoice}</Text>
				<StaticText
					style={styles.transaction.static}
					property={'historyPage.static.requestShippingDate'}
				/>
				<Text style={styles.transaction.date}>{dateDisplay}</Text>
				<Text style={styles.transaction.price}>
				<StaticText property={'historyPage.content.price'}
				/>{productPrice}</Text>
			</View>
  	  	);
  	}
}

export default Content;
