import React, { Component } from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { actNav, navConstant } from '@navigations';
import StaticText from '@components/StaticText';
import Container from '@components/Container';
import PhotoComponent from './components/PhotoComponent';
import LogOutButton from './components/LogOutButton';
import PagesComponent from './components/PagesComponent';
import images from '@assets';
import styles from './styles';
import { connect } from 'react-redux';
import actions from '@actions';

class DrawerPage extends Component {
  	constructor(props) {
    	super(props)
    	this.state = {
			pages: [
				{
					name: 'drawerPage.pages.dashboard',
					selected: true,
				},
				{
					name: 'drawerPage.pages.favorite',
					selected: false,
				},
				{
					name: 'drawerPage.pages.history',
					selected: false,
				},
				{
					name: 'drawerPage.pages.termsConditions',
					selected: false,
				},
				{
					name: 'drawerPage.pages.contactUs',
					selected: false,
				}
			],
		}
		this.navigateToOtherPage = this.navigateToOtherPage.bind(this);
		this.navigateToProfilePage = this.navigateToProfilePage.bind(this);
		this.navigateLogOut = this.navigateLogOut.bind(this);
		this.navigateSignIn = this.navigateSignIn.bind(this);
		this.closeDrawerPage = this.closeDrawerPage.bind(this);
  	}

  	navigateToOtherPage(payload) {
		switch (payload.name) {
			case 'drawerPage.pages.favorite': return actNav.navigate(navConstant.Favourites);
			case 'drawerPage.pages.history': return actNav.navigate(navConstant.HistoryPage)
			case 'drawerPage.pages.termsConditions': return actNav.navigate(navConstant.TermsConditions)
			case 'drawerPage.pages.contactUs': return actNav.navigate(navConstant.ContactUs)
			default: return actNav.navigate(navConstant.ProductList)
		}
	}
	  
	navigateToProfilePage() {
		actNav.navigate(navConstant.ProfilePage)
	}

	navigateLogOut() {
		this.props.log_out();
		this.props.clear_products();
		actNav.reset(navConstant.Menu);
	}

	navigateSignIn() {
		actNav.navigate(navConstant.SignIn, { action: 'menuLogin' })
	}

	closeDrawerPage() {
		this.props.navigation.closeDrawer()
	}

  	render () {
  	  	return (
			<Container>
  	  	  		<View style={styles.container}>
					<PhotoComponent
						navigateToProfilePage={this.navigateToProfilePage}
						user={this.props.user}
					/>
					<PagesComponent
						user={this.props.user}
						closeDrawerPage={this.closeDrawerPage}
						navigateToOtherPage={this.navigateToOtherPage}
						pages={this.state.pages}
					/>
					<LogOutButton
						user={this.props.user}
						navigateLogOut={this.navigateLogOut}
						navigateSignIn={this.navigateSignIn}
					/>
  	    	</View>
		</Container>
  	  	);
  	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user.data
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		log_out : () => dispatch(actions.auth.reducer.log_out()),
		clear_products : () => dispatch(actions.product.reducer.clear_products())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps)(DrawerPage);