import React, { Component } from 'react';
import { View } from 'react-native';
import { actNav, navConstant } from '@navigations';
import PhotoComponent from './components/PhotoComponent';
import LogOutButton from './components/LogOutButton';
import PagesComponent from './components/PagesComponent';
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
					name: 'drawerPage.pages.privacyPolicy',
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

  	navigateToOtherPage(payload){

		switch (payload.name) {
			case 'drawerPage.pages.favorite': return actNav.navigate(navConstant.Favourites);
			case 'drawerPage.pages.history': return actNav.navigate(navConstant.HistoryPage)
			case 'drawerPage.pages.termsConditions': return actNav.navigate(navConstant.TermsConditions)
			case 'drawerPage.pages.privacyPolicy': return actNav.navigate(navConstant.PrivacyPolicy)
			case 'drawerPage.pages.contactUs': return actNav.navigate(navConstant.ContactUs)
			default: return actNav.navigate(navConstant.ProductList)
		}
	}
	  
	navigateToProfilePage() {
		actNav.navigate(navConstant.ProfilePage)
	}

	navigateLogOut() {
		this.props.log_out();
		this.props.reset_products();
		this.props.reset_transaction();
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
  	  	);
  	}
}

const mapStateToProps = (state) => ({
		user: state.user.data
})

const mapDispatchToProps = (dispatch) => ({
	log_out : () => dispatch(actions.auth.reducer.log_out()),
	reset_products : () => dispatch(actions.product.reducer.reset_products()),
	reset_transaction: () => dispatch(actions.transaction.reducer.reset_transaction())
})

export default connect(mapStateToProps,mapDispatchToProps)(DrawerPage);