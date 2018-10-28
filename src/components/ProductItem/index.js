import React, { PureComponent } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import ButtonCount from '@components/ButtonCount'; 
import ProductStockVerificationText from '@components/ProductStockVerificationText';
import ButtonFav from '@components/ButtonFav';
import Content from './components/Content';
import styles from './styles';

class ProductItem extends PureComponent {
	constructor(){
		super();
		this.addTotalItem = this.addTotalItem.bind(this);
		this.decTotalItem = this.decTotalItem.bind(this);
		this.openDetailProduct = this.openDetailProduct.bind(this);
	}

	addTotalItem(){
		this.props.changeTotalItem(this.props.data,"inc");
	}

	decTotalItem(){
		this.props.changeTotalItem(this.props.data,"desc");
	}

	openDetailProduct(){
		this.props.openDetailProduct(this.props.data);
	}

	render(){
		const productImage = this.props.data.images_sizes_url.original[0];
		return(
			<View style={styles.container(this.props.index,this.props.productLength)}>
				<View style={styles.subcontainer.card}>
					<TouchableOpacity 
						onPress={this.openDetailProduct}
						style={styles.subcontainer.product}
					>
						<View style={styles.subcontainer.image}>
							<Image
								resizeMode={'contain'} 
								source={{uri: productImage}}
								style={styles.icon.product}
							/>
						</View>
						<Content 
							data={this.props.data}
						/>
						{
							this.props.type == 'cart'
							? 	null
							:	<ButtonFav 
									data={this.props.data}
									user={this.props.user}
									isFavorite={this.props.data.favorite}
									toggleFavorite={this.props.toggleFavorite}
								/>
						}
					</TouchableOpacity>
					<ButtonCount
						count={this.props.data.count}
						addTotalItem={this.addTotalItem}
						decTotalItem={this.decTotalItem}
					/>
				</View>
				<View style={styles.subcontainer.verification}>
					<ProductStockVerificationText 
						type={this.props.type}
						count={this.props.data.count}
						stock={this.props.data.stock}
						maxQty={this.props.data.maxQty}
					/>
				</View>
			</View>
		);
	}
}

export default ProductItem;