import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, Share, Animated } from 'react-native';
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

	renderContent = () => {
		if(this.props.modalVisible) {
			return (
				<>
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
				</>
			)
		} else {
			return null
		}
	}
	
	render(){
		
		return (
    	<Animated.View style={styles.container(this.props.modalVisible, this.props.showFilter, this.props.dismissFilter)}>

				{this.renderContent()}
        	
			</Animated.View>
		);
	}
}

export default SearchComponent;