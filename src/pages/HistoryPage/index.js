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
  		super(props)
		this.navigateBack = this.navigateBack.bind(this);
		this.navigateToCart = this.navigateToCart.bind(this);
		this.navigateToDetail = this.navigateToDetail.bind(this);
	}
	
	componentDidMount(){
		this.props.reset_transaction();
		if(this.props.user) this.getHistoryData();
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
			}
		)
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
	get_transaction: (req,res,err) => dispatch(actions.transaction.api.get_transaction(req,res,err)),
	detail_transaction: (req,res,err) => dispatch(actions.transaction.api.detail_transaction(req,res,err)),
	reset_transaction: () => dispatch(actions.transaction.reducer.reset_transaction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
