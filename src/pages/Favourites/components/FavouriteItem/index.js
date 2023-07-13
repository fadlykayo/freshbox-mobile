import {
	ActivityIndicator,
	Image,
	Platform,
	Share,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { PureComponent } from 'react';
// import Content from '../../components/Content';
import { analytics, hasObjectValue, onShare, scaling } from '@helpers';

import ButtonCount from '@components/ButtonCount';
import ButtonFav from '@components/ButtonFav';
// import Content from '../../../../components/ProductItem/components/Content';
import FavouriteContent from './components/Content';
import ProductStockVerificationText from '@components/ProductStockVerificationText';
import styles from './styles';

class FavouriteItem extends PureComponent {
	constructor() {
		super();
		this.addTotalItem = this.addTotalItem.bind(this);
		this.decTotalItem = this.decTotalItem.bind(this);
		this.openDetailProduct = this.openDetailProduct.bind(this);
	}

	addTotalItem() {
		let data;
		if (this.props.bannerDetail) {
			data = this.props.data.product;
		} else {
			data = this.props.data;
		}
		this.props.changeTotalItem(data, 'inc');
	}

	decTotalItem() {
		let data;
		if (this.props.bannerDetail) {
			data = this.props.data.product;
		} else {
			data = this.props.data;
		}
		this.props.changeTotalItem(data, 'desc');
	}

	openDetailProduct() {
		let data;
		// let bannerPrice;
		// if (this.props.bannerDetail) {
		//   data = this.props.data.product;
		// } else {
		data = this.props.data;
		// }
		// if (this.props.bannerPrice) {
		//   bannerPrice = this.props.bannerPrice;
		//   this.props.openDetailProduct(this.props.data, bannerPrice);
		// } else {
		this.props.openDetailProduct(this.props.data);
		// }
		analytics.log('Prduct_Card_Clicked', {
			name: data.name.replace(/[\W_]+/g, ''),
		});
	}

	render() {
		let productImage;
		let data;
		let bannerPrice;

		// if (this.props.bannerDetail) {
		//   data = this.props.data.product;
		// } else {
		data = this.props.data;
		// }

		// if (this.props.bannerPrice) {
		//   bannerPrice = this.props.bannerPrice;
		// } else {
		//   bannerPrice = this.props.data.banner_harga_jual;
		// }

		if (Platform.OS == 'ios') {
			productImage = hasObjectValue(data, 'images_sizes_url')
				? data.images_sizes_url.original[0]
				: data.images;
		} else {
			productImage = hasObjectValue(data, 'images_sizes_url')
				? data.images_sizes_url.original[0]
				: data.images;
		}
		return (
			<View
				style={ styles.container(
					this.props.index,
					this.props.productLength,
					this.props.search,
					data.stock,
					this.props.dashboard,
				) }>
				<View style={ styles.subcontainer.card(this.props.dashboard) }>
					<TouchableOpacity
						onPress={ this.openDetailProduct }
						style={ styles.subcontainer.product(this.props.dashboard) }>
						<View style={ styles.subcontainer.image(this.props.dashboard) }>
							<Image
								resizeMode={ 'contain' }
								source={ { uri: productImage } }
								style={ styles.icon.product(this.props.dashboard) }
								resizeMethod={ 'resize' }
							/>
						</View>
						<FavouriteContent
							data={ data }
							bannerPrice={ bannerPrice }
							dashboard={ this.props.dashboard }
						/>
						{ this.props.type == 'cart' ? null : (
							<ButtonFav
								data={ data }
								user={ this.props.user }
								isFavorite={ data.favorite }
								onShare={ onShare }
								toggleFavorite={ this.props.toggleFavorite }
							/>
						) }
					</TouchableOpacity>
					<ButtonCount
						data={ data }
						count={ data.count }
						addTotalItem={ this.addTotalItem }
						decTotalItem={ this.decTotalItem }
					/>
				</View>

				<View style={ styles.subcontainer.verification }>
					<ProductStockVerificationText
						type={ this.props.type }
						count={ data.count }
						stock={ data.stock }
						maxQty={ data.maxQty }
					/>
				</View>
			</View>
		);
		// }
	}
}

export default FavouriteItem;