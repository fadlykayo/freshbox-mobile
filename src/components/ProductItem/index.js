import React, { PureComponent } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
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

		let productImage;
		let data;
		if(this.props.bannerDetail) {
			data = this.props.data.product;
		} else {
			data = this.props.data;
		}

		if(Platform.OS == 'ios') {
			
			productImage = data.images_sizes_url.original[0];
		} else {

			productImage = data.images_sizes_url["100x100"][0]
		}
		
		// console.log(this.props.data.images_sizes_url["50x50"][0])
		if(this.props.dashboard) {

			return(
				<View style={styles.container(this.props.index,this.props.productLength, this.props.search, data.stock, this.props.dashboard)}>
					<View style={styles.subcontainer.card(this.props.dashboard)}>
					
						<TouchableOpacity 
							onPress={this.openDetailProduct}
							style={styles.subcontainer.product(this.props.dashboard)}
						>
						
							
							
							<View style={styles.subcontainer.image(this.props.dashboard)}>
								<Image
									resizeMode={'contain'} 
									source={{uri: productImage}}
									style={styles.icon.product(this.props.dashboard)}
									resizeMethod={'resize'}
								/>
							</View>
							
							<View style = {{position: 'absolute', right: 5, top: 20}}>
								<ButtonFav 
									data={data}
									user={this.props.user}
									isFavorite={data.favorite}
									toggleFavorite={this.props.toggleFavorite}
									dashboard = {this.props.dashboard}
								/>
							</View> 
							
								<View style={{flex: -1}}>
									<Content data={data} dashboard={this.props.dashboard}/>
								</View> 

						
							
						</TouchableOpacity>
						
					</View>
					
					
				</View>
			);

		} else {
					return(
			<View style={styles.container(this.props.index,this.props.productLength, this.props.search, data.stock, this.props.dashboard)}>
				<View style={styles.subcontainer.card(this.props.dashboard)}>
					<TouchableOpacity 
						onPress={this.openDetailProduct}
						style={styles.subcontainer.product(this.props.dashboard)}
					>
						<View style={styles.subcontainer.image(this.props.dashboard)}>
							<Image
								resizeMode={'contain'} 
								source={{uri: productImage}}
								style={styles.icon.product(this.props.dashboard)}
								resizeMethod={'resize'}
							/>
						</View>
						<Content data={data}/>
						{
							this.props.type == 'cart'
							? 	null
							:	<ButtonFav 
									data={data}
									user={this.props.user}
									isFavorite={data.favorite}
									toggleFavorite={this.props.toggleFavorite}
								/>
						}
					</TouchableOpacity>
					<ButtonCount
						data={data}
						count={data.count}
						addTotalItem={this.addTotalItem}
						decTotalItem={this.decTotalItem}
					/>
				</View>
				<View style={styles.subcontainer.verification}>
					<ProductStockVerificationText 
						type={this.props.type}
						count={data.count}
						stock={data.stock}
						maxQty={data.maxQty}
					/>
				</View>
				
			</View>
		);

		}
	}
}

export default ProductItem;