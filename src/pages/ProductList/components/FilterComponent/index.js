import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, Share } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';
import images from '@assets';
import LinearGradient from 'react-native-linear-gradient';
import { colour } from '@styles';


class SearchComponent extends Component {
	constructor(props) {
		super(props);
		this.openAllCategories = this.openAllCategories.bind(this);
		this.openDeliveryInfo = this.openDeliveryInfo.bind(this);
	}

	openAllCategories() {
		this.props.openAllCategories()
	}

	openDeliveryInfo = () => {
		console.log();
	}

	onShare = async () => {
		try {
			const result = await Share.share({
				message: 'Freshbox || Get your box of fresh veggies!'
			});

			if (result.action == Share.sharedAction) {
				if(result.activityType) {
					// console.warn(result.activityType)
				} else {
					// console.warn(result)
				}
			} else if (result.action === Share.dismissedAction) {
				// console.warn('dismissed')
			}
		} catch (err) {
			// console.warn(err.message)
		}
	}
	
	render(){
		return (
    	<View style={styles.container}>
        	<View style={styles.subcontainer.part(false)} onPress = {this.openDeliveryInfo}>
        		<StaticText
        		  	style={styles.text.title}
        		  	property={'productList.filter.area'}
        		/>
        		{/* <Image
  	  			  	resizeMode={'contain'} 
  	  			  	source={images.ic_info_grey}
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
						<Text style={styles.text.title} numberOfLines={1}>{this.props.onCategory}</Text>
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