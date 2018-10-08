import React,{ PureComponent } from 'react';
import { TouchableOpacity, View, Image, TouchableWithoutFeedback, ScrollView, Text } from 'react-native';
import ContentDetail from '../ContentDetail';
import StaticText from '@components/StaticText';
import styles from './styles';
import images from '@assets';

class DetailProduct extends PureComponent {
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
				<View style={styles.overlay}>
					<View style={styles.container}>
						<View style={styles.topComponent}>
							<View style={styles.scrollDownButton}>
								<TouchableWithoutFeedback
									onPress={this.closeDetailProduct}>
									<Image
										resizeMode={'contain'} 
										source={images.icon_scroll_down}
										style={styles.logo}
									/>
								</TouchableWithoutFeedback>
							</View>
						</View>
						<ScrollView style={styles.scrollView}>
							<View style={styles.middleComponent}>
								<View style={styles.borderImage}>
									<Image
										resizeMode={'contain'} 
										// source={this.props.data.images[0]}
										source={images.icon_sayur_segar}
										style={styles.logo}
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
							<View>
								<Text style={styles.textDescription}>{this.props.data.description}</Text>
							</View>
							<View style={styles.addButton}>
								{ this.props.data.count == 0 ? 
								(
								<TouchableOpacity 
									style={styles.addNewItem}
									onPress={this.addTotalItem}
								>
									<StaticText 
										style={styles.newItemText}
										property={'productList.content.addItem'}
									/>
								</TouchableOpacity>
								) : (
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
								) }
							</View>
						</ScrollView>
					</View>
				</View>
			)
		} else {
			return null;
		}
	}
}

export default DetailProduct;