import React,{ Component } from 'react';
import { TouchableOpacity, View, Image, ScrollView, Text } from 'react-native';
import ButtonFav from '@components/ButtonFav';
import ProductStockVerificationText from '@components/ProductStockVerificationText';
import ButtonCount from '@components/ButtonCount';
import ZoomImage from '@components/ZoomImage';
import Content from './components/Content';
import ScrollDown from './components/ScrollDown';
import CountImage from './components/CountImage';
import BubbleComponent from './components/BubbleComponent';
import styles from './styles';
import images from '@assets';

class ProductDetail extends Component {
	constructor(){
		super();
		this.addTotalItem = this.addTotalItem.bind(this);
		this.decTotalItem = this.decTotalItem.bind(this);
		this.getPositionIndex = this.getPositionIndex.bind(this);
		this.getPositionBubble = this.getPositionBubble.bind(this);
		this.closeDetailProduct = this.closeDetailProduct.bind(this);
		this.openZoomImage = this.openZoomImage.bind(this);
		this.closeZoomImage = this.closeZoomImage.bind(this);
	}

	addTotalItem(){
		this.props.changeTotalItem(this.props.data,"inc");
	}

	decTotalItem(){
		this.props.changeTotalItem(this.props.data,"desc");
	}

	getPositionIndex(e) {
		this.props.getPositionIndex(e)
	}

	getPositionBubble() {
		this.props.getPositionBubble()
	}

	closeDetailProduct() {
		this.props.closeDetailProduct();
	}

	openZoomImage() {
		this.props.openZoomImage();
	}

	closeZoomImage() {
		this.props.closeZoomImage();
	}

	render(){
		if(this.props.modalVisible){
			return(
				<View style={styles.background}>
					<TouchableOpacity style={styles.touchable} onPress={this.closeDetailProduct}></TouchableOpacity>
					<View style={styles.container}>
						<ScrollDown
							closeDetailProduct={this.props.closeDetailProduct}
						/>
						<View style={styles.subcontainer.mid}>
							<View style={styles.subcontainer.product}>
								<ScrollView
									ref={ e => { this.scrollRef = e }}
									horizontal={true}
									pagingEnabled={true}
									showsHorizontalScrollIndicator={false}
									onScroll={(e) => this.getPositionIndex(e)}
									scrollEventThrottle={0}
									contentContainerStyle={styles.image.content}
									style={styles.image.style}
								>
									{ this.props.data.images_sizes_url.original.map((image,index) => {
										return (
											<TouchableOpacity key={index} onPress={this.openZoomImage}>
												<Image
													resizeMode={'contain'} 
													source={{uri: image}}
													style={styles.icon.product}
												/>
											</TouchableOpacity>
										)}
									)}
								</ScrollView>
								<BubbleComponent
									images={this.props.data.images_sizes_url.original}
									bubble={this.props.bubble}
								/>
								<CountImage
									images={this.props.data.images_sizes_url.original}
									bubble={this.props.bubble}
								/>
							</View>
							<Content data={this.props.data}/>
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
								data={this.props.data}
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
					<ZoomImage
						modalVisible={this.props.openImageDetail}
						closeZoomImage={this.closeZoomImage}
						images={this.props.data.images_sizes_url.original}
					/>
				</View>
			)
		} else {
			return null;
		}
	}
}

export default ProductDetail;