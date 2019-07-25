import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';
import images from '@assets';
import LinearGradient from 'react-native-linear-gradient';
import { colour } from '@styles';


class SearchComponent extends Component {
	constructor(props) {
		super(props);
		this.openAllCategories = this.openAllCategories.bind(this);
	}

	openAllCategories() {
		this.props.openAllCategories()
	}
	render(){
		return (
    	<View style={styles.container}>
        	<View style={styles.subcontainer.part(false)}>
        		<StaticText
        		  	style={styles.text.title}
        		  	property={'productList.filter.area'}
        		/>
        		{/* <Image
  	  			  	resizeMode={'contain'} 
  	  			  	source={images.icon_dropdown}
  	  			  	style={styles.icon}
  	  			/> */}
        	</View>
			<TouchableOpacity
				style={styles.subcontainer.part(true)}
				onPress = { this.openAllCategories }
			>
				{ this.props.onCategory == 'Default'
					? (
						<StaticText
							style={styles.text.title}
							property={'productList.content.default'}
						/>
					)
					: (
						<Text style={styles.text.title}>{this.props.onCategory}</Text>
					)
				}
				<Image
					resizeMode={'contain'} 
					source={images.icon_view_categories}
					style={styles.icon}
				/>
			</TouchableOpacity>
      	</View>
		);
	}
}

export default SearchComponent;