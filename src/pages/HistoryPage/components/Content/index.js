import React, { Component } from 'react';
import { View, Text } from 'react-native';
import StaticText from '@components/StaticText';
import numeral from 'numeral';
import styles from './styles';

class Content extends Component {
  	constructor() {
		super()
	}

  	render() {
		const productPrice = numeral(this.props.item.price).format('0,0')
  	  	return (
			<View>
  	  			<Text style={styles.transactionName}>{this.props.item.name}</Text>
				<Text style={styles.transactionDate}>{this.props.item.date}</Text>
				<Text style={styles.transactionPrice}>
				<StaticText property={'historyPage.content.price'}
				/>{productPrice}</Text>
			</View>
  	  	);
  	}
}

export default Content;
