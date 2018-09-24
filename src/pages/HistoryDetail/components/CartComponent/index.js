import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import Content from '../Content';
import styles from './styles';
import images from '@assets';


class CartComponent extends Component {
	constructor(props){
		super(props)
		this.state={
			favorite: props.data.favorite,
		}
		this.toggleFavorite = this.toggleFavorite.bind(this);
	}

	toggleFavorite(){
		this.props.toggleFavorite(this.props.index);
	}

	shouldComponentUpdate(nextProps,nextState){
		if(this.state.favorite != this.props.data.favorite){
			this.setState({favorite: this.props.data.favorite});
			return true;
		}
	}

	render(){
		return (
			<View style={styles.eachCartContainer}>
				<View style={styles.imageContainer}>
					<Image
						resizeMode={'contain'} 
						source={this.props.data.image}
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
								this.state.favorite == true
									? images.icon_favorited
									: images.icon_favorite
							}
							style={styles.favoriteLogo}
						/>
					</TouchableOpacity>
					<View style={styles.pack}>
						<View>
							<Text style={styles.itemText}>
							{this.props.data.pack}<StaticText 
								property={'historyDetail.content.pack'}
							/></Text>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

export default CartComponent;