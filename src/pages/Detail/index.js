import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, FlatList, RefreshControl } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import DetailOrder from './components/DetailOrder';
import CartComponent from './components/CartComponent';
import TotalPrice from './components/TotalPrice';
import { language } from '@helpers';
import styles from './styles';
import actions from '@actions';

const BANK_TRANSFER = 'bank_transfer';

class Detail extends Component {
  	constructor(props) {
		super(props)
		this.state = {
			status: 'historyDetail.content.checkout',
			totalPrice: 0,
			deliveryPrice: 0,
			grandTotalPrice: 0,
            redirect_url: '',
            token: '',
            invoice: '',
			refreshing: false,
			isNavigateBack: false,
        }
		this._onRefresh = this._onRefresh.bind(this);
		this.navigateBack = this.navigateBack.bind(this);
		this.toggleFavorite = this.toggleFavorite.bind(this);
        this.navigateToCart = this.navigateToCart.bind(this);
		this.refreshHandler = this.refreshHandler.bind(this);
		this.getDeliveryPrice = this.getDeliveryPrice.bind(this);
		this.clearNotification = this.clearNotification.bind(this);
		this.messageOrderSuccess = this.messageOrderSuccess.bind(this);
		this.setDetailTransaction = this.setDetailTransaction.bind(this);
		this.toggleFavoriteHistory = this.toggleFavoriteHistory.bind(this);
		this.navigateToChoosePayment = this.navigateToChoosePayment.bind(this);
		this.validateTransactionStatus = this.validateTransactionStatus.bind(this);
		this.navigateToTransferInstruction = this.navigateToTransferInstruction.bind(this);
	}
	
	componentWillUnmount() {
		if(this.state.isNavigateBack == true){
			if (this.props.navigation.state.params.refreshHandler){
				this.props.navigation.state.params.refreshHandler();
			}
			else{
				if(this.props.navigation.state.params.cancelInvoice && this.state.token.length > 0){
					this.props.navigation.state.params.cancelInvoice(this.state.token);
				}
			}
		}
	}
    
    componentDidMount() {
		console.log(this.props.navigation.state.params);
		this.setDetailTransaction();
		this.messageOrderSuccess();
		this.clearNotification();
	}

	clearNotification() {
		if(this.props.notif) this.props.reset_notification();
	}

	validateTransactionStatus(){
		let payload = {
			header: {
				apiToken: this.props.user.authorization,
			},
			type: 'validation',
			invoice: this.state.invoice
		}

		this.props.detail_transaction(payload, 
			(res) => {
				this.setState({
					token: '',
					invoice: '',
					redirect_url: '',
				},() => {
					this.props.navigation.state.params.createOrderHandler(res.data.invoice);
				})
			},
			(err) => {
				this.props.set_error_status({
					status: true,
					data: 'Pembayaran batal dilakukan.',
					title: 'formError.title.paymentCanceled'
				});
			}
		)
	}

