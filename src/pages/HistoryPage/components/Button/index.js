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
		}
	}

  	render() {
		if (this.props.data.status == 'finish' || this.props.data.status == 'failed') {
			return (
				<View style={styles.reOrder.button(this.props.data.status)}>
					<StaticText
						style={styles.reOrder.text}
						property={this.props.data.status == 'finish' ? 'historyPage.static.success' : 'historyPage.static.failed'}
					/>
				</View>
			);
		}
		else {
			const statusOrder = this.getStatusText(this.props.data.status)
			return (
				<View style={styles.process.button}>
					<StaticText
						style={styles.process.text}
						property={statusOrder}
					/>
				</View>
			)
		}
  	}
}

export default TransactionComponent;
