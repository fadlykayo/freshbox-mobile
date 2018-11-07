import React,{ Component } from 'react';
import { TouchableOpacity, View, Image, ScrollView, Text } from 'react-native';
import ButtonFav from '@components/ButtonFav';
import ProductStockVerificationText from '@components/ProductStockVerificationText';
import ButtonCount from '@components/ButtonCount';
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

	render(){
		if(this.props.modalVisible){
			return(
				<View style={styles.background}>
					<TouchableOpacity style={styles.background} onPress={this.closeDetailProduct}></TouchableOpacity>
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
									onScroll={(e) => this.getPositionIndex(e)}
									showsHorizontalScrollIndicator={false}
									contentContainerStyle={styles.image.content}
									style={styles.image.style}
								>
									{ 
										this.props.data.images_sizes_url.original.map((image,index) => 
										(
											<Image
												key={index}
												resizeMode={'contain'} 
												source={{uri: image}}
												style={styles.icon.product}
											/>
										)) 
									}
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