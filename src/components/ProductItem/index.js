import React, { PureComponent } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import ButtonCount from '@components/ButtonCount'; 
import Content from './components/Content';
import styles from './styles';
import images from '@assets';


class ProductItem extends PureComponent {
	constructor(){
		super();
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
		const productImage = this.props.data.images_sizes_url.original[0];
		return(
			<View style={styles.container(this.props.index,this.props.productLength)}>
				<TouchableOpacity 
					onPress={this.openDetailProduct}
					style={styles.subcontainer.product}
				>
					<View style={styles.subcontainer.image}>
						<Image
							resizeMode={'contain'}
							source={images.icon_sayur_segar} 
							source={{uri: productImage}}
							style={styles.icon.product}
						/>
					</View>
					<Content data={this.props.data}/>
					<View style={styles.addContainer}>
					{ this.props.user ? (
						<TouchableOpacity
							onPress={this.toggleFavorite}
							style={styles.touchableFavorite}
						>
							<Image
								resizeMode={'contain'} 
								source={
									this.props.data.favorite == true
									? 	images.icon_favorited
									: 	images.icon_favorite
								}
								style={styles.favoriteLogo}
							/>
						</TouchableOpacity>
					) : null }
					</View>
				</TouchableOpacity>
				<ButtonCount
					count={this.props.data.count}
					addTotalItem={this.addTotalItem}
					decTotalItem={this.decTotalItem}
				/>
			</View>
		);
	}
}

export default ProductItem;