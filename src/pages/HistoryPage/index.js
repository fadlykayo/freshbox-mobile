import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import TransactionComponent from './components/TransactionComponent';
import styles from './styles';
import actions from '@actions';

class HistoryPage extends Component {
  	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
		}
		this.refreshHandler = this.refreshHandler.bind(this);
		this.getRefreshData = this.getRefreshData.bind(this);
		this.getHistoryData = this.getHistoryData.bind(this);
		this.navigateBack = this.navigateBack.bind(this);
		this.navigateToCart = this.navigateToCart.bind(this);
		this.navigateToDetail = this.navigateToDetail.bind(this);
		this.navigateToReviewProduct = this.navigateToReviewProduct.bind(this);
	}
	
	componentWillUnmount() {
		console.log("sebelum pindah ke drawer",this.props.navigation.state.params)
		if(this.props.navigation.state.params.refreshProductList) {
			this.props.navigation.state.params.refreshProductList();
		}
	}

	componentDidMount(){
		this.getHistoryData();
	}

	refreshHandler(){
		this.setState({refreshing: true},() => {
			this.getRefreshData();
		});
	}

	getHistoryData(){
		let payload = {
			header: {
				apiToken: this.props.user.authorization,
			},
			params: this.props.params
		}

		this.props.get_transaction(payload, 
			() => {},
			(err) => {
				console.log(err);
			})
	}

	getRefreshData() {
		let payload = {
			header: {
				apiToken: this.props.user.authorization,
			},
			params: {
				page: 1,
				per_page: this.props.transactions.length
			}
		}

		this.props.get_transaction(payload, 
			() => {
				if(this.state.refreshing != false) this.setState({refreshing: false})
			},
			(err) => {
				console.log(err);
			})
	}

	navigateToDetail(input) {
		let payload = {
			header: {
				apiToken: this.props.user.authorization,
			},
			invoice: input.invoice
		}
		this.props.detail_transaction(payload,
			() => {
				actNav.navigate(navConstant.Detail,{
					action: 'history'
				});
			},
			(err) => {
				console.log(err)
			}
		)
	}

	navigateToCart(payload){
		// actNav.navigate(navConstant.Cart);
	}

	navigateBack(){
		actNav.goBack(this.props.navigation.state.params.key);
	}

	navigateToReviewProduct(payload) {
		actNav.navigate(navConstant.ContactUs, { action: 'history', data: payload })
	}

  	render() {
  	  	return (
			<Container 				
				bgColorBottom={'veryLightGrey'} 				
				bgColorTop={'red'} 			
			>
				<NavigationBar
					title={'historyPage.navigationTitle'}
					onPress={this.navigateBack}
				/>
  	  	  		<View style={styles.container}>
					<FlatList
						data={this.props.transactions}
						onRefresh={this.getRefreshData}
						refreshing={this.state.refreshing}
						onEndReached={this.getHistoryData}
						onEndReachedThreshold={0.05}
						keyExtractor={(item) => String(item.invoice)}
						renderItem={({item,index}) => (
							<TransactionComponent
								data={item}
								index={index}
								navigateToCart={this.navigateToCart}
								navigateToDetail={this.navigateToDetail}
								navigateToReviewProduct={this.navigateToReviewProduct}
							/>
						)}
					/>
  	  	  		</View>
			</Container>
  	  	);
  	}
}

const mapStateToProps = (state) => ({
	user: state.user.data,
	transactions: state.transaction.transactions,
	params: state.transaction.params,
})

const mapDispatchToProps = (dispatch) => ({
	get_transaction: (req,res,err) => dispatch(actions.transaction.api.get_transaction(req,res,err)),
	detail_transaction: (req,res,err) => dispatch(actions.transaction.api.detail_transaction(req,res,err)),
	reset_transaction: () => dispatch(actions.transaction.reducer.reset_transaction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
