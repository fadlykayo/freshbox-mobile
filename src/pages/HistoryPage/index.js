import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import TransactionComponent from './components/TransactionComponent';
import { language } from '@helpers';
import styles from './styles';
import actions from '@actions';

class HistoryPage extends Component {
  	constructor(props) {
  		super(props)
		this.navigateBack = this.navigateBack.bind(this);
		this.navigateToCart = this.navigateToCart.bind(this);
		this.navigateToDetail = this.navigateToDetail.bind(this);
	}
	
	componentDidMount(){
		if(this.props.user) this.getHistoryData();
		if(this.props.navigation.state.params){
			let action = this.props.navigation.state.params.action
			if(action == 'createOrder'){
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

	getHistoryData(){
		let payload = {
			header: {
				apiToken: this.props.user.authorization,
			},
			params: {}
		}

		this.props.get_transaction(payload, 
			(success) => {
				console.log(success);
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
			(success) => {
				actNav.navigate(navConstant.Detail, {action: 'history'});
			},
			(err) => {
				console.log(err)
			})
	}

	navigateToCart(payload){
		// actNav.navigate(navConstant.Cart);
	}

	navigateBack(){
		actNav.goBack(this.props.navigation.state.params.key);
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
						keyExtractor={(item) => String(item.invoice)}
						renderItem={({item,index}) => (
							<TransactionComponent
								data={item}
								index={index}
								navigateToCart={this.navigateToCart}
								navigateToDetail={this.navigateToDetail}
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
})

const mapDispatchToProps = (dispatch) => ({
	set_success_status: (payload) => dispatch(actions.network.reducer.set_success_status(payload)),
	detail_transaction: (req,res,err) => dispatch(actions.transaction.api.detail_transaction(req,res,err)),
	get_transaction: (req,res,err) => dispatch(actions.transaction.api.get_transaction(req,res,err))
})

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
