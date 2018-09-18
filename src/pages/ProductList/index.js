import React, { Component } from 'react';
import { View, FlatList, Button, Keyboard } from 'react-native';
import { actNav, navConstant } from '@navigations';

import Checkout from './components/Checkout';
import CartComponent from './components/CartComponent';
import Container from '@components/Container';
import SearchComponent from './components/SearchComponent';
import FilterComponent from './components/FilterComponent';
import Categories from './components/Categories';
import styles from './styles';
import images from '@assets';


class ProductList extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			data: [{
				id: 1,
				image: images.icon_forgot_password,
				title: "Wortel",
				category: "Sayur Segar",
				price: 21000,
				favorite: false,
				count: 0,
				stock: 5
			},
			{
				id: 2,
				image: images.icon_forgot_password_success,
				title: "Apel",
				category: "Buah",
				price: 19000,
				favorite: false,
				count: 0,
				stock: 5
			},
			{
				id: 3,
				image: images.icon_forgot_password,
				title: "Belimbing",
				category: "Buah",
				price: 20000,
				favorite: false,
				count: 0,
				stock: 5
			}
			,{
				id: 4,
				image: images.icon_forgot_password,
				title: "Mangga",
				category: "Buah",
				price: 15000,
				favorite: false,
				count: 0,
				stock: 5
			},
			{
				id: 5,
				image: images.icon_forgot_password,
				title: "Sawi",
				category: "Sayur Segar",
				price: 14000,
				favorite: false,
				count: 0,
				stock: 5
			},
			{
				id: 6,
				image: images.icon_forgot_password,
				title: "Belimbing",
				category: "Buah",
				price: 21000,
				favorite: false,
				count: 0,
				stock: 5
			}
			,{
				id: 7,
				image: images.icon_forgot_password,
				title: "Duren",
				category: "buah",
				price: 25000,
				favorite: false,
				count: 0,
				stock: 5
			},
			{
				id: 8,
				image: images.icon_forgot_password,
				title: "sawi",
				category: "sayur segar",
				price: 21000,
				favorite: false,
				count: 0,
				stock: 5
			}],
			totalCount: 0,
			totalPrice: 0,
			searchItem: '',
			modalVisible: {
				openCategories: false,
			  },
		}
		this.toggleFavorite = this.toggleFavorite.bind(this);
		this.countTotalPrice = this.countTotalPrice.bind(this);
		this.changeTotalItem = this.changeTotalItem.bind(this);
		this.submitSearch = this.submitSearch.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);
		this.closeDialogCategories = this.closeDialogCategories.bind(this);
		this.openAllCategories = this.openAllCategories.bind(this);
		this.drawerOpen = this.drawerOpen.bind(this);
	}

	componentDidMount() {
		this.countTotalPrice();
	}

	drawerOpen() {
		alert('open')
	}

	openAllCategories(){
		this.setModalVisible('openCategories',true);
    }

	setModalVisible(type,value){
        let modalVisible = this.state.modalVisible;
        modalVisible[type] = value;
        this.setState({modalVisible});
    }

	closeDialogCategories(){
		this.setModalVisible('openCategories',false);
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

	render(){
		return (
		<Container>
        	<SearchComponent
				drawerOpen = {this.drawerOpen}
				type={'searchItem'}
				title={'productList.searchPlaceHolder'}
				onChangeText={(type,value) => this.onChangeText(type,value)}
				onSubmitEditing={this.submitSearch}
			/>

			<FilterComponent 
				openAllCategories = {this.openAllCategories}
				type={'searchItem'}
				onChangeText={(type,value) => this.onChangeText(type,value)}
				onSubmitEditing={this.submitSearch}
			/>
			<View style={styles.container}>
				<View style={styles.cartContainer}>
					<FlatList
						data={this.state.data}
						keyExtractor={(item) => String(item.id)}
						renderItem={({item,index}) => (
							<CartComponent 
								data = {item}
								index = {index} 
								toggleFavorite={this.toggleFavorite}
								changeTotalItem={this.changeTotalItem}
							/>
						)}
					/>

					<Checkout
						totalCount = { this.state.totalCount }
						totalPrice = { this.state.totalPrice }
					/>
				</View>
			</View>
			<Categories
                modalVisible={this.state.modalVisible.openCategories}
                closeDialogCategories={this.closeDialogCategories}
            />
		</Container>
		);
	}
}

export default ProductList;