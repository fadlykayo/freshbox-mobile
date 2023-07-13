import React, { PureComponent } from 'react';
import { TouchableOpacity, Image, View, Share, Text } from 'react-native';
import images from '@assets';
import styles from './styles';
import { analytics } from '@helpers';

class ButtonFav extends PureComponent {
	constructor() {
		super();
		this.toggleFavorite = this.toggleFavorite.bind(this);
		this.onShare = this.onShare.bind(this);
	}

	toggleFavorite() {
		// analytics.log(`Button_Pressed_Favorite_${this.props.data.name.split(" ").join("_")}`)
		this.props.toggleFavorite(this.props.data);
	}

	onShare() {
		// analytics.log(`Button_Pressed_Share_${this.props.data.name.split(" ").join("_")}`)
		this.props.onShare(this.props.data);
	}

	render() {
		return (
			<View style={ { flexDirection: 'row' } }>
				<TouchableOpacity
					onPress={ this.onShare }
					style={ styles.container(this.props.dashboard) }>
					<Image
						style={ styles.icon(this.props.dashboard) }
						resizeMode={ 'contain' }
						source={ images.ic_share }
					/>
				</TouchableOpacity>
				{ this.props.user && (
					<TouchableOpacity
						onPress={ this.toggleFavorite }
						style={ styles.container(this.props.dashboard) }>
						<Image
							style={ styles.icon(this.props.dashboard) }
							resizeMode={ 'contain' }
							source={
								this.props.data.wishlisted == 1
									? images.icon_favorited
									: images.icon_favorite
							}
						/>
					</TouchableOpacity>
				) }
			</View>
		);
	}
}

export default ButtonFav;
