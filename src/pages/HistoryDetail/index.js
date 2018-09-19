import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import StaticText from '@components/StaticText';
import numeral from 'numeral';
import styles from './styles';

class HistoryDetail extends Component {
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
		}
	}

  	render() {
  	  	return (
			<Container>
				<NavigationBar
					title={'historyDetail.navigationTitle'}
					onPress={actNav.goBack}
				/>
  	  	  		<ScrollView style={styles.container}>
                    <View style={styles.topComponent}>
					    <StaticText
                            property={'historyDetail.detail.status'}
                        />
                        <StaticText
                            property={'historyDetail.detail.nomorResi'}
                        />
                        <StaticText
                            property={'historyDetail.detail.tanggal'}
                        />
                        <StaticText
                            property={'historyDetail.detail.alamat'}
                        />
                    </View>
                    <View style={styles.middleComponent}>
                        <View
                            style={styles.eachContainer}
                        >
                            <Text>Cart</Text>
                        </View>
                        <View
                            style={styles.eachContainer}
                        >
                            <Text>Cart</Text>
                        </View>
                        <View
                            style={styles.eachContainer}
                        >
                            <Text>Cart</Text>
                        </View>
                    </View>
                    <View style={styles.bottomComponent}>
					    <Text>Re-Order</Text>
                    </View>
  	  	  		</ScrollView>
			</Container>
  	  	);
  	}
}

export default HistoryDetail;
