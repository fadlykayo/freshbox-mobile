import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class TransactionComponent extends Component {
  	constructor() {
		super()
		this.navigateToDetail = this.navigateToDetail.bind(this);
		this.navigateToReviewProduct = this.navigateToReviewProduct.bind(this);
	}
	 
	navigateToDetail(index) {
		this.props.navigateToDetail(index)
	}

	getStatusText(payload) {
		switch(payload) {
			case 'pending_payment': return 'historyPage.static.pending_payment'
			case 'paid': return 'historyPage.static.paid'
			case 'on_process': return 'historyPage.static.on_process'
			case 'on_shipping': return 'historyPage.static.on_shipping'
			case 'expired': return 'historyPage.static.expired'
		}
	}

	navigateToReviewProduct(payload) {
		this.props.navigateToReviewProduct(payload);
	}

  	render() {
		if (this.props.data.status == 'finish' || this.props.data.status == 'failed') {
			return (
				<View>
					<View style={styles.reOrder.button(this.props.data.status)}>
						<StaticText
							style={styles.reOrder.text}
							property={this.props.data.status == 'finish' ? 'historyPage.static.success' : 'historyPage.static.failed'}
						/>
					</View>
					<TouchableOpacity style={styles.review.place} onPress={() => this.navigateToReviewProduct(this.props.data)}>
						<StaticText
							style={styles.review.text}
							property={'historyPage.static.review'}
						/>
					</TouchableOpacity>
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
