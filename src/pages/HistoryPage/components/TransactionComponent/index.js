import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import numeral from 'numeral';
import styles from './styles';

class TransactionComponent extends Component {
  	constructor() {
  		super()
  	}
  	render() {
  	  	return (
            <TouchableOpacity
                onPress={() => this.props.navigateToHistoryDetail(this.props.index)}
                style={styles.eachContainer}
            >
				<View>
  	  				<Text style={styles.transactionName}>{this.props.item.name}</Text>
					<Text style={styles.transactionDate}>{this.props.item.date}</Text>
					<Text style={styles.transactionPrice}>
					<StaticText property={'historyPage.content.price'}
					/>{numeral(this.props.item.price).format('0,0')}</Text>
				</View>
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
