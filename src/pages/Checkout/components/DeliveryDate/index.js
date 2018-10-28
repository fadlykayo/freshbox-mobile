import React,{ PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import styles from './styles';
import moment from 'moment';
import id from 'moment/locale/id';
import StaticText from '@components/StaticText';
import images from '@assets';

moment.locale('id',id);

class DeliveryDate extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			date: [],
		}
		this.closeDeliveryDate = this.closeDeliveryDate.bind(this);
		this.getDeliveryDate = this.getDeliveryDate.bind(this);
	}

	componentDidMount(){
		this.setTimeHandler();
	}

	setTimeHandler(){
		let today = new Date();
		let tomorrow = new Date(today).setDate(today.getDate()+1);
		let next2days = new Date(today).setDate(today.getDate()+2);
		let next3days = new Date(today).setDate(today.getDate()+3);

		let date = this.state.date.slice();
		date=[today,tomorrow,next2days,next3days];

		this.setState({date});
	}

	getDeliveryDate(type,value){
		this.props.getDeliveryDate(type,value)
	}

	closeDeliveryDate() {
		this.props.closeDeliveryDate();
	}

	render(){
		if(this.props.modalVisible){
			let renderDate = new Date().getHours() <= 22 ? this.state.date.slice(0,3) : this.state.date.slice(1,4);
			return(
				<TouchableWithoutFeedback onPress={this.closeDeliveryDate}>
					<View style={styles.overlay}>
						<View style={styles.container}>
							{ 
								renderDate.map((data,index) => (
									<TouchableOpacity 
										key={index} 
										style={styles.datePlace(index+1,renderDate.length)} 
										onPress={() => this.getDeliveryDate(data)}
									>
										<Text>{moment(data).format('dddd, Do MMMM YYYY')}</Text>
									</TouchableOpacity>
								))
							}
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