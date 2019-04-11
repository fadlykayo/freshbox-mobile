import React,{ PureComponent } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class ButtonCount extends PureComponent {
	constructor(){
		super();
		this.addTotalItem = this.addTotalItem.bind(this);
		this.decTotalItem = this.decTotalItem.bind(this);
		this.renderButton = this._renderButton.bind(this);
	}

	addTotalItem(){
		this.props.addTotalItem();
	}

	decTotalItem(){
		this.props.decTotalItem();
	}

	_renderButton() {
		if (this.props.data.stock > 0) {
			if(this.props.count == 0){
				return(
					<TouchableOpacity onPress={this.addTotalItem} style={[styles.container.base,styles.container.add]}>
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
		} else {
			return(
				<View style={[styles.container.base,styles.container.add]}>
					<StaticText
						style={styles.text.add}
						property={'productList.content.unavailable'}
					/>
				</View>
			)
		}
	}

	render(){
		return (
			<>
				{this._renderButton()}
			</>
		)
	}
}

export default ButtonCount;