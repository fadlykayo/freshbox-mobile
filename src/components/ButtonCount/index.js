import React,{ PureComponent } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class ButtonCount extends PureComponent {
	constructor(){
		super();
		this.addTotalItem = this.addTotalItem.bind(this);
		this.decTotalItem = this.decTotalItem.bind(this);
	}

	addTotalItem(){
		this.props.addTotalItem();
	}

	decTotalItem(){
		this.props.decTotalItem();
	}

	render(){
		if(this.props.count == 0){
			return(
				<TouchableOpacity 
					style={[styles.container.base,styles.container.add]}
					onPress={this.addTotalItem}
				>
					<StaticText
						style={styles.text.add}
						property={'productList.content.addItem'}
					/>
				</TouchableOpacity>
			)
		}
		else {
			return(
				<View style={[styles.container.base,styles.container.counter]}>
					<TouchableOpacity 
						style={styles.subcontainer.button}
						onPress={this.decTotalItem}
					>
						<Text style={styles.text.button}>-</Text>
					</TouchableOpacity>
					<Text style={styles.text.counter}>{this.props.count}</Text>
					<TouchableOpacity 
						style={styles.subcontainer.button}
						onPress={this.addTotalItem}
					>
						<Text style={styles.text.button}>+</Text>
					</TouchableOpacity>
				</View>
			)
		}
	}
}

export default ButtonCount;