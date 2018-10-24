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
    
    navigateToChoosePayment(){
        actNav.navigate(navConstant.ChoosePayment,this.props.navigation.state.params);
	}

  	render() {

  	  	return (
            <Container 				
                bgColorBottom={'veryLightGrey'} 				
                bgColorTop={'red'} 			
            >
				<NavigationBar
					title={'historyDetail.navigationTitle'}
				/>
  	  	  		<ScrollView style={styles.container}>
                    <DetailOrder
                        setDate={this.props.navigation.state.params.setDate}
                        addresses={this.props.addresses}
                        transaction={this.props.detailTransaction}
                        action={this.props.navigation.state.params.action}
                    />
                    <View style={styles.middleComponent}>
                        <FlatList
							data={this.props.navigation.state.params.action == 'history' ? this.props.detailTransaction.details : this.props.cart_product}
							keyExtractor={(item,index) => index.toString()}
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
    detailTransaction: state.transaction.detail,
    transactions: state.transaction.transactions,
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