	messageOrderSuccess() {
		if(this.props.navigation.state.params.createOrderSuccess){
			if(this.props.navigation.state.params.invoice == 'credit_card') {
				language.transformText('message.paymentSuccess')
				.then(message => {
					this.props.set_success_status({
						status: true,
						data: message,
						title: 'formSuccess.title.createOrder'
					});
				});
			}
			else {
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
				favorite: payload,
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

	toggleFavoriteHistory(payload){
		if (payload.product.wishlisted == 1) {
			let data = {
				request: {
					header: {
						apiToken: this.props.user.authorization
					},
					body: {}
				},
				favorite: payload,
			}
			this.props.delete_favorite_history(data,
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
						product_code: payload.product.code
					}
				},
				favorite: payload
			}

			this.props.add_favorite_history(data,
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
			() => {
				actNav.reset(navConstant.Product,{
					action: 'reorder'
				});
			},
			(err) => {
				console.log(err)
			}
		)
	}
    
    navigateToChoosePayment(){
		if(this.state.token.length == 0){
			let address = this.props.addresses.filter(address => address.primary == 1)[0];
	
			let payload = {
				header: {
					apiToken: this.props.user ? this.props.user.authorization : ''
				},
				body: {
					address_code: address.code,
					request_shipping_date: this.props.navigation.state.params.date.value
				}
			}
			
			this.props.request_snap_token(payload,
				res => {
					this.setState({
						token: res.token,
						invoice: res.invoice,
						redirect_url: res.redirect_url,
					},() => {
						actNav.navigate(navConstant.ChoosePayment,{
							...this.props.navigation.state.params,
							token: this.state.token,
							invoice: this.state.invoice,
							redirect_url: this.state.redirect_url,
							validateTransactionStatus: this.validateTransactionStatus
						});
					});
				},
				rej => {
	
				}
			);
		}
		else{
			actNav.navigate(navConstant.ChoosePayment,{
				...this.props.navigation.state.params,
				token: this.state.token,
				invoice: this.state.invoice,
				redirect_url: this.state.redirect_url,
				validateTransactionStatus: this.validateTransactionStatus
			});
		}
	}

	navigateToTransferInstruction(){
		actNav.navigate(navConstant.TransferInstruction,{refreshHandler: this.refreshHandler});
	}

	navigateBack(key) {
		this.setState({
			isNavigateBack: true
		}, () => {
			if(key) actNav.goBack(key)
			else actNav.goBack();
		});
	}

	refreshHandler(){
		this.setState({refreshing: true},() => {
			this._onRefresh();
		});
	}

	_onRefresh() {
		let payload = {
			header: {
				apiToken: this.props.user.authorization,
			},
			invoice: this.props.detailTransaction.invoice
		}

		this.props.detail_transaction(payload,
			() => {
				if(this.state.refreshing) this.setState({refreshing: false});
			},
			(err) => {
				console.log(err)
			}
		)
	}

  	render(){
  	  	return(
            <Container 				
                bgColorBottom={'veryLightGrey'} 				
                bgColorTop={'red'} 			
            >
				<NavigationBar
					title={'historyDetail.navigationTitle'}
					onPress={this.navigateBack}
				/>
				<ScrollView
					refreshControl= {this.props.navigation.state.params.action == 'history'
						? <RefreshControl
							  refreshing={this.state.refreshing}
							  onRefresh={this.refreshHandler}
							/>
						: null
					}
					style={styles.container}
				>
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
							keyExtractor={(_,index) => index.toString()}
							renderItem={({item,index}) => (
								<CartComponent
									data = {item}
									index = {index} 
									toggleFavorite={this.toggleFavorite}
									toggleFavoriteHistory={this.toggleFavoriteHistory}
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
    user: state.user.data,
    addresses: state.user.address,
	notif: state.notif.notification,
    totalPrice: state.product.total.price,
    cart_product: state.product.cart.products,
    detailTransaction: state.transaction.detail,
    transactions: state.transaction.transactions,
	delivery_price: state.product.delivery_price,
	additional: state.product.additional.credit_card,
});

const mapDispatchToProps = (dispatch) => ({
	reset_notification: () => dispatch(actions.notif.reducer.reset_notification()),
    toggle_favorite: (index) => dispatch(actions.product.reducer.toggle_favorite(index)),
	add_favorite: (req,res,err) => dispatch(actions.product.api.add_favorite(req,res,err)),
	set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
	delete_favorite: (req,res,err) => dispatch(actions.product.api.delete_favorite(req,res,err)),
	set_success_status: (payload) => dispatch(actions.network.reducer.set_success_status(payload)),
	get_delivery_price: (req,res,err) => dispatch(actions.product.api.get_delivery_price(req,res,err)),
	request_snap_token: (req,res,err) => dispatch(actions.transaction.api.request_snap_token(req,res,err)),
	detail_transaction: (req,res,err) => dispatch(actions.transaction.api.detail_transaction(req,res,err)),
	reorder_transaction: (req,res,err) => dispatch(actions.transaction.api.reorder_transaction(req,res,err)),
	add_favorite_history: (req,res,err) => dispatch(actions.transaction.api.add_favorite_history(req,res,err)),
	delete_favorite_history: (req,res,err) => dispatch(actions.transaction.api.delete_favorite_history(req,res,err)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Detail);
