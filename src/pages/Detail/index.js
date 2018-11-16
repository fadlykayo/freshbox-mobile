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
	
	componentWillUnmount() {
		if (this.props.navigation.state.params.refreshHandler) {
			this.props.navigation.state.params.refreshHandler();
		}
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
		if (payload.wishlisted == 1) {
			let data = {
				request: {
					header: {
						apiToken: this.props.user.authorization
					},
					body: {}
				},
				favorite: payload
			}
			this.props.delete_favorite(data,
				() => {},
				(err) => {
					console.log(err)
				}
			)
		}
		else {
			let data = {
				request: {
					header: {
						apiToken: this.props.user.authorization
					},
					body: {
						product_code: payload.code
					}
				},
				favorite: payload
			}
			this.props.add_favorite(data,
				() => {},
				(err) => {
					console.log(err)
				}
			)
		}
	}

    navigateToCart(){
		let payload = {
			header: {
				apiToken: this.props.user.authorization
			},
			invoice: this.props.detailTransaction.invoice 
		}

		this.props.reorder_transaction(payload,
			(res) => {
				console.log('berhasil')
				actNav.navigate(navConstant.Cart,this.props.navigation.state.params);
			},
			(err) => {
				console.log(err)
			})
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
					additional={this.props.additional}
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
	additional: state.product.additional.credit_card,
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
	add_favorite: (req,res,err) => dispatch(actions.product.api.add_favorite(req,res,err)),
	delete_favorite: (req,res,err) => dispatch(actions.product.api.delete_favorite(req,res,err)),
	reorder_transaction: (req,res,err) => dispatch(actions.transaction.api.reorder_transaction(req,res,err)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
