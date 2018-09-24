import React, { Component } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import DetailOrder from './components/DetailOrder';
import CartComponent from './components/CartComponent';
import TotalPrice from './components/TotalPrice';
import styles from './styles';
import images from '@assets';

class HistoryDetail extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
			historyData:
				{
					id: '1',
					nomor: 'TRNS01/123123/18',
					date: 'Sunday, 18 Aug 2018',
                    status: 'Completed',
                    deliveryPrice: 0,
                    isCompleted: true,
                    user: {
                        name: 'John Doe',
                        phone: '0822 1234 5678',
                        address: "Jl. Jatiluhur III No. 167 B, Bandung, Jawa Barat, Kec. Ujungberung Kel.Pasanggrahan, Pagar Hijau Deket Tiang Listrik"
                    },
                    items: [{
                        id: 1,
                        image: images.icon_buah_segar,
                        title: "Wortel",
                        category: "Sayur Segar",
                        price: 21000,
                        favorite: false,
                        pack: 1,
                    },
                    {
                        id: 2,
                        image: images.icon_sayur_segar,
                        title: "Sawi",
                        category: "Sayur Segar",
                        price: 14000,
                        favorite: false,
                        pack: 1,
                    },
                    {
                        id: 3,
                        image: images.icon_buah_segar,
                        title: "Blackberry",
                        category: "Buah Segar",
                        price: 21000,
                        favorite: true,
                        pack: 21,
                    }
                    ,{
                        id: 4,
                        image: images.icon_sayur_segar,
                        title: "Jagung Manis",
                        category: "Sayur Segar",
                        price: 18000,
                        favorite: false,
                        pack: 1,
                    }]
                },
                subTotalPrice: 0,
                grandTotalPrice: 0,
                
        }
        this.toggleFavorite = this.toggleFavorite.bind(this);
        this.countTotalPrice = this.countTotalPrice.bind(this);
        this.navigateToCart = this.navigateToCart.bind(this);
	}

    componentDidMount() {
		this.countTotalPrice();
	}

	toggleFavorite(index){
		let data = this.state.historyData.items.slice();
		data[index].favorite = !data[index].favorite;
		this.setState({data});
	}

	countTotalPrice(){
        let state = this.state;
        let data = this.state.historyData.items;
        let delivery = this.state.historyData.deliveryPrice;
        let subTotal = 0;
        let grandTotal = 0;
		for(i=0; i<data.length; i++){
			subTotal = subTotal + (data[i].price * data[i].pack);
        }
        grandTotal = subTotal + delivery;
        
        state.subTotalPrice = subTotal;
        state.grandTotalPrice = grandTotal;
        this.setState({state});
	}

    navigateToCart(){
		actNav.navigate(navConstant.Cart);
	}

  	render() {
  	  	return (
			<Container>
				<NavigationBar
					title={'historyDetail.navigationTitle'}
					onPress={actNav.goBack}
				/>
  	  	  		<ScrollView style={styles.container}>
                    <DetailOrder
                        historyData={this.state.historyData}
                    />
                    <View style={styles.middleComponent}>
                        <FlatList
							data={this.state.historyData.items}
							keyExtractor={(item) => String(item.id)}
							renderItem={({item,index}) => (
								<CartComponent 
									data = {item}
									index = {index} 
									toggleFavorite={this.toggleFavorite}
								/>
							)}
						/>
                    </View>
                    <TotalPrice
                        subTotal={this.state.subTotalPrice}
                        grandTotal={this.state.grandTotalPrice}
                        data={this.state.historyData}
                        navigateToCart={this.navigateToCart}
                    />
  	  	  		</ScrollView>
			</Container>
  	  	);
  	}
}

export default HistoryDetail;
