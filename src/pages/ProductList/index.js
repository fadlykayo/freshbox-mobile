import React, { Component } from 'react';
import { View, FlatList, Keyboard } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Checkout from './components/Checkout';
import ProductItem from '@components/ProductItem';
import ProductDetail from '@components/ProductDetail';
import Container from '@components/Container';
import SearchComponent from './components/SearchComponent';
import FilterComponent from './components/FilterComponent';
import Categories from './components/Categories';
import styles from './styles';
import { connect } from 'react-redux';
import actions from '@actions';

class ProductList extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			searchItem: '',
			onCategory: '',
			indexProduct: 0,
			detailDataProduct: {},
			modalVisible: {
				openCategories: false,
				openProduct: false,
			},
		}
		this.onChangeText = this.onChangeText.bind(this);
		this.submitSearch=this.submitSearch.bind(this);
		this.checkCategory=this.checkCategory.bind(this);
		this.toggleFavorite=this.toggleFavorite.bind(this);
		this.changeCategory=this.changeCategory.bind(this);
		this.openDrawerMenu=this.openDrawerMenu.bind(this);
		this.handleLoadMore=this.handleLoadMore.bind(this);
		this.setModalVisible=this.setModalVisible.bind(this);
		this.changeTotalItem=this.changeTotalItem.bind(this);
		this.openAllCategories=this.openAllCategories.bind(this);
		this.openDetailProduct=this.openDetailProduct.bind(this);
		this.closeDetailProduct=this.closeDetailProduct.bind(this);
		this.closeDialogCategories=this.closeDialogCategories.bind(this);
		this.navigateToCart = this.navigateToCart.bind(this);
	}

	componentDidMount(){
		this.getProductList();
		this.getCategories();
		this.checkCategory();
	}

	getProductList(){
		let payload = {
			header: {},
			params: this.props.params
		}
		this.props.get_products(payload,
			(res) => {
			},
			(err) => {
				console.log(err)
			}
		);
	}

	getCategories() {
		let payload = {
			header: {},
			params: {}
		}
		this.props.get_categories(payload,
			(res) => {
			},
			(err) => {
				console.log(err)
			}
		);
	}

	handleLoadMore(){
		if(this.props.current_page <= this.props.last_page) {
			let payload = {
				header: {},
				body: {},
				params: this.props.params
			}
			this.props.get_products(payload, null,
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

	changeCategory(input){
		if (input.name == 'Default') {
			let payload = {
				header: {},
				body: {},
				params: {
					page: 1,
					stock: 'tersedia'
				}
			}

			this.props.search_products(payload, 
				(success) => {
					this.props.change_categories(input);
					this.checkCategory();
					this.closeDialogCategories();
				},
				(err) => {
					console.log(err)
				});
		}
		else {
			let payload = {
				header: {},
				body: {},
				params: {
					stock: 'tersedia',
					category_id: input.id,
					page: 1,
				}
			}

			this.props.search_products(payload, 
				(success) => {
					this.props.change_categories(input);
					this.checkCategory();
					this.closeDialogCategories();
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

	setModalVisible(type,value){
        let modalVisible = JSON.parse(JSON.stringify(this.state.modalVisible));
        modalVisible[type] = value;
        this.setState({modalVisible});
    }

	closeDialogCategories(){
		this.setModalVisible('openCategories',false);
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


	onChangeText(type,value){
        let state = this.state;
        state[type] = value;
        this.setState(state);
	}
	
	submitSearch() {
		let payload={
			header: {},
			body: {},
			params: {
				name: this.state.searchItem,
				stock: 'tersedia',
				page: 1,
			}
		}

		this.props.search_products(payload, 
			(success) => {
				console.log(success)
			},
			(err) => {
				console.log(err)
			});
	}

	openDrawerMenu() {
		Keyboard.dismiss();
		this.props.navigation.openDrawer();
	}

	navigateToCart(){
		actNav.navigate(navConstant.Cart);
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
				/>
				<FilterComponent 
					onCategory = {this.props.on_category}
					openAllCategories={this.openAllCategories}
				/>
				<View style={styles.container}>
					<View style={styles.cartContainer}>
						<FlatList
							data={this.props.product}
							keyExtractor={(item,index) => index.toString()}
							renderItem={({item,index}) => (
								<ProductItem
									key={index}
									data={item}
									index={index+1}
									user={this.props.user}
									toggleFavorite={this.toggleFavorite}
									changeTotalItem={this.changeTotalItem}
									productLength={this.props.product.length}
									openDetailProduct= {this.openDetailProduct}
								/>
							)}
							onEndReached={this.handleLoadMore}
							onEndReachedThreshold={0.5}
						/>
						{ 
							this.props.total_count > 0 
							? 	<Checkout
									totalCount={this.props.total_count}
									totalPrice={this.props.total_price}
									onPress={this.navigateToCart}
								/>
							: 	null
						}
					</View>
				</View>
				<ProductDetail
					user={this.props.user}
					data={this.props.productDetail}
					toggleFavorite={this.toggleFavorite}
					changeTotalItem={this.changeTotalItem}
					closeDetailProduct={this.closeDetailProduct}
				    modalVisible={this.state.modalVisible.openProduct}
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
	get_categories: (req,res,err) => dispatch(actions.product.api.get_categories(req,res,err)),
	get_products : (req,res,err) => dispatch(actions.product.api.get_products(req,res,err)),
	search_products: (req,res,err) => dispatch(actions.product.api.search_products(req,res,err)),
	change_total : (index, type) => dispatch(actions.product.reducer.change_total(index, type)),
	change_categories: (payload) => dispatch(actions.product.reducer.change_categories(payload)),
	toggle_favorite: (index) => dispatch(actions.product.reducer.toggle_favorite(index)),
	detail_product : (index) => dispatch(actions.product.reducer.detail_product(index)),
})

export default connect(mapStateToProps,mapDispatchToProps)(ProductList);