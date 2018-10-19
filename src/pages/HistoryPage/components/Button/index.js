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

  	render() {
  	  	return (
            <TouchableOpacity
                onPress={() => this.navigateToDetail(this.props.index)}
                style={styles.eachContainer}
            >
				<Content
					item={this.props.item}
				/>
				{ this.props.item.isCompleted ? (
                    <TouchableOpacity 
                        onPress={() => this.props.navigateToCart()}
                        style={styles.reOrderItem}
                    >
                        <StaticText
                            style={styles.reOrderText}
                            property={'historyPage.content.reOrder'}
                        />
					</TouchableOpacity>
				) : (
					<View style={styles.onProcessItem}>
						<Text style={styles.onProcessText}>{this.props.item.status}</Text>
					</View>
				)}
			</TouchableOpacity>
  	  	);
  	}
}

export default TransactionComponent;
