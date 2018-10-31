import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import AlertDialog from '@components/AlertDialog'; 
import ProductItem from '@components/ProductItem';
import ProductDetail from '@components/ProductDetail';
import NavigationBar from '@components/NavigationBar';
import Checkout from './components/Checkout';
import ModalLoginConfirmation from './components/ModalLoginConfirmation';
import { language } from '@helpers';
import styles from './styles';
import actions from '@actions';


class Favourites extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			totalPrice: 0,
			refreshing: false,
			modalVisible: {
				openProduct: false,
				alertDialog: false,
				modalLoginConfirmation: false,
			},
			selectedProduct: null,
		}
		this.getFavorites = this.getFavorites.bind(this);
		this.validateCart = this.validateCart.bind(this);
		this.toggleFavorite = this.toggleFavorite.bind(this);
		this.handleLoadMore = this.handleLoadMore.bind(this);
		this.changeTotalItem = this.changeTotalItem.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);
		this.openDetailProduct = this.openDetailProduct.bind(this);
		this.createOrderHandler = this.createOrderHandler.bind(this);
		this.closeDetailProduct = this.closeDetailProduct.bind(this);
		this.clearProductCancelation = this.clearProductCancelation.bind(this);
		this.clearProductConfirmation = this.clearProductConfirmation.bind(this);
	}

	componentDidMount() {
		this.getFavorites();
	}

	refreshHandler(){
		this.setState({refreshing: true},() => {
			this.getFavorites();
		});
	}

	getFavorites() {
		let payload = {
			header: {
				apiToken: this.props.user.authorization
			},
			params:{},
		}
		this.props.get_favorites(payload,
			() => {},
			(err) => {
				console.log(err)
			}
		)
	}

	toggleFavorite(payload){
		if (payload.wishlisted == 1) {
			this.setState({selectedProduct: payload},() => {
				this.setModalVisible('alertDialog',true);
			});
		}
		else {
			let data = {
				request: {
					header: {
						apiToken: this.props.user.authorization
					},
					body: {
						product_code: payload.code
					}
				},
				favorite: payload
			}
			this.props.add_favorite(data,
				() => {},
				(err) => {
					console.log(err)
				}
			)
		}
	}

	handleLoadMore(){
		// let payload = {
		// 	header: {
		// 		apiToken: this.props.user.authorization
		// 	},
		// 	params:{},
		// }
		// this.props.get_favorites(payload,
		// 	() => {},
		// 	(err) => {
		// 		console.log(err)
		// 	}
		// )
	}

	setModalVisible(type,value){
        let modalVisible = this.state.modalVisible;
        modalVisible[type] = value;
		this.setState({modalVisible});
	}
	
	openDetailProduct(payload){
		this.props.detail_product(payload);
		this.setModalVisible('openProduct',true);
	}
	
	closeDetailProduct(){
		this.setModalVisible('openProduct',false);
	}

	changeTotalItem(payload,type){
		this.props.change_total(payload,type);
	}

	clearProductConfirmation(){
		let data = {
			request: {
				header: {
					apiToken: this.props.user.authorization
				},
				body: {}
			},
			favorite: this.state.selectedProduct
		}
		this.props.delete_favorite(data,
			() => {
				this.setModalVisible('alertDialog',false);
				this.setModalVisible('openProduct',false);
			},
			(err) => {
				console.log(err)
			}
		)
		
	}

	clearProductCancelation(){
		this.setModalVisible('alertDialog',false);
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

	navigateToCart(){
		actNav.navigate(navConstant.Cart,{
			createOrderHandler: this.createOrderHandler
		});
	}

	createOrderHandler(invoice){
		actNav.goBackToTop();
		this.navigateToDetail(invoice);
	}

	navigateToDetail(input) {
		let payload = {
			header: {
				apiToken: this.props.user.authorization,
			},
			invoice: input
		}
		this.refreshHandler();
		this.props.detail_transaction(payload,
			() => {
				actNav.navigate(navConstant.Detail,{
					action: 'history',
					createOrderSuccess: true,
				});
			},
			(err) => {
				console.log(err)
			}
		)
	}

	render(){
		return (
			<Container
				bgColorBottom={'veryLightGrey'}
				bgColorTop={'red'}
			>
				<NavigationBar 
					title={'favourites.navigationTitle'}
				/>
				<View style={styles.container}>
					<View style={styles.cartContainer}>
						<FlatList
							data={this.props.wishlist}
							onEndReachedThreshold={0.05}
							onRefresh={this.refreshHandler}
							refreshing={this.state.refreshing}
							onEndReached={this.handleLoadMore}
							keyExtractor={(item,index) => index.toString()}
							renderItem={({item,index}) => (
								<ProductItem
									key={index}
									data={item}
									type={'favorites'}
									index={index+1}
									user={this.props.user}
									toggleFavorite={this.toggleFavorite}
									changeTotalItem={this.changeTotalItem}
									productLength={this.props.wishlist.length}
									openDetailProduct={this.openDetailProduct}
								/>
							)}
						/>
					</View>
					<Checkout
						totalCount={this.props.total_count}
						totalPrice={this.props.total_price}
						validateCart={this.validateCart}
					/>
				</View>
				<ProductDetail
					type={'favorites'}
					user={this.props.user}
					data={this.props.productDetail}
					changeTotalItem={this.changeTotalItem}
					toggleFavorite={this.toggleFavorite}
					closeDetailProduct={this.closeDetailProduct}
					modalVisible={this.state.modalVisible.openProduct}
				/>
				<ModalLoginConfirmation
					onPress={this.navigateToSignIn} 
					modalVisible={this.state.modalVisible.modalLoginConfirmation}
				/>
				<AlertDialog
					modalVisible={this.state.modalVisible.alertDialog} 
					content={'dialog.clearFavorite'}
					params={{
						item: this.state.selectedProduct == null ? '' : this.state.selectedProduct.name
					}}
					requestHandler={this.clearProductConfirmation}
					requestCancel={this.clearProductCancelation}
				/>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user.data,
	product: state.product.products,
	productDetail: state.product.detail,
	total_price: state.product.total.price,
	total_count: state.product.total.count,
	index_product: state.product.cart.index,
	cart_product: state.product.cart.products,
	wishlist: state.product.wishlist.products,
});

const mapDispatchToProps = dispatch => ({
	detail_product : (index) => dispatch(actions.product.reducer.detail_product(index)),
	toggle_favorite: (index) => dispatch(actions.product.reducer.toggle_favorite(index)),
	get_products : (req,res,err) => dispatch(actions.product.api.get_products(req,res,err)),
	get_favorites: (req,res,err) => dispatch(actions.product.api.get_favorites(req,res,err)),
	set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
	change_total : (payload,type) => dispatch(actions.product.reducer.change_total(payload,type)),
	bulk_add_products: (req,res,err) => dispatch(actions.transaction.api.bulk_add_products(req,res,err)),
	detail_transaction: (req,res,err) => dispatch(actions.transaction.api.detail_transaction(req,res,err)),
	add_favorite: (req,res,err) => dispatch(actions.product.api.add_favorite(req,res,err)),
	delete_favorite: (req,res,err) => dispatch(actions.product.api.delete_favorite(req,res,err)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Favourites);