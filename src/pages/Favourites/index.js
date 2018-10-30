import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { actNav } from '@navigations';
import { language } from '@helpers';
import Checkout from './components/Checkout';
import Container from '@components/Container';
import ProductItem from '@components/ProductItem';
import ProductDetail from '@components/ProductDetail';
import NavigationBar from '@components/NavigationBar';
import styles from './styles';
import actions from '@actions';
import { connect } from 'react-redux';

class Favourites extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
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
		this.navigateToCart = this.navigateToCart.bind(this);
		this.validateCart = this.validateCart.bind(this);
	}

	validateCart(){
		let outStockCart = this.props.cart_product.slice().filter(item => item.count > item.stock);
		if(outStockCart.length > 0){
			language.transformText('message.outOfStock')
			.then(message => {
				this.props.set_error_status({
					status: true,
					title: 'formError.title.outOfStock',
					data: message,
				});
			});
		}
		else{
			this.navigateToCart();
		}
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
							keyExtractor={(item, index) => index.toString()}
							renderItem={({item,index}) => (
								<ProductItem
									key={index}
									data={item}
									type={'cart'}
									index={index+1} 
									toggleFavorite={this.toggleFavorite}
									changeTotalItem={this.changeTotalItem}
									openDetailProduct={this.openDetailProduct}
									user={this.props.user}
								/>
							)}
						/>
						<Checkout
							totalCount={ this.props.total_count }
							totalPrice={ this.props.total_price }
							onPress={this.navigateToCart}
						/>
					</View>
				</View>
				<ProductDetail
					type={'favorites'}
					user={this.props.user}
					data={this.props.productDetail}
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
		toggle_favorite: (payload) => dispatch(actions.product.reducer.toggle_favorite(payload)),
		detail_product : (payload) => dispatch(actions.product.reducer.detail_product(payload)),
		bulk_add_products: (req, res, err) => dispatch(actions.transaction.api.bulk_add_products(req, res, err)),
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Favourites);
