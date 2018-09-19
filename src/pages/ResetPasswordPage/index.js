import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import StaticText from '@components/StaticText';
import numeral from 'numeral';
import styles from './styles';

class ResetPasswordPage extends Component {
  	constructor(props) {
  		super(props)
		this.state = {
		}
	}

  	render() {
  	  	return (
			<Container>
				<NavigationBar
					title={'resetPasswordPage.navigationTitle'}
					onPress={actNav.goBack}
				/>
  	  	  		<View style={styles.container}>
					<Text>Reset Password Page</Text>
  	  	  		</View>
			</Container>
  	  	);
  	}
}

export default ResetPasswordPage;
