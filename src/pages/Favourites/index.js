import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { actNav } from '@navigations';
import Checkout from './components/Checkout';
import Container from '@components/Container';
import CartComponent from './components/CartComponent';
import DetailProduct from './components/DetailProduct';
import NavigationBar from '@components/NavigationBar';
import images from '@assets'
import styles from './styles';

class Favourites extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
			data: [{
				id: 1,
				image: images.icon_sayur_segar,
				title: "Wortel",
				category: "Sayur Segar",
				price: 21000,
				favorite: true,
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
				favorite: true,
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
				favorite: true,
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
				favorite: true,
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
				favorite: true,
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
				favorite: true,
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
				favorite: true,
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
				favorite: true,
				count: 0,
				stock: 5,
				description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima unde ad tempore sunt illum, ut sit laudantium cumque debitis beatae labore nulla inventore quam eos et quasi quae distinctio laboriosam?`
			}],
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
		this.setModalVisible = this.setModalVisible.bind(this);
		this.closeDetailProduct = this.closeDetailProduct.bind(this);
		this.openDetailProduct = this.openDetailProduct.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
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

  	render() {
  	  	return (
			<Container 				
				bgColorBottom={'veryLightGrey'} 				
				bgColorTop={'red'} 			
			>
				<NavigationBar
					title={'favourites.navigationTitle'}
					onPress={actNav.goBack}
				/>
  	  	  		<View style={styles.container}>
				<View style={styles.cartContainer}>
					<FlatList
						data={this.state.data}
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
			</Container>
  	  	);
  	}
}

export default Favourites;
