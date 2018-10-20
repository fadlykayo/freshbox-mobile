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
		const productPrice = numeral(this.props.data.grand_total).format('0,0')
		const dateDisplay = moment(this.props.data.request_shipping_date).format('dddd, Do MMMM YYYY')
  	  	return (
			<View>
  	  			<Text style={styles.transactionName}>{this.props.data.invoice}</Text>
				<Text style={styles.transactionDate}>{dateDisplay}</Text>
				<Text style={styles.transactionPrice}>
				<StaticText property={'historyPage.content.price'}
				/>{productPrice}</Text>
			</View>
  	  	);
  	}
}

export default Content;
