import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Keyboard, TouchableOpacity, Dimensions } from 'react-native';
import { language } from '@helpers'
import { actNav, navConstant } from '@navigations';
import Checkout from './components/Checkout';
import ProductItem from '@components/ProductItem';
import ProductDetail from '@components/ProductDetail';
import Container from '@components/Container';
import StaticText from '@components/StaticText';
import SearchComponent from './components/SearchComponent';
import FilterComponent from './components/FilterComponent';
import Notes from './components/Notes';
import Categories from './components/Categories';
import styles from './styles';
import actions from '@actions';

const { width, height } = Dimensions.get('window');

class ProductList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			searchItem: '',
			search: false,
			onCategory: '',
			indexProduct: 0,
			scrollX: 0,
			bubble: 0,
			detailDataProduct:{},
			modalVisible: {
				openCategories: false,
				openProduct: false,
			},
		};
		this.listRef = null;
		this.scrollRef = null;
		this.submitSearch = this.submitSearch.bind(this);
		this.onChangeText  =  this.onChangeText.bind(this);
		this.checkCategory = this.checkCategory.bind(this);
		this.validateCart  =  this.validateCart.bind(this);
		this.refreshHandler = this.refreshHandler.bind(this);
		this.toggleFavorite = this.toggleFavorite.bind(this);
		this.changeCategory = this.changeCategory.bind(this);
		this.openDrawerMenu = this.openDrawerMenu.bind(this);
		this.handleLoadMore = this.handleLoadMore.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);
		this.changeTotalItem = this.changeTotalItem.bind(this);
		this.navigateToCart = this.navigateToCart.bind(this);
		this.openAllCategories = this.openAllCategories.bind(this);
		this.openDetailProduct = this.openDetailProduct.bind(this);
		this.createOrderHandler = this.createOrderHandler.bind(this);
		this.closeDetailProduct = this.closeDetailProduct.bind(this);
		this.closeDialogCategories = this.closeDialogCategories.bind(this);
		this.getFavorites = this.getFavorites.bind(this);
		this._renderButton = this._renderButton.bind(this);
		this.backToDefault = this.backToDefault.bind(this);
		this.backToTop = this.backToTop.bind(this);
		this.getPositionIndex = this.getPositionIndex.bind(this);
		this.getPositionBubble = this.getPositionBubble.bind(this);
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

	componentDidMount(){
		this.getProductList();
		this.getCategories();
		this.checkCategory();
		this.getFavorites();
	}

	_renderButton() {
		if(this.state.search) {
			return (
			<TouchableOpacity style={styles.clear.button} onPress={this.backToDefault}>
				<StaticText
					style={styles.clear.text}
					property={'productList.button.clear'}
				/>
			</TouchableOpacity>
			)
		}
		else return null
	}

	backToDefault() {
		this.clearSearch();
		this.refreshHandler();
	}

	onChangeText(type,value){
        let state = JSON.parse(JSON.stringify(this.state));
        state[type] = value;
        this.setState(state);
	}

	clearSearch() {
		this.onChangeText('searchItem', '');
	}

	setModalVisible(type,value){
        let modalVisible = JSON.parse(JSON.stringify(this.state.modalVisible));
        modalVisible[type] = value;
        this.setState({modalVisible});
    }

	refreshHandler(){
		this.setState({refreshing: true},() => {
			if (this.state.search) this.onChangeText('search', false)
			this.getProductList();
		});
	}

	getProductList(){
		let payload = {
			header: {
				apiToken: this.props.user ? this.props.user.authorization : ''
			},
			params: {
				sort: 'nama-az',
				stock: 'tersedia'
			},
		}
		this.props.get_products(payload,
			() => {
				if(this.state.refreshing != false) this.setState({refreshing: false});
			},
			(err) => {
				console.log(err)
			}
		);
	}

	getFavorites() {
		if (this.props.user) {
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
	}

	getCategories(){
		let payload = {
			header: {},
			params: {}
		}
		this.props.get_categories(payload,
			() => {},
			(err) => {
				console.log(err)
			}
		);
	}

	handleLoadMore(){
		if(this.props.current_page <= this.props.last_page) {
			let payload = {
				header: {
					apiToken: this.props.user ? this.props.user.authorization : ''
				},
				body: {},
				params: this.props.params
			}
			this.props.get_products(payload,
				() => {},
				(err) => {
					console.log(err);
				});
		}
	}

	checkCategory(){
		let categories = this.props.categories;
		let category = '';
		for (let i = 0; i < categories.length; i++) {
			if(categories[i].check === true) {
				category = categories[i].name;
			}
		}
		this.onChangeText('onCategory',category);
	} 

	backToTop() {
		this.listRef.scrollToOffset({y:0, animated: true})
	}

	changeCategory(input){
		this.onChangeText('searchItem', '')
		if (input.name == 'Default') {
			let payload = {
				header: {
					apiToken: this.props.user ? this.props.user.authorization : ''
				},
				body: {},
				params: {
					page: 1,
					sort: 'nama-az',
					stock: 'tersedia'
				}
			}

			this.props.search_products(payload, 
				() => {
					this.props.change_categories(input);
					this.checkCategory();
					this.closeDialogCategories();
					this.backToTop();
				},
				(err) => {
					console.log(err)
				});
		}
		else {
			let payload = {
				header: {
					apiToken: this.props.user ? this.props.user.authorization : ''
				},
				body: {},
				params: {
					page: 1,
					sort: 'nama-az',
					stock: 'tersedia',
					category_code: input.code,
				}
			}

			this.props.search_products(payload, 
				() => {
					this.props.change_categories(input);
					this.checkCategory();
					this.closeDialogCategories();
					this.backToTop();
				},
				(err) => {
					console.log(err)
				});
		}		
	}
	
	openAllCategories(){
		Keyboard.dismiss();
		this.setModalVisible('openCategories',true);
 	}

	openDetailProduct(payload){
		this.props.detail_product(payload);
		this.setModalVisible('openProduct',true);
	}

	closeDialogCategories(){
		this.setModalVisible('openCategories',false);
	}

	closeDetailProduct(){
		this.setModalVisible('openProduct',false);
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

	changeTotalItem(payload,type){
		this.props.change_total(payload,type);
	}
	
	submitSearch() {
		let payload={
			header: {
				apiToken: this.props.user ? this.props.user.authorization : ''
			},
			body: {},
			params: {
				page: 1,
				stock: 'tersedia',
				sort: 'nama-az',
				name: this.state.searchItem,
			}
		}

		this.props.search_products(payload, 
			(success) => {
				this.onChangeText('search', true)
				// this.backToTop();
			},
			(err) => {
				console.log(err)
			});
	}

	openDrawerMenu(){
		Keyboard.dismiss();
		this.props.navigation.openDrawer();
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
				<SearchComponent
					type={'searchItem'}
					title={'productList.searchPlaceHolder'}
					value={this.state.searchItem}
					onChangeText={this.onChangeText}
					onSubmitEditing={this.submitSearch}
					openDrawerMenu={this.openDrawerMenu}
					clearSearch={this.clearSearch}
				/>
				<FilterComponent 
					onCategory={this.props.on_category}
					openAllCategories={this.openAllCategories}
				/>
				<Notes />
				<View style={styles.container}>
					<View style={styles.cartContainer}>
						{ this._renderButton() }
						<FlatList
							ref={(e) => { this.listRef = e}}
							data={this.props.product}
							onEndReachedThreshold={0.05}
							onRefresh={this.refreshHandler}
							refreshing={this.state.refreshing}
							keyExtractor={(item) => item.code}
							onEndReached={this.handleLoadMore}
							renderItem={({item,index}) => (
									<ProductItem
										key={index}
										data={item}
										index={index+1}
										type={'productList'}
										user={this.props.user}
										toggleFavorite={this.toggleFavorite}
										changeTotalItem={this.changeTotalItem}
										productLength={this.props.product.length}
										openDetailProduct= {this.openDetailProduct}
									/>
							)}
						/>
						<Checkout
							totalCount={this.props.total_count}
							totalPrice={this.props.total_price}
							validateCart={this.validateCart}
						/>
					</View>
				</View>
				<ProductDetail
					type={'productList'}
					user={this.props.user}
					data={this.props.productDetail}
					scrollX={this.state.scrollX}
					bubble={this.state.bubble}
					toggleFavorite={this.toggleFavorite}
					changeTotalItem={this.changeTotalItem}
					closeDetailProduct={this.closeDetailProduct}
					modalVisible={this.state.modalVisible.openProduct}
					getPositionIndex={this.getPositionIndex}
					getPositionBubble={this.getPositionBubble}
				/>
				<Categories
					changeCategory = {this.changeCategory}
					categories = {this.props.categories}
					modalVisible={this.state.modalVisible.openCategories}
					closeDialogCategories={this.closeDialogCategories}
					modalVisible={this.state.modalVisible.openCategories}
		  		/>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user.data,
	state: state.product,
	cart_product: state.product.cart.products,
	current_page: state.product.params.page,
	params: state.product.params,
	product: state.product.products,
	on_category: state.product.on_category,
	categories: state.product.categories,
	last_page: state.product.last_page,
	total_price: state.product.total.price,
	total_count: state.product.total.count,
	productDetail: state.product.detail,
})

const mapDispatchToProps = dispatch => ({
	detail_product : (index) => dispatch(actions.product.reducer.detail_product(index)),
	toggle_favorite: (index) => dispatch(actions.product.reducer.toggle_favorite(index)),
	add_favorite: (req,res,err) => dispatch(actions.product.api.add_favorite(req,res,err)),
	get_products : (req,res,err) => dispatch(actions.product.api.get_products(req,res,err)),
	change_total : (index,type) => dispatch(actions.product.reducer.change_total(index,type)),
	set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
	get_categories: (req,res,err) => dispatch(actions.product.api.get_categories(req,res,err)),
	search_products: (req,res,err) => dispatch(actions.product.api.search_products(req,res,err)),
	change_categories: (payload) => dispatch(actions.product.reducer.change_categories(payload)),
	delete_favorite: (req,res,err) => dispatch(actions.product.api.delete_favorite(req,res,err)),
	detail_transaction: (req,res,err) => dispatch(actions.transaction.api.detail_transaction(req,res,err)),
	get_favorites: (req,res,err) => dispatch(actions.product.api.get_favorites(req,res,err))
})

export default connect(mapStateToProps,mapDispatchToProps)(ProductList);