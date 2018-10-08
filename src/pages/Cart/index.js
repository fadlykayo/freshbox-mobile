import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Checkout from './components/Checkout';
import CartComponent from './components/CartComponent';
import DetailProduct from './components/DetailProduct';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import styles from './styles';
import images from '@assets';
import { connect } from 'react-redux';
import actions from '@actions';


class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			totalPrice: 0,
			modalVisible: {
				openProduct: false,
			},
		}
		this.onChangeText = this.onChangeText.bind(this);
		this.updateDetail = this.updateDetail.bind(this);
		this.toggleFavorite = this.toggleFavorite.bind(this);
		this.changeTotalItem = this.changeTotalItem.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);
		this.openDetailProduct = this.openDetailProduct.bind(this);
		this.closeDetailProduct = this.closeDetailProduct.bind(this);
		this.navigateToCheckout = this.navigateToCheckout.bind(this);
		this.navigateToProductList = this.navigateToProductList.bind(this);
	}

	componentDidMount() {

	}

	onChangeText(type,value){
        let user = this.state;
        user[type] = value;
        this.setState({user});
	}

	setModalVisible(type,value){
        let modalVisible = this.state.modalVisible;
        modalVisible[type] = value;
        this.setState({modalVisible});
	}
	
	updateDetail(index) {
		let indexData = this.props.index_product[index];
		this.props.detail_product(indexData);
	}

	openDetailProduct(payload){
		this.props.detail_product(payload);
		this.setModalVisible('openProduct',true);
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

	navigateToCheckout() {
		actNav.navigate(navConstant.Checkout)
	}

	navigateToProductList() {
		actNav.reset(navConstant.Product)
	}

	render(){
		if (this.props.cart_product.length > 0) {
			return (
				<Container>
					<NavigationBar 
						title={'cart.navigationTitle'}
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
									/>
								)}
							/>
						</View>
						<Checkout
							totalPrice={this.props.total_price}
							onPress={this.navigateToCheckout}
						/>
					</View>
					<DetailProduct
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
		else {
			this.navigateToProductList();
			return null
		}
	}
}

const mapStateToProps = state => {
	return {
		cart_product: state.product.cart.products,
		index_product: state.product.cart.index,
		product: state.product.products,
		total_price: state.product.total.price,
		total_count: state.product.total.count,
		productDetail: state.product.detail,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_products : (req, success, failure) => dispatch(actions.product.api.get_products(req, success, failure)),
		change_total : (index, type) => dispatch(actions.product.reducer.change_total(index, type)),
		toggle_favorite: (index) => dispatch(actions.product.reducer.toggle_favorite(index)),
		detail_product : (index) => dispatch(actions.product.reducer.detail_product(index)),
		
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps)(Cart);