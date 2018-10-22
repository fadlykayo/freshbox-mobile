import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import ProductItem from '@components/ProductItem';
import ProductDetail from '@components/ProductDetail';
import NavigationBar from '@components/NavigationBar';
import Checkout from './components/Checkout';
import ModalLoginConfirmation from './components/ModalLoginConfirmation';
import styles from './styles';
import actions from '@actions';


class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			totalPrice: 0,
			modalVisible: {
				openProduct: false,
				modalLoginConfirmation: false,
			},
		}
		this.updateDetail = this.updateDetail.bind(this);
		this.navigateBack = this.navigateBack.bind(this);
		this.toggleFavorite = this.toggleFavorite.bind(this);
		this.changeTotalItem = this.changeTotalItem.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);
		this.navigateToSignIn = this.navigateToSignIn.bind(this);
		this.openDetailProduct = this.openDetailProduct.bind(this);
		this.closeDetailProduct = this.closeDetailProduct.bind(this);
		this.navigateToCheckout = this.navigateToCheckout.bind(this);
	}

	shouldComponentUpdate(nextProps){
		if(nextProps.cart_product.length == 0){
			this.navigateBack();
		}
		return true;
	}

	setModalVisible(type,value){
        let modalVisible = JSON.parse(JSON.stringify(this.state.modalVisible));
        modalVisible[type] = value;
        this.setState({modalVisible});
	}
	
	updateDetail(index){
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

	navigateToCheckout(){
		let buyProducts = [];

		this.props.cart_product.map((cart) => {
			let product = {};
			product.product_code = cart.code;
			product.qty = cart.count
			buyProducts.push(product)
		}) 

		if(this.props.user){
			let payload = {
				header: {
					apiToken: this.props.user.authorization
				},
				body: buyProducts
			}

			this.props.bulk_add_products(payload,
				(success) => {
					// console.log("Ini datanya", success)
					actNav.navigate(navConstant.Checkout)
				},
				(err) => {
					console.log(err)
				})
		}
		else {
			this.setModalVisible('modalLoginConfirmation',true);
		}
	}

	navigateToSignIn(){
		this.setModalVisible('modalLoginConfirmation',false);
		actNav.navigate(navConstant.SignIn,{
			action: 'guestLogin'
		});
	};

	navigateBack(){
		actNav.goBack();
	}

	render(){
		return (
			<Container
				bgColorBottom={'veryLightGrey'}
				bgColorTop={'red'}
			>
				<NavigationBar 
					title={'cart.navigationTitle'}
					onPress={this.navigateBack}
				/>
				<View style={styles.container}>
					<View style={styles.cartContainer}>
						<FlatList
							data={this.props.cart_product}
							keyExtractor={(item) => item.code}
							renderItem={({item,index}) => (
								<ProductItem 
									key={index}
									data={item}
									index={index+1} 
									user={this.props.user}
									toggleFavorite={this.toggleFavorite}
									changeTotalItem={this.changeTotalItem}
									productLength={this.props.cart_product.length}
									openDetailProduct={this.openDetailProduct}
								/>
							)}
						/>
					</View>
					<Checkout
						type={'red'}
						totalPrice={this.props.total_price}
						onPress={this.navigateToCheckout}
					/>
				</View>
				<ProductDetail
					user={this.props.user}
					data={this.props.productDetail}
					updateDetail={this.updateDetail}
					toggleFavorite={this.toggleFavorite}
					changeTotalItem={this.changeTotalItem}
					closeDetailProduct={this.closeDetailProduct}
					modalVisible={this.state.modalVisible.openProduct}
				/>
				<ModalLoginConfirmation
					onPress={this.navigateToSignIn} 
					modalVisible={this.state.modalVisible.modalLoginConfirmation}
				/>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user.data,
	cart_product: state.product.cart.products,
	index_product: state.product.cart.index,
	product: state.product.products,
	total_price: state.product.total.price,
	total_count: state.product.total.count,
	productDetail: state.product.detail,
})

const mapDispatchToProps = dispatch => ({
	get_products : (req, res, err) => dispatch(actions.product.api.get_products(req, res, err)),
	change_total : (index, type) => dispatch(actions.product.reducer.change_total(index, type)),
	toggle_favorite: (index) => dispatch(actions.product.reducer.toggle_favorite(index)),
	detail_product : (index) => dispatch(actions.product.reducer.detail_product(index)),
	bulk_add_products: (req, res, err) => dispatch(actions.transaction.api.bulk_add_products(req, res, err)),
})


export default connect(mapStateToProps,mapDispatchToProps)(Cart);