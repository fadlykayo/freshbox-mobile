import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { validation } from '@helpers';
import Checkout from './components/Checkout';
import CartComponent from './components/CartComponent';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import styles from './styles';
import images from '@assets';


class Cart extends Component {
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
				count: 1,
				stock: 5
			},
			{
				id: 2,
				image: images.icon_forgot_password_success,
				title: "Apel",
				category: "Buah",
				price: 21000,
				favorite: false,
				count: 1,
				stock: 5
			},
			{
				id: 3,
				image: images.icon_forgot_password,
				title: "Belimbing",
				category: "Buah",
				price: 21000,
				favorite: false,
				count: 1,
				stock: 5
			}
			,{
				id: 4,
				image: images.icon_forgot_password,
				title: "Mangga",
				category: "Buah",
				price: 21000,
				favorite: false,
				count: 1,
				stock: 5
			},
			{
				id: 5,
				image: images.icon_forgot_password,
				title: "Sawi",
				category: "Sayur Segar",
				price: 21000,
				favorite: false,
				count: 1,
				stock: 5
			},
			{
				id: 6,
				image: images.icon_forgot_password,
				title: "Belimbing",
				category: "Buah",
				price: 21000,
				favorite: false,
				count: 1,
				stock: 5
			}
			,{
				id: 7,
				image: images.icon_forgot_password,
				title: "mangga",
				category: "buah",
				price: 21000,
				favorite: false,
				count: 1,
				stock: 5
			},
			{
				id: 8,
				image: images.icon_forgot_password,
				title: "sawi",
				category: "sayur segar",
				price: 21000,
				favorite: false,
				count: 1,
				stock: 5
			}],
			totalPrice: 0,
		}
		this.toggleFavorite = this.toggleFavorite.bind(this);
		this.countTotalPrice = this.countTotalPrice.bind(this);
		this.changeTotalItem = this.changeTotalItem.bind(this);
		this.countCheckHandler = this.countCheckHandler.bind(this);
	}

	componentDidMount() {
		this.countTotalPrice();
	}

	toggleFavorite(index){
		let data = this.state.data.slice();
		data[index].favorite = !data[index].favorite;
		this.setState({data});
	}

	countTotalPrice(){
		let data = this.state.data;
		let total = 0;
		for(i=0; i<data.length; i++){
			total = total + (data[i].price * data[i].count);
		}
		this.setState({totalPrice: total})
	}

	changeTotalItem(index,type){
		let data = this.state.data.slice();
		if (type == "inc") {
			data[index].count += 1;
			this.setState({data});
		}
		else {
			data[index].count -= 1;
			this.setState({data});
		}
		this.countCheckHandler();
	}

	countCheckHandler(){
		let cart = this.state.data.slice();
		let filteredCart = cart.filter((e) => e.count > 0);
		this.setState({data: filteredCart});
		this.countTotalPrice();
	}

	render(){
		return (
			<Container>
				<NavigationBar 
					title={'cart.navigationTitle'}
					onPress={actNav.goBack}
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
					</View>
					<Checkout
						totalPrice={this.state.totalPrice}
					/>
				</View>
			</Container>
		);
	}
}

export default Cart;