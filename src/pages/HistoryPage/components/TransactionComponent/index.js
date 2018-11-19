import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import Button from '../Button';
import Content from '../Content';
import styles from './styles';

class TransactionComponent extends Component {
  	constructor() {
		super()
		this.navigateToDetail = this.navigateToDetail.bind(this);
	}
	 
	navigateToDetail(invoice) {
		this.props.navigateToDetail(invoice)
	}

  	render() {
  	  	return (
            <TouchableOpacity
                onPress={() => this.navigateToDetail(this.props.data)}
                style={styles.eachContainer}
            >
				<Content
					data={this.props.data}
				/>
				<Button
					data ={this.props.data}
					navigateToCart={this.props.navigateToCart}
					navigateToDetail={this.props.navigateToDetail}
				/>
			</TouchableOpacity>
  	  	);
  	}
}

export default TransactionComponent;
