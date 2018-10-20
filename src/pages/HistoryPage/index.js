import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import TransactionComponent from './components/TransactionComponent';
import styles from './styles';
import { connect } from 'react-redux';
import actions from '@actions';

class HistoryPage extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
			historyData: [
				{
					id: '1',
					name: 'TRNS01/123123/18',
					date: '18 Aug 2018',
					price: 782000,
					status: 'On Process',
					isCompleted: false
				},
				{
					id: '2',
					name: 'TRNS01/123123/18',
					date: '18 Aug 2018',
					price: 789000,
					status: 'Success',
					isCompleted: true
				},
				{
					id: '3',
					name: 'TRNS01/123123/18',
					date: '18 Aug 2018',
					price: 72000,
					status: 'Success',
					isCompleted: true
				},
			]
		},
		this.navigateToCart = this.navigateToCart.bind(this);
		this.navigateToDetail = this.navigateToDetail.bind(this);
	}
	
	componentDidMount() {
		if (this.props.user) {
			this.getHistoryData();
		}
	}

	getHistoryData() {
		let payload = {
			header: {
				apiToken: this.props.user.authorization,
			},
			params: {}
		}

		this.props.get_transaction(payload, 
			(success) => {
				console.log(success)
			},
			(err) => {
				console.log(err)
			})
	}

	navigateToDetail(payload) {
		this.props.detail_transaction(payload)
		actNav.navigate(navConstant.Detail, { action: 'history' })
	}

	navigateToCart(payload){
		//REORDER
		console.log(payload)
		actNav.navigate(navConstant.Cart);
	}

  	render() {
  	  	return (
			<Container 				
				bgColorBottom={'veryLightGrey'} 				
				bgColorTop={'red'} 			
			>
				<NavigationBar
					title={'historyPage.navigationTitle'}
					onPress={actNav.goBack}
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
	detail_transaction: (payload) => dispatch(actions.transaction.reducer.detail_transaction(payload)),
	get_transaction: (req,res,err) => dispatch(actions.transaction.api.get_transaction(req,res,err))
})

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
