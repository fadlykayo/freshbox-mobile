import React, { Component } from 'react';
import { View, FlatList, Text, Button, Keyboard, TouchableOpacity, Image } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Checkout from './components/Checkout';
import CartComponent from './components/CartComponent';
import Container from '@components/Container';
import SearchComponent from './components/SearchComponent';
import FilterComponent from './components/FilterComponent';
import DetailProduct from './components/DetailProduct';
import Categories from './components/Categories';
import styles from './styles';
import images from '@assets';
import { connect } from 'react-redux';
import actions from '@actions';

class ProductList extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			categories: [
			{	
				id: 1,
				name: "All Categories",
				image: images.icon_buah_segar,
				check: true
			},
			{
				id: 2,
				name: "Sayur Segar",
				image: images.icon_sayur_segar,
				check: false
			},
			{
				id: 3,
				name: "Buah Segar",
				image: images.icon_buah_segar,
				check: false
			},
			{
				id: 4,
				name: "Umbi-umbian",
				image: images.icon_sayur_segar,
				check: false
			},
			{
				id: 5,
				name: "Bumbu",
				image: images.icon_buah_segar,
				check: false
			},
			{
				id: 6,
				name: "Lorem Ipsum",
				image: images.icon_sayur_segar,
				check: false
			},
			{
				id: 7,
				name: "Lorem Lorem Ipsum",
				image: images.icon_buah_segar,
				check: false
			},
			],
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
		this.submitSearch = this.submitSearch.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);
		this.closeDialogCategories = this.closeDialogCategories.bind(this);
		this.closeDetailProduct = this.closeDetailProduct.bind(this);
		this.openAllCategories = this.openAllCategories.bind(this);
		this.openDetailProduct = this.openDetailProduct.bind(this);
		this.checkCategory = this.checkCategory.bind(this);
		this.changeCategory = this.changeCategory.bind(this);
		this.openDrawerMenu = this.openDrawerMenu.bind(this);
		this.closeDrawerMenu = this.closeDrawerMenu.bind(this);
		this.handleLoadMore = this.handleLoadMore.bind(this);
		this.updateDetail = this.updateDetail.bind(this);
	}

	componentDidMount() {
		if(this.props.product.length == 0) {
			let payload = {
				header: {},
				body: {},
				params: {}
			}
			this.props.get_products(payload, null,
				(err) => {
					console.log(err)
				});
		}
		this.checkCategory();
	}

	handleLoadMore() {
		if( this.props.current_page <= this.props.last_page ) {
			let payload = {
				header: {},
				body: {},
				params: this.props.params
			}
			this.props.get_products(payload, null,
				(err) => {
					console.log(err)
				});
		}
	}

	checkCategory() {
		let categories = this.state.categories.slice();
		let category = '';
		for (let i = 0; i < categories.length; i++) {
			if(categories[i].check === true) {
				category = categories[i].name;
			}
		}
		this.onChangeText('onCategory', category)
	} 

	changeCategory(payload) {
		let categories = this.state.categories.slice();
		categories.map(item => {
			if(item.name == payload.name) item.check = true
			else item.check = false
			return item	
		})
		this.onChangeText('categories', categories)
		this.checkCategory();
		this.closeDialogCategories();
	}
	
	openAllCategories(){
		this.setModalVisible('openCategories',true);
 	}

	openDetailProduct(index){
		this.props.detail_product(index);
		this.setModalVisible('openProduct',true);
	}
	
	updateDetail(index) {
		this.props.detail_product(index);
	}

	setModalVisible(type,value){
        let modalVisible = this.state.modalVisible;
        modalVisible[type] = value;
        this.setState({modalVisible});
    }

	closeDialogCategories(){
		this.setModalVisible('openCategories',false);
	}

	closeDetailProduct(){
		this.setModalVisible('openProduct',false);
	}
	
	toggleFavorite(index){
		this.props.toggle_favorite(index)
	}

	changeTotalItem(index,type){
		this.props.change_total(index, type);
	}


	onChangeText(type, value){
        let user = this.state;
        user[type] = value;
        this.setState({user});
	}
	
	submitSearch() {
		let payload = {
			header: {},
			body: {},
			params: {
				name: this.state.searchItem,
				page: 1,
			}
		}
		this.props.search_products(payload, null,
			(err) => {
				console.log(err)
			});
	}

	openDrawerMenu() {
		this.props.navigation.openDrawer();
	}

	closeDrawerMenu() {
		this.props.navigation.closeDrawer();
	}

	render(){
		return (
			<Container>
				  <SearchComponent
					openDrawerMenu={this.openDrawerMenu}
					closeDrawerMenu={this.closeDrawerMenu}
					type={'searchItem'}
					title={'productList.searchPlaceHolder'}
					onChangeText={(type,value) => this.onChangeText(type,value)}
					onSubmitEditing={this.submitSearch}
				/>
				<FilterComponent 
					onCategory = {this.state.onCategory}
					openAllCategories = {this.openAllCategories}
					type={'searchItem'}
					onChangeText={(type,value) => this.onChangeText(type,value)}
					onSubmitEditing={this.submitSearch}
				/>
				<View style={styles.container}>
					<View style={styles.cartContainer}>
						<FlatList
							data={this.props.product}
							keyExtractor={(item) => String(item.id)}
							renderItem={({item,index}) => (
								<CartComponent
									openDetailProduct= {this.openDetailProduct}
									data = {item}
									index = {index} 
									toggleFavorite={this.toggleFavorite}
									changeTotalItem={this.changeTotalItem}
								/>
							)}
							onEndReached={this.handleLoadMore}
							onEndReachedThreshold={0.5}
						/>
						{ this.props.total_count > 0 ? (
							<Checkout
								totalCount = { this.props.total_count }
								totalPrice = { this.props.total_price }
							/>
						) : ( null ) }
						
					</View>
				</View>
				
				<DetailProduct
					index={this.props.indexProduct}
					data={this.props.product[this.props.indexProduct]}
					changeTotalItem={this.changeTotalItem}
					toggleFavorite={this.toggleFavorite}
				    modalVisible={this.state.modalVisible.openProduct}
					closeDetailProduct={this.closeDetailProduct}
					updateDetail={this.updateDetail}
				/>
				<Categories
					changeCategory = {this.changeCategory}
					categories = {this.state.categories}
					modalVisible={this.state.modalVisible.openCategories}
					closeDialogCategories={this.closeDialogCategories}
		  		/>
				
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		current_page: state.product.params.page,
		params: state.product.params,
		product: state.product.products,
		last_page: state.product.last_page,
		total_price: state.product.total.price,
		total_count: state.product.total.count,
		indexProduct: state.product.product.index,
		detailDataProduct: state.product.product.data,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_products : (req, success, failure) => dispatch(actions.product.api.get_products(req, success, failure)),
		search_products: (req, success, failure) => dispatch(actions.product.api.search_products(req, success, failure)),
		change_total : (index, type) => dispatch(actions.product.reducer.change_total(index, type)),
		toggle_favorite: (index) => dispatch(actions.product.reducer.toggle_favorite(index)),
		detail_product : (index) => dispatch(actions.product.reducer.detail_product(index))
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps)(ProductList);