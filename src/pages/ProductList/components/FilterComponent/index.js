import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
import StaticText from '@components/StaticText';
import styles from './styles';
import images from '@assets';


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
        	<View style={styles.subcontainer.part}>
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
				{ this.props.onCategory == 'Default' ? (
					<TouchableOpacity
						style={styles.subcontainer.part}
						onPress = { this.openAllCategories }
					>
						<StaticText
							style={styles.text.title}
							property={'productList.content.default'}
						/>
						<Image
					    	resizeMode={'contain'} 
					    	source={images.icon_view_categories}
					    	style={styles.icon}
						/>
					</TouchableOpacity>
				) : (
					<TouchableOpacity
        			  	style = {styles.subcontainer.part}
        			  	onPress = {this.props.openAllCategories}
        			>
        				<Text style = {styles.text.title}>{this.props.onCategory}</Text>
        				<Image
  	  					  	resizeMode = {'contain'} 
  	  					  	source = {images.icon_view_categories}
  	  					  	style = {styles.icon}
  	  					/>
        			</TouchableOpacity>
				) }
      	</View>
		);
	}
}

export default SearchComponent;