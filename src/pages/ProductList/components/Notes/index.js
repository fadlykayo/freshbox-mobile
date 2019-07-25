import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';
import images from '@assets';


class Notes extends PureComponent {
	constructor() {
		super();
	}

	render(){
		return (
				<View style = {styles.container}>
						<View style = {{marginHorizontal: 10}}>
							<Image
								style={{width: 20, height: 20}}
								source={images.info}
							/>
						</View>
						
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