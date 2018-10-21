import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { actNav } from '@navigations';
import Checkout from './components/Checkout';
import Container from '@components/Container';
import CartComponent from './components/CartComponent';
import DetailProduct from './components/DetailProduct';
import NavigationBar from '@components/NavigationBar';
import images from '@assets'
import styles from './styles';
import actions from '@actions';
import { connect } from 'react-redux';

class Favourites extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
			data: [{
				id: 1,
				image: images.icon_sayur_segar,
				title: "Wortel",
				category: "Sayur Segar",
				price: 21000,
				favorite: true,
				count: 0,
				stock: 5,
				description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima unde ad tempore sunt illum, ut sit laudantium cumque debitis beatae labore nulla inventore quam eos et quasi quae distinctio laboriosam?`
			},
			{
				id: 2,
				image: images.icon_sayur_segar,
				title: "Apel",
				category: "Buah",
				price: 19000,
				favorite: true,
				count: 0,
				stock: 5,
				description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima unde ad tempore sunt illum, ut sit laudantium cumque debitis beatae labore nulla inventore quam eos et quasi quae distinctio laboriosam?`
			},
			{
				id: 3,
				image: images.icon_sayur_segar,
				title: "Belimbing",
				category: "Buah",
				price: 20000,
				favorite: true,
				count: 0,
				stock: 5,
				description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima unde ad tempore sunt illum, ut sit laudantium cumque debitis beatae labore nulla inventore quam eos et quasi quae distinctio laboriosam?`
			}
			,{
				id: 4,
				image: images.icon_sayur_segar,
				title: "Mangga",
				category: "Buah",
				price: 15000,
				favorite: true,
				count: 0,
				stock: 5,
				description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima unde ad tempore sunt illum, ut sit laudantium cumque debitis beatae labore nulla inventore quam eos et quasi quae distinctio laboriosam?`
			},
			{
				id: 5,
				image: images.icon_sayur_segar,
				title: "Sawi",
				category: "Sayur Segar",
				price: 14000,
				favorite: true,
				count: 0,
				stock: 5,
				description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima unde ad tempore sunt illum, ut sit laudantium cumque debitis beatae labore nulla inventore quam eos et quasi quae distinctio laboriosam?`
			},
			{
				id: 6,
				image: images.icon_sayur_segar,
				title: "Belimbing",
				category: "Buah",
				price: 21000,
				favorite: true,
				count: 0,
				stock: 5,
				description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima unde ad tempore sunt illum, ut sit laudantium cumque debitis beatae labore nulla inventore quam eos et quasi quae distinctio laboriosam?`
			}
			,{
				id: 7,
				image: images.icon_sayur_segar,
				title: "Duren",
				category: "buah",
				price: 25000,
				favorite: true,
				count: 0,
				stock: 5,
				description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima unde ad tempore sunt illum, ut sit laudantium cumque debitis beatae labore nulla inventore quam eos et quasi quae distinctio laboriosam?`
			},
			{
				id: 8,
				image: images.icon_sayur_segar,
				title: "sawi",
				category: "sayur segar",
				price: 21000,
				favorite: true,
				count: 0,
				stock: 5,
				description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima unde ad tempore sunt illum, ut sit laudantium cumque debitis beatae labore nulla inventore quam eos et quasi quae distinctio laboriosam?`
			}],
			totalCount: 0,
			totalPrice: 0,
			searchItem: '',
			onCategory: '',
			indexProduct: 0,
			detailDataProduct: {},
			modalVisible: {
				openCategories: false,
				openProduct: false,
			},
		}
		this.toggleFavorite = this.toggleFavorite.bind(this);
		this.changeTotalItem = this.changeTotalItem.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);
		this.closeDetailProduct = this.closeDetailProduct.bind(this);
		this.openDetailProduct = this.openDetailProduct.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
		this.navigateToCart = this.navigateToCart.bind(this)
	}

	onChangeText(type, value){
        let user = this.state;
        user[type] = value;
        this.setState({user});
	}

	openDetailProduct(payload){
		this.props.detail_product(payload);
		this.setModalVisible('openProduct',true);
	}

	setModalVisible(type,value){
        let modalVisible = JSON.parse(JSON.stringify(this.state.modalVisible));
        modalVisible[type] = value;
        this.setState({modalVisible});
    }

	closeDetailProduct(){
		this.setModalVisible('openProduct',false);
	}
	
	toggleFavorite(payload){
		this.props.toggle_favorite(payload);
	}

	changeTotalItem(payload,type){
		this.props.change_total(payload,type);
	}

	navigateToCart(){
		actNav.navigate(navConstant.Cart);
	}

  	render() {
  	  	return (
			<Container 				
				bgColorBottom={'veryLightGrey'} 				
				bgColorTop={'red'} 			
			>
				<NavigationBar
					title={'favourites.navigationTitle'}
					onPress={actNav.goBack}
				/>
  	  	  		<View style={styles.container}>
					<View style={styles.cartContainer}>
						<FlatList
							data={this.props.cart_product}
							keyExtractor={(item) => String(item.id)}
							renderItem={({item,index}) => (
								<CartComponent
									data={item}
									index={index} 
									toggleFavorite={this.toggleFavorite}
									changeTotalItem={this.changeTotalItem}
									openDetailProduct={this.openDetailProduct}
									user={this.props.user}
								/>
							)}
						/>
						{ this.props.total_count > 0 ? 
						(
							<Checkout
								totalCount={ this.props.total_count }
								totalPrice={ this.props.total_price }
								onPress={this.navigateToCart}
							/>
						) : null }
						
					</View>
				</View>
				<DetailProduct
					user={this.props.user}
					data={this.props.productDetail}
					updateDetail={this.updateDetail}
					toggleFavorite={this.toggleFavorite}
					changeTotalItem={this.changeTotalItem}
					closeDetailProduct={this.closeDetailProduct}
					modalVisible={this.state.modalVisible.openProduct}
				/>
			</Container>
  	  	);
  	}
}

const mapStateToProps = state => {
	return {
		user: state.user.data,
		cart_product: state.product.cart.products,
		product: state.product.products,
		total_price: state.product.total.price,
		total_count: state.product.total.count,
		productDetail: state.product.detail,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		change_total : (index, type) => dispatch(actions.product.reducer.change_total(index, type)),
		toggle_favorite: (index) => dispatch(actions.product.reducer.toggle_favorite(index)),
		detail_product : (index) => dispatch(actions.product.reducer.detail_product(index)),
		bulk_add_products: (req, res, err) => dispatch(actions.transaction.api.bulk_add_products(req, res, err)),
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Favourites);
