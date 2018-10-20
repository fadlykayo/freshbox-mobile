import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import Content from '../Content';
import styles from './styles';

class TransactionComponent extends Component {
  	constructor() {
		super()
		this.navigateToCart = this.navigateToCart.bind(this);
		this.navigateToDetail = this.navigateToDetail.bind(this);
	}
	 
	navigateToDetail(index) {
		this.props.navigateToDetail(index)
	}

	navigateToCart(payload) {
		this.props.navigateToCart(payload)
	}

	getStatusText(payload) {
		switch(payload) {
			case 'pending_payment': return 'historyPage.static.pending_payment'
			case 'paid': return 'historyPage.static.paid'
			case 'on_process': return 'historyPage.static.on_process'
			case 'on_shipping': return 'historyPage.static.on_shipping'
			case 'failed': return 'historyPage.static.failed'
		}
	}

  	render() {
		if (this.props.data.status == 'finish') {
			return (
				<TouchableOpacity 
					onPress={() => this.props.navigateToCart()}
					style={styles.reOrderItem}
				>
					<StaticText
						style={styles.reOrderText}
						property={'historyPage.content.reOrder'}
					/>
				</TouchableOpacity>
			);
		}
		else {
			const statusOrder = this.getStatusText(this.props.data.status)
			return (
				<View style={styles.onProcessItem}>
					<StaticText
						style={styles.onProcessText}
						property={statusOrder}
					/>
				</View>
			)
		}
  	}
}

export default TransactionComponent;
