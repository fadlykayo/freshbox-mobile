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
					style={styles.addNewItem}
					onPress={this.addTotalItem}
				>
					<StaticText
						style={styles.newItemText}
						property={'productList.content.addItem'}
					/>
				</TouchableOpacity>
			)
		}
		else {
			return(
				<View style={styles.countContainer}>
					<TouchableOpacity 
						style={styles.boxOperatorLeft}
						onPress={this.decTotalItem}
					>
						<Text style={styles.operatorText}>-</Text>
					</TouchableOpacity>
					<Text style={styles.itemText}>{this.props.count}</Text>
					<TouchableOpacity 
						style={styles.boxOperatorRight}
						onPress={this.addTotalItem}
					>
						<Text style={styles.operatorText}>+</Text>
					</TouchableOpacity>
				</View>
			)
		}
	}
}

export default ButtonCount;