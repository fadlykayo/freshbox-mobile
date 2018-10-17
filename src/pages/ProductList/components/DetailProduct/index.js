import React,{ Component } from 'react';
import { TouchableOpacity, View, Image, ScrollView, Text } from 'react-native';
import ContentDetail from '../ContentDetail';
import ButtonCount from '@components/ButtonCount';
import styles from './styles';
import images from '@assets';

class DetailProduct extends Component {
	constructor(){
		super();
		this.addTotalItem = this.addTotalItem.bind(this);
		this.decTotalItem = this.decTotalItem.bind(this);
		this.toggleFavorite = this.toggleFavorite.bind(this);
		this.closeDetailProduct = this.closeDetailProduct.bind(this);
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
								<Image
									resizeMode={'contain'} 
									// source={this.props.data.images[0]}
									source={images.icon_sayur_segar}
									style={styles.icon.product}
								/>
							</View>
							<ContentDetail data={this.props.data}/>
							<View style={styles.favoriteComponent}>
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
							</View>
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
					</View>
				</View>
			)
		} else {
			return null;
		}
	}
}

export default DetailProduct;