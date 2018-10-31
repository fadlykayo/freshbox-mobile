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
			modalVisible: {
				openProduct: false,
				alertDialog: false,
				modalLoginConfirmation: false,
			},
			selectedProduct: null,
		}
		this.changeTotalItem = this.changeTotalItem.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);
		this.navigateToSignIn = this.navigateToSignIn.bind(this);
		this.openDetailProduct = this.openDetailProduct.bind(this);
		this.closeDetailProduct = this.closeDetailProduct.bind(this);
		this.navigateToCheckout = this.navigateToCheckout.bind(this);
		this.clearProductConfirmation = this.clearProductConfirmation.bind(this);
		this.clearProductCancelation = this.clearProductCancelation.bind(this);
		this.getFavorites = this.getFavorites.bind(this);
		this.validateCart = this.validateCart.bind(this);
		this.toggleFavorite = this.toggleFavorite.bind(this);
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

	toggleFavorite(payload){
		if (payload.wishlisted == 1) {
			let data = {
				request: {
					header: {
						apiToken: this.props.user.authorization
					},
					body: {}
				},
				favorite: payload
			}
			this.props.delete_favorite(data,
				() => {},
				(err) => {
					console.log(err)
				}
			)
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
		this.props.change_total_favorites(payload,type);
	}

	clearProductConfirmation(){
		this.props.change_total(this.state.selectedProduct,'desc');
		this.setModalVisible('alertDialog',false);
		this.setModalVisible('openProduct',false);
	}

	clearProductCancelation(){
		this.setModalVisible('alertDialog',false);
	}

	

	navigateToCheckout(){
		if(this.props.cart_product.length == 0){
			language.transformText('message.emptyCart')
			.then(message => {
				this.props.set_error_status({
					status: true,
					title: 'formError.title.emptyCart',
					data: message,
				});
			});
		}
		else {
			let buyProducts = [];
			this.props.cart_product.map((cart) => {
				buyProducts.push({
					product_code: cart.code,
					qty: cart.count,
				});
			});
			if(this.props.user){
				let payload = {
					header: {
						apiToken: this.props.user.authorization
					},
					body: buyProducts
				};

				this.props.bulk_add_products(payload,
					(res) => {
						actNav.navigate(navConstant.Checkout,{
							key: this.props.navigation.state.key,
							createOrderHandler: this.props.navigation.state.params.createOrderHandler
						});
					},
					(err) => {}
				)
			}
			else {
				this.setModalVisible('modalLoginConfirmation',true);
			}
		}
	}

	navigateToSignIn(){
		this.setModalVisible('modalLoginConfirmation',false);
		actNav.navigate(navConstant.SignIn,{
			action: 'guestLogin'
		});
	};

	getFavorites() {
		let payload = {
			header: {
				apiToken: this.props.user.authorization
			}
		}
		this.props.get_favorites(payload,
			(success) => {
			},
			(err) => {
				console.log(err)
			})
	}

	componentDidMount() {
		this.getFavorites();
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
							keyExtractor={(item,index) => index.toString()}
							renderItem={({item,index}) => (
								<ProductItem
									key={index}
									data={item}
									type={'favorites'}
									index={index+1}
									user={this.props.user}
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
					type={'cart'}
					user={this.props.user}
					data={this.props.productDetail}
					changeTotalItem={this.changeTotalItem}
					closeDetailProduct={this.closeDetailProduct}
					modalVisible={this.state.modalVisible.openProduct}
				/>
				<ModalLoginConfirmation
					onPress={this.navigateToSignIn} 
					modalVisible={this.state.modalVisible.modalLoginConfirmation}
				/>
				<AlertDialog
					modalVisible={this.state.modalVisible.alertDialog} 
					content={'dialog.clearProduct'}
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
	set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
	change_total_favorites: (payload,type) => dispatch(actions.product.reducer.change_total_favorites(payload,type)),
	bulk_add_products: (req,res,err) => dispatch(actions.transaction.api.bulk_add_products(req,res,err)),
	get_favorites: (req,res,err) => dispatch(actions.product.api.get_favorites(req,res,err))
});

export default connect(mapStateToProps,mapDispatchToProps)(Favourites);