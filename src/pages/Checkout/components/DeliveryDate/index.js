import React,{ PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import styles from './styles';
import moment from 'moment';
import StaticText from '@components/StaticText';
import images from '@assets';

var idLocale = require('moment/locale/id');
moment.locale('id', idLocale)

class DeliveryDate extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			date: [
				moment().format('dddd, Do MMMM YYYY'),
				moment().add(1, 'd').format('dddd, Do MMMM YYYY'),
				moment().add(2, 'd').format('dddd, Do MMMM YYYY')
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
										<Text>{ data }</Text>
									</TouchableOpacity>
								)
							}) }
							{/* <TouchableOpacity style={styles.datePlace} onPress={() => this.getDeliveryDate('setDate', moment().format('dddd, MMMM Do YYYY'))}>
								<Text>{moment().format('dddd, MMMM Do YYYY')}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.datePlace} onPress={() => this.getDeliveryDate('setDate', moment().add(1, 'd').format('dddd, MMMM Do YYYY'))}>
								<Text>{moment().add(1, 'd').format('dddd, MMMM Do YYYY')}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.datePlace} onPress={() => this.getDeliveryDate('setDate', moment().add(2, 'd').format('dddd, MMMM Do YYYY'))}>
								<Text>{moment().add(2, 'd').format('dddd, MMMM Do YYYY')}</Text>
							</TouchableOpacity> */}
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