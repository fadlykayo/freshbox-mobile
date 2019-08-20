import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';
import images from '@assets';


class Notes extends PureComponent {
	constructor() {
		super();
		this.state = {
			showNotes : true
		}
	}

	dismissNotes = () => {
		this.setState({showNotes: false})
	}

	render(){
		if(this.state.showNotes) {
			return (
				<TouchableWithoutFeedback onPress={this.dismissNotes}>

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

				</TouchableWithoutFeedback>

			);
		} else {
			return null
		}
		
	}
}

export default Notes;