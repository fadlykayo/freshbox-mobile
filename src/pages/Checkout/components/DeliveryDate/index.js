import React,{ PureComponent } from 'react';
import { View, TouchableOpacity, Modal, Image } from 'react-native';
import DateItem from './components/DateItem';
import styles from './styles';
import images from '@assets';

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
				<View style={styles.background}>
					<Modal
						animationType={'slide'}
						transparent={true}
						visible={this.props.modalVisible}
						onRequestClose={this.closeDeliveryDate}
					>
						<TouchableOpacity style={styles.touchable} onPress={this.closeDeliveryDate}></TouchableOpacity>
						<View style={styles.container}>
							<View style={styles.subcontainer.title}>
								<TouchableOpacity
									onPress={this.closeDeliveryDate}
									style={styles.subcontainer.button}
								>
									<Image
										resizeMode={'contain'}
										source={images.icon_scroll_down}
										style={styles.icon}
									/>
								</TouchableOpacity>
							</View>
							{ renderDate.map((data,index) => (
								<DateItem 
									key={index}
									data={data}
									index={index+1}
									renderDate={renderDate}
									getDeliveryDate={this.getDeliveryDate}
								/>
							))}
						</View>
					</Modal>
				</View>
			)
		} else {
			return null;
		}
	}
}

export default DeliveryDate;