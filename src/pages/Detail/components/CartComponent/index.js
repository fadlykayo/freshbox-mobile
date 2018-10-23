import React, { PureComponent } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import Content from '../Content';
import styles from './styles';
import images from '@assets';


class CartComponent extends PureComponent {
	constructor(){
		super()
		this.toggleFavorite = this.toggleFavorite.bind(this);
	}

	toggleFavorite(){
		this.props.toggleFavorite(this.props.data);
	}

	render(){
		return (
			<View style={styles.eachCartContainer}>
				<View style={styles.imageContainer}>
					<Image
						resizeMode={'contain'} 
						source={this.props.action == 'history' ? this.props.transaction.image : this.props.data.images_sizes_url.original[0]}
						style={styles.picture}
					/>
				</View>
				<Content data={this.props.data} action={this.props.action}/>
				<View style={styles.addContainer}>
					<TouchableOpacity
						onPress={this.toggleFavorite}
						style={styles.touchableFavorite}
					>
						<Image
							resizeMode={'contain'} 
							source={
								this.props.data.favorite == true
									? images.icon_favorited
									: images.icon_favorite
							}
							style={styles.favoriteLogo}
						/>
					</TouchableOpacity>
					<View style={styles.pack}>
						<View>
							
							{ this.props.action == 'history'
								? (
								<Text style={styles.itemText}>
									{this.props.data.pack} <StaticText 
									property={'historyDetail.content.pack'}
									/>
								</Text>
								)
								: (
								<Text style={styles.itemText}>
									{this.props.data.count} {this.props.data.unit}
								</Text>
								)
							}
						</View>
					</View>
				</View>
			</View>
		);
	}
}

export default CartComponent;