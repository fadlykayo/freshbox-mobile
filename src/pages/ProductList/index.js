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
			data: [{
				id: 1,
				image: images.icon_sayur_segar,
				title: "Wortel",
				category: "Sayur Segar",
				price: 21000,
				favorite: false,
				count: 0,
				stock: 5,
				description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima unde ad tempore sunt illum, ut sit laudantium cumque debitis beatae labore nulla inventore quam eos et quasi quae distinctio laboriosam?`
			},
			{
				id: 2,
				image: images.icon_sayur_segar,
				title: "Apel",
				category: "Buah",
				price: 19000,
				favorite: false,
				count: 0,
				stock: 5,
				description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima unde ad tempore sunt illum, ut sit laudantium cumque debitis beatae labore nulla inventore quam eos et quasi quae distinctio laboriosam?`
			},
			{
				id: 3,
				image: images.icon_sayur_segar,
				title: "Belimbing",
				category: "Buah",
				price: 20000,
				favorite: false,
				count: 0,
				stock: 5,
				description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima unde ad tempore sunt illum, ut sit laudantium cumque debitis beatae labore nulla inventore quam eos et quasi quae distinctio laboriosam?`
			}
			,{
				id: 4,
				image: images.icon_sayur_segar,
				title: "Mangga",
				category: "Buah",
				price: 15000,
				favorite: false,
				count: 0,
				stock: 5,
				description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima unde ad tempore sunt illum, ut sit laudantium cumque debitis beatae labore nulla inventore quam eos et quasi quae distinctio laboriosam?`
			},
			{
				id: 5,
				image: images.icon_sayur_segar,
				title: "Sawi",
				category: "Sayur Segar",
				price: 14000,
				favorite: false,
				count: 0,
				stock: 5,
				description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima unde ad tempore sunt illum, ut sit laudantium cumque debitis beatae labore nulla inventore quam eos et quasi quae distinctio laboriosam?`
			},
			{
				id: 6,
				image: images.icon_sayur_segar,
				title: "Belimbing",
				category: "Buah",
				price: 21000,
				favorite: false,
				count: 0,
				stock: 5,
				description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima unde ad tempore sunt illum, ut sit laudantium cumque debitis beatae labore nulla inventore quam eos et quasi quae distinctio laboriosam?`
			}
			,{
				id: 7,
				image: images.icon_sayur_segar,
				title: "Duren",
				category: "buah",
				price: 25000,
				favorite: false,
				count: 0,
				stock: 5,
				description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima unde ad tempore sunt illum, ut sit laudantium cumque debitis beatae labore nulla inventore quam eos et quasi quae distinctio laboriosam?`
			},
			{
				id: 8,
				image: images.icon_sayur_segar,
				title: "sawi",
				category: "sayur segar",
				price: 21000,
				favorite: false,
				count: 0,
				stock: 5,
				description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima unde ad tempore sunt illum, ut sit laudantium cumque debitis beatae labore nulla inventore quam eos et quasi quae distinctio laboriosam?`
			}],
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
		this.countTotalPrice = this.countTotalPrice.bind(this);
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
	}

	componentDidMount() {
		let payload = {
			header: {},
			body: {}
		}
		this.props.get_products(payload, null,
			(err) => {
				console.log(err)
			});
		this.countTotalPrice();
		this.checkCategory();
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
		let data = this.state.data;
		let detail = data[index];
		this.onChangeText('indexProduct', index)
		this.onChangeText('detailDataProduct', detail)
		this.setModalVisible('openProduct',true);
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
		let data = this.state.data.slice();
		data[index].favorite = !data[index].favorite;
		this.setState({data});
	}

	countTotalPrice(payload){
		let data = payload ? payload : this.state.data;
		let state = this.state;
		let total = 0;
		let count = 0;
		for(i=0; i<data.length; i++){
			total = total + (data[i].price * data[i].count);
			count = count + data[i].count;
		}
		state.totalCount = count;
		state.totalPrice = total;
		state.data = data;
		this.setState(state);
	}

	changeTotalItem(index,type){
		let data = this.state.data.slice();
		if (type == "inc") {
			data[index].count += 1;
		}
		else {
			data[index].count -= 1;
		}
		this.countTotalPrice(data);
	}

	onChangeText(type, value){
        let user = this.state;
        user[type] = value;
        this.setState({user});
	}
	
	submitSearch() {
		alert(`MASUK, ${this.state.searchItem}`);
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
							on
						/>

						<Checkout
							totalCount = { this.state.totalCount }
							totalPrice = { this.state.totalPrice }
						/>
					</View>
				</View>
				
				<DetailProduct
					indexProduct={this.state.indexProduct}
					toggleFavorite={this.toggleFavorite}
					detailDataProduct={this.state.detailDataProduct}
				    modalVisible={this.state.modalVisible.openProduct}
					closeDetailProduct={this.closeDetailProduct}
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
		loading: state.product.loadingProducts,
		product: state.product.products,
		error: state.product.errorProducts,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		// forgot_password: (req, success, failure) => dispatch(actions.auth.api.forgot_password(req, success, failure))
		get_products : (req, success, failure) => dispatch(actions.product.api.get_products(req, success, failure))
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps)(ProductList);