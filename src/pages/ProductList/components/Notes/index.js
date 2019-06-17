import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';


class Notes extends PureComponent {
	constructor() {
		super();
	}

	render(){
		return (
      		<View style={styles.container}>

					{
						this.props.text !== '' ? 
						<Text style={styles.text.notes}>{this.props.text}</Text> :
						<StaticText 
							style={styles.text.notes}
							property={'productList.notes'}
						/>
					}
						
      		</View>
		);
	}
}

export default Notes;