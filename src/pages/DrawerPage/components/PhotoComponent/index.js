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
		if (this.props.user && this.props.user.user) {
			console.log(this.props.user)
			return (
				<TouchableOpacity onPress={ this.navigateToProfilePage } style={styles.container}>
					<Image
						resizeMode={'cover'} 
						source={ 
								this.props.user.user.image == '' || this.props.user.user.image == null
								? images.icon_img_ava_grey
							: {uri: this.props.user.user.images_sizes_url.original}
						}
						style={
								this.props.user.user.image == '' || this.props.user.user.image == null
								? styles.photo.dummy
								: styles.photo.real
						}
					/>
					
					<View style={styles.text.place}>
						<Text style={styles.user.name}>{this.props.user.user.name}</Text>
						<Text style={styles.user.email}>{this.props.user.user.email}</Text>

						{
							this.props.updateMessage !== '' ? 
							<>
							<Text style={styles.user.email}>{this.props.updateMessage}</Text>
							<Text style={styles.user.email}>{this.props.receivedBytes} of {this.props.totalBytes} received</Text>
							</> :
							null
						}

					</View>
				</TouchableOpacity>
				);	
		}
		else {
			return (
				<View style={styles.container}>				
					<Image
						resizeMode={'contain'} 
						source={images.icon_img_ava_grey}
						style={styles.photo.dummy}
					/>
				</View>
			);
		}
  	}
}

export default PhotoComponent;