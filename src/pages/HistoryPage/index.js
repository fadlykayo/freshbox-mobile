import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import StaticText from '@components/StaticText';
import TransactionComponent from './components/TransactionComponent';
import numeral from 'numeral';
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

	}

	getHistoryData() {
		let payload = {
			header: {
				apiToken: this.props.user.authorization,
			},
			params: {
				invoice: null,
			}
		}

		this.props.get_history(payload, null,
			(err) => {
				console.log(err)
			})
	}

	navigateToDetail(index) {
		console.log(index)
		actNav.navigate(navConstant.Detail, { action: 'history', index: index })
	}

	navigateToCart(payload){
		//REORDER
		console.log(payload)
		// actNav.navigate(navConstant.Cart);
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
						data={this.state.historyData}
						keyExtractor={(item) => String(item.id)}
						renderItem={({item,index}) => (
							<TransactionComponent
								item={item}
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
	user: state.user.data
})

const mapDispatchToProps = (dispatch) => ({
	get_history: (req,res,err) => dispatch(actions.transaction.api.get_history((req,res,err)))
})

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
