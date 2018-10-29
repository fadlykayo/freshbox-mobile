import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, FlatList } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import DetailOrder from './components/DetailOrder';
import CartComponent from './components/CartComponent';
import TotalPrice from './components/TotalPrice';
import { language } from '@helpers';
import styles from './styles';
import actions from '@actions';

class Detail extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
			status: 'historyDetail.content.checkout',
			totalPrice: 0,
			deliveryPrice: 0,
            grandTotalPrice: 0,
        }
        this.toggleFavorite = this.toggleFavorite.bind(this);
        this.navigateToCart = this.navigateToCart.bind(this);
		this.getDeliveryPrice = this.getDeliveryPrice.bind(this);
		this.setDetailTransaction = this.setDetailTransaction.bind(this);
		this.navigateToChoosePayment = this.navigateToChoosePayment.bind(this);
		this.navigateToTransferInstruction = this.navigateToTransferInstruction.bind(this);
    }
    
    componentDidMount() {
		this.setDetailTransaction();
		if(this.props.navigation.state.params.createOrderSuccess){
			language.transformText('message.createOrderSuccess')
			.then(message => {
				this.props.set_success_status({
					status: true,
					data: message,
					title: 'formSuccess.title.createOrder'
				});
			});
		}
	}

	setDetailTransaction(){
		if(this.props.navigation.state.params.action == 'history'){
			this.setState({
				status: this.props.detailTransaction.status,
				totalPrice: this.props.detailTransaction.sub_total,
				deliveryPrice: this.props.detailTransaction.shipping_cost,
				grandTotalPrice: this.props.detailTransaction.grand_total,
			});
		}
		else{
			this.getDeliveryPrice();
		}
	}

    getDeliveryPrice(){
		let payload = {
			header: {
				apiToken: this.props.user.authorization
			},
			body: {},
			params: {}
		}

		this.props.get_delivery_price(payload, 
			() => {
				this.setState({
					status: 'historyDetail.content.checkout',
					totalPrice: this.props.totalPrice,
					deliveryPrice: this.props.delivery_price,
					grandTotalPrice: this.props.delivery_price + this.props.totalPrice,
				});
			},
			(err) => {
				console.log(err);
			}
		)
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

	navigateToTransferInstruction(){
		actNav.navigate(navConstant.TransferInstruction);
	}

  	render(){
  	  	return(
            <Container 				
                bgColorBottom={'veryLightGrey'} 				
                bgColorTop={'red'} 			
            >
				<NavigationBar
					title={'historyDetail.navigationTitle'}
				/>
  	  	  		<ScrollView style={styles.container}>
                    <DetailOrder
                        setDate={this.props.navigation.state.params.date}
                        addresses={this.props.addresses}
                        transaction={this.props.detailTransaction}
                        action={this.props.navigation.state.params.action}
                    />
                    <View style={styles.subcontainer}>
                        <FlatList
							data={
								this.props.navigation.state.params.action == 'history' 
								? this.props.detailTransaction.details 
								: this.props.cart_product
							}
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
					status={this.state.status}
					subTotal={this.state.totalPrice}
					navigateToCart={this.navigateToCart}
					grandTotal={this.state.grandTotalPrice}
					delivery_price={this.state.deliveryPrice}
					action={this.props.navigation.state.params.action}
					navigateToChoosePayment={this.navigateToChoosePayment}
					navigateToTransferInstruction={this.navigateToTransferInstruction}
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
    toggle_favorite: (index) => dispatch(actions.product.reducer.toggle_favorite(index)),
	set_success_status: (payload) => dispatch(actions.network.reducer.set_success_status(payload)),
    get_delivery_price: (req,res,err) => dispatch(actions.product.api.get_delivery_price(req,res,err)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
