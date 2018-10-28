import React, { PureComponent } from 'react';
import { View } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';


class Notes extends PureComponent {
	constructor() {
		super();
	}

	render(){
		return (
      		<View style={styles.container}>
				<StaticText 
					style={styles.text.notes}
					property={'productList.notes'}
				/>
      		</View>
		);
	}
}

export default Notes;