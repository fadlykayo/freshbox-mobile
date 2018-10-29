import React,{ PureComponent } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import moment from 'moment';
import id from 'moment/locale/id';

moment.locale('id',id);

class DateItem extends PureComponent {
	constructor(){
		super();
		this.getDeliveryDate = this.getDeliveryDate.bind(this);
	}

	getDeliveryDate(){
		this.props.getDeliveryDate(this.props.data);
	}

	render(){
		return(
			<TouchableOpacity 
				style={styles.container(this.props.index,this.props.renderDate.length)} 
				onPress={this.getDeliveryDate}
			>
				<Text style={styles.text}>{moment(this.props.data).format('dddd, Do MMMM YYYY')}</Text>
			</TouchableOpacity>
		)
	}
}

export default DateItem;