import React,{ Component } from 'react';
import { TouchableOpacity, View, Image, ScrollView, Text } from 'react-native';
import Content from './components/Content';
import ButtonFav from '@components/ButtonFav';
import ProductStockVerificationText from '@components/ProductStockVerificationText';
import ButtonCount from '@components/ButtonCount';
import styles from './styles';
import images from '@assets';

class ProductDetail extends Component {
	constructor(){
		super();
		this.addTotalItem = this.addTotalItem.bind(this);
		this.decTotalItem = this.decTotalItem.bind(this);
		this.closeDetailProduct = this.closeDetailProduct.bind(this);
	}

	addTotalItem(){
		this.props.changeTotalItem(this.props.data,"inc");
	}

	decTotalItem(){
		this.props.changeTotalItem(this.props.data,"desc");
	}

	closeDetailProduct(){
		this.props.closeDetailProduct();
	}

	render(){
		if(this.props.modalVisible){
			return(
				<View style={styles.background}>
					<View style={styles.container}>
						<TouchableOpacity 
							style={styles.subcontainer.top}
							onPress={this.closeDetailProduct}
						>
							<View style={styles.button.dropdown}>
								<Image
									resizeMode={'contain'} 
									source={images.icon_scroll_down}
									style={styles.icon.dropdown}
								/>
							</View>
						</TouchableOpacity>
						<View style={styles.subcontainer.mid}>
							<View style={styles.subcontainer.product}>
								<ScrollView
									horizontal={true}
									pagingEnabled={true}
									showsHorizontalScrollIndicator={false}
									contentContainerStyle={styles.image.content}
									style={styles.image.style}
								>
								{ 
									this.props.data.images_sizes_url.original.map((image,index) => 
									(
										<View 
											style={styles.image.style} 
											key={index}
										>
											<Image

												resizeMode={'contain'} 
												source={{uri: image}}
												style={styles.icon.product}
											/>
										</View>
											
									)) 
								}
								</ScrollView>
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
						</View>
						<View style={styles.subcontainer.bottom}>
							<ScrollView style={styles.bottomContainer}>
								<Text style={styles.text.description}>{this.props.data.description}</Text>
							</ScrollView>
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
				</View>
			)
		} else {
			return null;
		}
	}
}

export default ProductDetail;