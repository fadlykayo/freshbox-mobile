import React, { Component } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import DetailOrder from './components/DetailOrder';
import CartComponent from './components/CartComponent';
import TotalPrice from '@components/TotalPrice';
import styles from './styles';
import images from '@assets';
import { connect } from 'react-redux';
import actions from '@actions';

class Detail extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
            grandTotalPrice: 0,
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
        this.navigateToCart = this.navigateToCart.bind(this);
        this.getDeliveryPrice = this.getDeliveryPrice.bind(this);
        this.navigateToChoosePayment = this.navigateToChoosePayment.bind(this);
    }
    
    componentDidMount() {
		this.getDeliveryPrice();
	}

    getDeliveryPrice() {
		let payload = {
			header: {
				apiToken: this.props.user.authorization
			},
			body: {},
			params: {}
		}

		this.props.get_delivery_price(payload, 
			(success) => {
				let state = this.state;
				state.grandTotalPrice = this.props.delivery_price + this.props.totalPrice

				this.setState(state)
			},
			(err) => {
				console.log(err)
			})
	}

	toggleFavorite(payload){
		this.props.toggle_favorite(payload);
	}

    navigateToCart(){
		actNav.navigate(navConstant.Cart);
    }
    
    navigateToChoosePayment() {
        actNav.navigate(navConstant.ChoosePayment, { transaction: this.props.navigation.state.params.transaction })
    }

  	render() {
  	  	return (
            <Container 				
                bgColorBottom={'veryLightGrey'} 				
                bgColorTop={'red'} 			
            >
				<NavigationBar
					title={'historyDetail.navigationTitle'}
					onPress={actNav.goBack}
				/>
  	  	  		<ScrollView style={styles.container}>
                    <DetailOrder
                        setDate={this.props.navigation.state.params.setDate}
                        addresses={this.props.addresses}
                        historyData={this.state.historyData}
                        action={this.props.navigation.state.params.action}
                    />
                    <View style={styles.middleComponent}>
                        <FlatList
							data={this.props.navigation.state.params.action == 'history' ? this.state.historyData.items : this.props.cart_product}
							keyExtractor={(item) => String(item.id)}
							renderItem={({item,index}) => (
								<CartComponent 
									data = {item}
									index = {index} 
                                    toggleFavorite={this.toggleFavorite}
                                    action={this.props.navigation.state.params.action}
								/>
							)}
						/>
                    </View>
  	  	  		</ScrollView>
                    <TotalPrice
				    	type={'red'}
				    	title={this.props.navigation.state.params.action == 'history' ? 'historyDetail.content.reOrder' : 'historyDetail.content.checkout'}
                        subTotal={this.props.totalPrice}
                        grandTotal={this.state.grandTotalPrice}
				    	delivery_price={this.props.delivery_price}
				    	onPress={ this.props.navigation.state.params.action == 'history' ? this.navigateToCart : this.navigateToChoosePayment }
                    />
			</Container>
  	  	);
  	}
}

const mapStateToProps = (state) => ({
    user: state.user.data,
    addresses: state.user.address,
    cart_product: state.product.cart.products,
    totalPrice: state.product.total.price,
	delivery_price: state.product.delivery_price
})

const mapDispatchToProps = (dispatch) => ({
    get_delivery_price: (req,res,err) => dispatch(actions.product.api.get_delivery_price(req,res,err)),
    toggle_favorite: (index) => dispatch(actions.product.reducer.toggle_favorite(index)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
