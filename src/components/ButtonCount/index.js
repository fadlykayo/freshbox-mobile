import React,{ PureComponent } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { colour } from '@styles';

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
				<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colour.darkRedTransition, colour.redTransition]} style={[styles.container.base,styles.container.add]}>
					<TouchableOpacity onPress={this.addTotalItem}>
						<StaticText
							style={styles.text.add}
							property={'productList.content.addItem'}
						/>
					</TouchableOpacity>
				</LinearGradient>
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
					{ this.props.data.stock == this.props.count
						? (<View 
								style={styles.subcontainer.button}
								onPress={this.addTotalItem}
							>
								<Text style={styles.text.button}>+</Text>
							</View>)
						: (<TouchableOpacity 
								style={styles.subcontainer.button}
								onPress={this.addTotalItem}
							>
								<Text style={styles.text.button}>+</Text>
							</TouchableOpacity>)
					}
				</View>
			)
		}
	}
}

export default ButtonCount;