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

	openAllCategories(isArea = false) {
		this.props.openAllCategories(isArea)
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
		const selectedArea = this.props.listArea.filter(res => res.check)
		if(this.props.modalVisible) {
			return (
				<>
				<TouchableOpacity style={styles.subcontainer.part(true)} onPress = { () => this.openAllCategories(true)}>
        		{/* <StaticText
        		  	style={styles.text.title}
        		  	property={'productList.filter.area'}
        		/> */}
				{
					selectedArea.map(area => (
						<Text style={styles.text.title}>
							{area.name}
						</Text>
					))
				}
				<Image
						resizeMode={'contain'} 
						source={images.icon_dropdown}
						style={styles.icon}
					/>
        		{/* <Image
  	  			  	resizeMode={'contain'} 
  	  			  	source={images.ic_info_grey}
  	  			  	style={styles.icon}
  	  			/> */}
        	</TouchableOpacity>
				<TouchableOpacity
					style={styles.subcontainer.part(true)}
					onPress = { () => this.openAllCategories(false) }
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