import React, { PureComponent } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';
import images from '@assets';

class PhotoComponent extends PureComponent {
  	constructor() {
		super();
		this.navigateToProfilePage = this.navigateToProfilePage.bind(this);
    }

	navigateToProfilePage() {
		this.props.navigateToProfilePage()
	}

  	render () {
		if (this.props.user) {
			return (
				<TouchableOpacity 
					onPress={ this.navigateToProfilePage }    
					style={styles.topComponent}
				>
				{ this.props.user.user.images == null ? (
					<Image
						resizeMode={'contain'} 
						source={images.icon_img_ava_grey}
						style={styles.photo}
					/>
				) : (
					<Image
						resizeMode={'contain'} 
						source={this.props.user.user.images}
						style={styles.photo}
					/>
				) }
					
					<View>
						<Text style={styles.userName}>{this.props.user.user.name}</Text>
						<Text style={styles.userEmail}>{this.props.user.user.email}</Text>
					</View>
				</TouchableOpacity>
				);	
		}
		else {
			return (
				<View style={styles.topComponent}>				
					<Image
						resizeMode={'contain'} 
						source={images.icon_img_ava_grey}
						style={styles.photo}
					/>
					
					{/* <View>
						<StaticText
							style={styles.userName}
							property={'drawerPage.content.user'}
						/>
					</View> */}
				</View>
			);
		}
  	}
}

export default PhotoComponent;