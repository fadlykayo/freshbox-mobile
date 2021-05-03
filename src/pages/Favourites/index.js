import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Keyboard, Dimensions } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import AlertDialog from '@components/AlertDialog'; 
import ProductItem from '@components/ProductItem';
import ProductDetail from '@components/ProductDetail';
import NavigationBar from '@components/NavigationBar';
import Checkout from './components/Checkout';
import EmptyState from '@components/EmptyState'
import ModalLoginConfirmation from './components/ModalLoginConfirmation';
import { language, onShare } from '@helpers';
import styles from './styles';
import actions from '@actions';
import images from '@assets';

const { width, height } = Dimensions.get('window');

class Favourites extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			totalPrice: 0,
			search: false,
			scrollX: 0,
			bubble: 0,
			refreshing: false,
			modalVisible: {
				openProduct: false,
				alertDialog: false,
				modalLoginConfirmation: false,
				openImageDetail: false,
			},
			selectedProduct: null,
		}
		this.getFavorites = this.getFavorites.bind(this);
		this.validateCart = this.validateCart.bind(this);
		this.toggleFavorite = this.toggleFavorite.bind(this);
		this.refreshHandler = this.refreshHandler.bind(this);
		this.changeTotalItem = this.changeTotalItem.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);
		this.openDetailProduct = this.openDetailProduct.bind(this);
		this.createOrderHandler = this.createOrderHandler.bind(this);
		this.closeDetailProduct = this.closeDetailProduct.bind(this);
		this.clearProductCancelation = this.clearProductCancelation.bind(this);
		this.clearProductConfirmation = this.clearProductConfirmation.bind(this);
		this.getPositionIndex = this.getPositionIndex.bind(this);
		this.getPositionBubble = this.getPositionBubble.bind(this);
		this.openZoomImage = this.openZoomImage.bind(this);
		this.closeZoomImage = this.closeZoomImage.bind(this);
	}

	componentDidMount() {
		this.getFavorites();
	}

	componentWillUnmount() {
		if(this.props.navigation.state.params.closeDrawer) {
			this.props.navigation.state.params.closeDrawer();
		}
	}

	openDrawerMenu = () => {
        
		Keyboard.dismiss();
		this.props.navigation.openDrawer();
	}

	openZoomImage(){
		this.setModalVisible('openImageDetail',true);
	}

	closeZoomImage(){
		this.setModalVisible('openImageDetail',false);
	}

	getPositionIndex(e) {
        this.setState({ scrollX: e.nativeEvent.contentOffset.x }, () => {
            this.getPositionBubble();
        })
    }
    
    getPositionBubble() {
        let position = Math.round(this.state.scrollX/(width* 0.18));

        if (this.state.bubble != position) {
            this.setState({ bubble: position })
        }
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
			() => {
				this.setState({refreshing: false})
			},
			(err) => {}
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
				(err) => {}
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
		if(this.props.setModalVisible) {
			this.props.set_modal_visible(!this.props.setModalVisible)
		  }
		this.setModalVisible('openProduct',false);
	}

	changeTotalItem(payload,type){
		if (payload.count === payload.stock && type === 'inc') {
      this.props.set_error_status({
        status: true,
        title: 'formError.title.outOfStock',
        data: `${payload.name} hanya tersedia ${payload.stock} ${payload.unit}`,
      });
    } else {
      this.props.change_total(payload, type);
	  this.storeCart(payload, type)
    }
	}

	storeCart = (cart, type) => {
		const branchID = this.props.selectedBranch.id
		if(this.props.user){
		  let buyProducts = {
			product_code: cart.code,
			qty: 1,
			status_promo: cart.on_promo,
			cart_price: cart.price,
			cart_promo_price:
			  Number(cart.on_promo) === 1
				? cart.banner_harga_jual
				  ? cart.banner_harga_jual
				  : cart.promo_price
				: cart.promo_price,
			remaining_quota:
			  Number(cart.on_promo) === 1
				? Number(cart.quota_claim) > 0
				  ? Number(cart.quota_claim) -
					Number(cart.total_claim_product || 0)
				  : 0
				: 0,
			quota_claim: Number(cart.quota_claim || 0),
			type: type,
			branch_id: branchID
		  };
			let payload = {
			  header: {
				apiToken: this.props.user.authorization,
			  },
			  body: buyProducts,
			};
	
			this.props.post_cart(
			  payload,
			  (res) => {
				// this.getCart()
			  },
			  (err) => {},
			);
		  } 
	  }

	  getCart = () => {
		if(this.props.user) {
		  let payload = {
			header: {
			  apiToken: this.props.user ? this.props.user.authorization : '',
			},
			params: '',
		  };
		  this.props.get_cart(payload)
		}
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
			(err) => {}
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
		// else{
			this.navigateToCart();
		// }
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
			(err) => {}
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
					menubar
					openDrawer={this.openDrawerMenu}
				/>
				<View style={styles.container}>
					<View style={styles.subcontainer.cart}>

						{
							this.props.wishlist.length == 0 ? 
							
							<EmptyState
								image={images.empty_favorite}
								property='emptyState.favorites'
							/> :
							<FlatList
								data={this.props.wishlist}
								onRefresh={this.refreshHandler}
								refreshing={this.state.refreshing}
								keyExtractor={(item,index) => index.toString()}
								renderItem={({item,index}) => (
									<ProductItem
										search={this.state.search}
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

						}
						
						
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
					modalVisible={this.state.modalVisible.openProduct || this.props.setModalVisible}
					getPositionBubble={this.getPositionBubble}
					getPositionIndex={this.getPositionIndex}
					openZoomImage={this.openZoomImage}
					closeZoomImage={this.closeZoomImage}
					bubble={this.state.bubble}
					scrollX={this.state.scrollX}
					openImageDetail={this.state.modalVisible.openImageDetail}
					onShare={onShare}
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
	setModalVisible: state.product.setModalVisible,
	selectedBranch: state.utility.selectedBranch,
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
	set_modal_visible: (payload) => dispatch(actions.product.reducer.set_modal_visible(payload)),
	post_cart: (req, res, err) => dispatch(actions.product.api.post_cart(req, res, err)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Favourites);