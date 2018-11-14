import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import Content from '../Content';
import styles from './styles';
import images from '@assets';


class CartComponent extends Component {
	constructor(){
		super()
		this.toggleFavorite = this.toggleFavorite.bind(this);
	}

	toggleFavorite(){
		this.props.toggleFavorite(this.props.data);
	}

	render(){
		return (
			<View style={styles.container}>
				<View style={styles.subcontainer.image}>
					<Image
						resizeMode={'contain'} 
						source={
							this.props.action == 'history' 
							? {uri: this.props.data.product.images_sizes_url.original[0]} 
							: {uri: this.props.data.images_sizes_url.original[0]}
						}
						style={styles.icon.product}
					/>
				</View>
				<Content 
					data={this.props.data} 
					action={this.props.action}
				/>
				<View style={styles.subcontainer.right}>
					<TouchableOpacity
						onPress={this.toggleFavorite}
						style={styles.subcontainer.favorite}
					>
						<Image
							style={styles.icon.favorite}
							resizeMode={'contain'} 
							source={
								this.props.data.wishlisted == 1
									? images.icon_favorited
									: images.icon_favorite
							}
						/>
					</TouchableOpacity>
					<View style={styles.subcontainer.amount}>
						{ 
							this.props.action == 'history'
							? 	<Text style={styles.text.desc}>
									{this.props.data.qty} 
									<StaticText 
										style={styles.text.desc}
										property={'historyDetail.content.pack'}
									/>
								</Text>
							
							: 	<Text style={styles.text.desc}>
									{this.props.data.count} {this.props.data.unit}
								</Text>
							
						}
					</View>
				</View>
			</View>
		);
	}
}

export default CartComponent;