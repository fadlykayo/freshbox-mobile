import React,{ PureComponent } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import StaticText from '@components/StaticText';
import Icon from 'react-native-vector-icons/FontAwesome';
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
					<TouchableOpacity onPress={this.addTotalItem} style={[styles.container.base(this.props.dashboard),styles.container.add(this.props.dashboard,this.props.data.stock)]}>
						<StaticText
							style={styles.text.add}
							property={'productList.content.addItem'}
						/>
					</TouchableOpacity>
				)
			}
			else {
				return(
					<View style={[styles.container.base(this.props.dashboard),styles.container.counter(this.props.dashboard)]}>
						<TouchableOpacity 
							style={styles.subcontainer.button}
							onPress={this.decTotalItem}
						>
							<Icon name="minus" size={12} color="#E52546"/>
						</TouchableOpacity>
						<Text style={styles.text.counter}>{this.props.count}</Text>
						{ this.props.data.stock == this.props.count
							? (<View 
									style={styles.subcontainer.button}
									onPress={this.addTotalItem}
								>
									<Icon name="plus" size={12} color="#E52546"/>
								</View>)
							: (<TouchableOpacity 
									style={styles.subcontainer.button}
									onPress={this.addTotalItem}
								>
									<Icon name="plus" size={12} color="#E52546"/>
								</TouchableOpacity>)
						}
					</View>
				)
			}
		} else {
			return(
				<View style={[styles.container.base(this.props.dashboard),styles.container.add(this.props.dashboard,this.props.data.stock)]}>
					<StaticText
						style={styles.text.add}
						property={'productList.content.unavailable'}
					/>
				</View>
			)
		}
	}

	render(){
		return this._renderButton()
	}
}

export default ButtonCount;