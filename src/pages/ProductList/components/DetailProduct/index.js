import React,{ PureComponent } from 'react';
import { TouchableOpacity, View, Image, TouchableWithoutFeedback, ScrollView, Text } from 'react-native';
import ContentDetail from '../ContentDetail';
import StaticText from '@components/StaticText';
import styles from './styles';
import images from '@assets';

class DetailProduct extends PureComponent {
	constructor(props){
		super(props);
		this.state={
			favorite: props.detailDataProduct.favorite,
			count: props.detailDataProduct.count,
		}
	}

	render(){
		if(this.props.modalVisible){
			return(
				<View style={styles.overlay}>
					<View style={styles.container}>
						<View style={styles.topComponent}>
							<View style={styles.scrollDownButton}>
								<TouchableWithoutFeedback
									onPress={ () => this.props.closeDetailProduct()}>
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
										source={this.props.detailDataProduct.image}
										style={styles.logo}
									/>
								</View>
								<ContentDetail data={this.props.detailDataProduct}/>
								<View style={styles.favoriteComponent}>
									<TouchableOpacity
										style={styles.touchableFavorite}
									>
										<Image
											resizeMode={'contain'} 
											source={
												this.props.detailDataProduct.favorite == true
													? images.icon_favorited
													: images.icon_favorite
											}
											style={styles.favoriteLogo}
										/>
									</TouchableOpacity>
								</View>
							</View>
							
							<View>
								<Text style={styles.textDescription}>{this.props.detailDataProduct.description}</Text>
							</View>

							<View style={styles.addButton}>
								{ this.props.detailDataProduct.count == 0 ? 
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
									<TouchableOpacity onPress={this.decTotalItem}>
										<StaticText 
											style={styles.operatorText}
											property={'productList.symbol.minus'}
										/>
									</TouchableOpacity>
									<Text style={styles.itemText}>{this.props.detailDataProduct.count}</Text>
									<TouchableOpacity onPress={this.addTotalItem}>
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