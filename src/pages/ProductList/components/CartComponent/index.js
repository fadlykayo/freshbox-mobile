import React, { PureComponent } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import Content from '../Content';
import styles from './styles';
import images from '@assets';


class CartComponent extends PureComponent {
	constructor(props){
		super(props)
		this.state={
			favorite: props.data.favorite,
			count: props.data.count
		}
		this.addTotalItem = this.addTotalItem.bind(this);
		this.decTotalItem = this.decTotalItem.bind(this);
		this.toggleFavorite = this.toggleFavorite.bind(this);
	}

	addTotalItem(){
		this.props.changeTotalItem(this.props.index,"inc");
	}

	decTotalItem(){
		this.props.changeTotalItem(this.props.index,"desc");
	}

	toggleFavorite(){
		this.props.toggleFavorite(this.props.index);
	}


	render(){
		return (
			<View style={styles.eachCartContainer}>
				<TouchableOpacity 
					onPress={ () => this.props.openDetailProduct(this.props.index)}
					style={styles.container}
				>
					<View style={styles.imageContainer}>
						<Image
							resizeMode={'contain'}
							source={images.icon_sayur_segar} 
							// source={this.props.data.images[0]}
							style={styles.picture}
						/>
					</View>
					<Content data={this.props.data}/>
					<View style={styles.addContainer}>
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
				</TouchableOpacity>
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
							<TouchableOpacity onPress={this.decTotalItem}>
								<StaticText 
									style={styles.operatorText}
									property={'productList.symbol.minus'}
								/>
							</TouchableOpacity>
							<Text style={styles.itemText}>{this.props.data.count}</Text>
							<TouchableOpacity onPress={this.addTotalItem}>
								<StaticText 
									style={styles.operatorText}
									property={'productList.symbol.plus'}
								/>
							</TouchableOpacity>
						</View>
				) }
			</View>
		);
	}
}

export default CartComponent;