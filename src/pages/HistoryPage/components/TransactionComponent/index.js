import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Button from './components/Button';
import Content from './components/Content';
import styles from './styles';

class TransactionComponent extends Component {
  	constructor() {
		super()
		this.navigateToDetail = this.navigateToDetail.bind(this);
	}
	 
	navigateToDetail() {
		this.props.navigateToDetail(this.props.data);
	}

  	render() {
  	  	return (
            <TouchableOpacity
                onPress={this.navigateToDetail}
                style={styles.container}
            >
				<Content
					data={this.props.data}
				/>
				<Button
					data ={this.props.data}
					navigateToDetail={this.props.navigateToDetail}
					navigateToReviewProduct={this.props.navigateToReviewProduct}
				/>
			</TouchableOpacity>
  	  	);
  	}
}

export default TransactionComponent;
