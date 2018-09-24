import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import StaticText from '@components/StaticText';
import TransactionComponent from './components/TransactionComponent';
import numeral from 'numeral';
import styles from './styles';

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
		this.navigateToHistoryDetail = this.navigateToHistoryDetail.bind(this);
	}
	  
	navigateToHistoryDetail(index) {
		actNav.navigate(navConstant.HistoryDetail)
	}

	navigateToCart(){
		actNav.navigate(navConstant.Cart);
	}

  	render() {
  	  	return (
			<Container>
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
								navigateToHistoryDetail={this.navigateToHistoryDetail}
							/>
						)}
					/>
  	  	  		</View>
			</Container>
  	  	);
  	}
}

export default HistoryPage;
