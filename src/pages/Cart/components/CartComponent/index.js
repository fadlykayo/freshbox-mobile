import React, { PureComponent } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import Content from '../Content';
import styles from './styles';
import images from '@assets';


class CartComponent extends PureComponent {
	constructor(){
		super()
		this.addTotalItem = this.addTotalItem.bind(this);
		this.decTotalItem = this.decTotalItem.bind(this);
		this.toggleFavorite = this.toggleFavorite.bind(this);
		this.openDetailProduct = this.openDetailProduct.bind(this);
	}

	addTotalItem(){
		this.props.changeTotalItem(this.props.data,"inc");
	}

	decTotalItem(){
		this.props.changeTotalItem(this.props.data,"desc");
	}

	toggleFavorite(){
		this.props.toggleFavorite(this.props.data);
	}

	openDetailProduct(){
		this.props.openDetailProduct(this.props.data);
	}

	render(){
		return (
			<View style={styles.cartContainer}>
				<TouchableOpacity
					onPress={this.openDetailProduct}
					style={styles.container}
				>
					<View style={styles.imageContainer}>
						<Image
							resizeMode={'contain'}
							// source={images.icon_sayur_segar} 
							source={{uri: this.props.data.images_sizes_url.original[0]}}
							style={styles.picture}
						/>
					</View>
					<Content data={this.props.data}/>
					<View style={styles.addContainer}>
						<TouchableOpacity
							onPress={this.toggleFavorite}
							style={styles.touchableFavorite}
						>
							{ this.props.user ? (
								<Image
									resizeMode={'contain'} 
									source={
										this.props.data.favorite == true
											? images.icon_favorited
											: images.icon_favorite
									}
									style={styles.favoriteLogo}
								/>
							) : null }
						</TouchableOpacity>
							
					</View>
				</TouchableOpacity>
				<View style={styles.touchableItem}>
					<TouchableOpacity 
						style={styles.boxOperatorLeft}
						onPress={this.decTotalItem}
					>
						<StaticText 
							style={styles.operatorText}
							property={'productList.symbol.minus'}
						/>
					</TouchableOpacity>
					<Text style={styles.itemText}>{this.props.data.count}</Text>
					<TouchableOpacity 
						style={styles.boxOperatorRight}
						onPress={this.addTotalItem}
					>
						<StaticText 
							style={styles.operatorText}
							property={'productList.symbol.plus'}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default CartComponent;