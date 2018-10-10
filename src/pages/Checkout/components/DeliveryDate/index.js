import React,{ PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import styles from './styles';
import moment from 'moment';
import StaticText from '@components/StaticText';
import images from '@assets';

var idLocale = require('moment/locale/id');
moment.locale('id', idLocale)

var today = new Date();
var tomorrow = new Date(today);
tomorrow.setDate(today.getDate()+1);
var next2days = new Date(today);
next2days.setDate(today.getDate()+2);


class DeliveryDate extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			date: [
				{
					display: moment(today).format('dddd, Do MMMM YYYY'),
					post: moment(today).format('YYYY-MM-DD HH:mm:ss'),
				},
				{
					display: moment(tomorrow).format('dddd, Do MMMM YYYY'),
					post: moment(tomorrow).format('YYYY-MM-DD HH:mm:ss'),
				},
				{
					display: moment(next2days).format('dddd, Do MMMM YYYY'),
					post: moment(next2days).format('YYYY-MM-DD HH:mm:ss'),
				}
			]
		}
		this.closeDeliveryDate = this.closeDeliveryDate.bind(this);
		this.getDeliveryDate = this.getDeliveryDate.bind(this);
	}

	getDeliveryDate(type, value) {
		this.props.getDeliveryDate(type, value)
	}

	closeDeliveryDate() {
		this.props.closeDeliveryDate();
	}

	render(){
		if(this.props.modalVisible){
			return(
				<TouchableWithoutFeedback onPress={this.closeDeliveryDate}>
					<View style={styles.overlay}>
						<View style={styles.container}>
							{ this.state.date.map((data, index) => {
								return (
									<TouchableOpacity key={index} style={styles.datePlace} onPress={() => this.getDeliveryDate('setDate', data)}>
										<Text>{ data.display }</Text>
									</TouchableOpacity>
								)
							}) }
						</View>
					</View>
				</TouchableWithoutFeedback>
			)
		} else {
			return null;
		}
	}
}

export default DeliveryDate;