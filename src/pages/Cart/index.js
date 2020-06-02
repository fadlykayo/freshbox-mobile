import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Dimensions } from 'react-native';
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

const { width, height } = Dimensions.get('window');

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			totalPrice: 0,
			search: false,
			scrollX: 0,
			bubble: 0,
			modalVisible: {
				openProduct: false,
				alertDialog: false,
				modalLoginConfirmation: false,
				openImageDetail: false,
			},
			selectedProduct: null,
		}
		this.changeTotalItem = this.changeTotalItem.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);
		this.navigateToSignIn = this.navigateToSignIn.bind(this);
		this.navigateBack = this.navigateBack.bind(this);
		this.navigateToProduct = this.navigateToProduct.bind(this);
		this.openDetailProduct = this.openDetailProduct.bind(this);
		this.closeDetailProduct = this.closeDetailProduct.bind(this);
		this.navigateToCheckout = this.navigateToCheckout.bind(this);
		this.clearProductConfirmation = this.clearProductConfirmation.bind(this);
		this.clearProductCancelation = this.clearProductCancelation.bind(this);
		this.getPositionIndex = this.getPositionIndex.bind(this);
		this.getPositionBubble = this.getPositionBubble.bind(this);
		this.openZoomImage = this.openZoomImage.bind(this);
		this.closeZoomImage = this.closeZoomImage.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);
	}

	shouldComponentUpdate(nextProps) {
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

	navigateToProduct() {
		this.props.remove_empty_items();
		actNav.reset(navConstant.Product)
	}

	navigateBack() {
		this.props.remove_empty_items();
		actNav.goBack()
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
		if(payload.count == 1 && type == 'desc'){
			this.setState({selectedProduct: payload},() => {
				this.setModalVisible('alertDialog',true);
			});
		}
		else{
			this.props.change_total(payload,type);
		}
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
			this.props.remove_empty_items();
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

	render(){
		return (
			<Container
				bgColorBottom={'veryLightGrey'}
				bgColorTop={'red'}
			>
				<NavigationBar 
					title={'cart.navigationTitle'}
					onPress={this.props.navigation.state.params.action == 'history' ? this.navigateToProduct : this.navigateBack}
				/>
				<View style={styles.container}>
					<View style={{flex: 1}}>
						<FlatList
							data={this.props.cart_product}
							keyExtractor={(item,index) => index.toString()}
							renderItem={({item,index}) => (
								<ProductItem
									search={this.state.search}
									key={index}
									data={item}
									type={'cart'}
									index={index+1}
									user={this.props.user}
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
					type={'cart'}
					user={this.props.user}
					data={this.props.productDetail}
					changeTotalItem={this.changeTotalItem}
					closeDetailProduct={this.closeDetailProduct}
					modalVisible={this.state.modalVisible.openProduct}
					getPositionBubble={this.getPositionBubble}
					getPositionIndex={this.getPositionIndex}
					openZoomImage={this.openZoomImage}
					closeZoomImage={this.closeZoomImage}
					bubble={this.state.bubble}
					scrollX={this.state.scrollX}
					openImageDetail={this.state.modalVisible.openImageDetail}
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
});

const mapDispatchToProps = dispatch => ({
	detail_product : (index) => dispatch(actions.product.reducer.detail_product(index)),
	toggle_favorite: (index) => dispatch(actions.product.reducer.toggle_favorite(index)),
	get_products : (req,res,err) => dispatch(actions.product.api.get_products(req,res,err)),
	set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
	change_total : (payload,type) => dispatch(actions.product.reducer.change_total(payload,type)),
	bulk_add_products: (req,res,err) => dispatch(actions.transaction.api.bulk_add_products(req,res,err)),
	remove_empty_items: () => dispatch(actions.product.reducer.remove_empty_items()),
});

export default connect(mapStateToProps,mapDispatchToProps)(Cart);