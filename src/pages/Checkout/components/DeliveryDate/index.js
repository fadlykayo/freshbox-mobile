import React,{ PureComponent } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import DateItem from './components/DateItem';
import styles from './styles';

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
		let next4days = new Date(today).setDate(today.getDate()+4);

		let date = this.state.date.slice();
		date=[tomorrow,next2days,next3days,next4days];

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
			let today = new Date();
			let hours = today.getHours();
			let minutes = today.getMinutes();
			let renderDate = (hours <= 21 || (hours <= 21 && minutes < 55)) ? this.state.date.slice(0,3) : this.state.date.slice(1,4);
			return(
				<TouchableWithoutFeedback onPress={this.closeDeliveryDate}>
					<View style={styles.overlay}>
						<View style={styles.container}>
							{ 
								renderDate.map((data,index) => (
									<DateItem 
										key={index}
										data={data}
										index={index+1}
										renderDate={renderDate}
										getDeliveryDate={this.getDeliveryDate}
									/>
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