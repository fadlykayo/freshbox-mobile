import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
		this.refreshProductList = this.refreshProductList.bind(this);
		this.actToNavigate = this.actToNavigate.bind(this);
  	}

	refreshProductList() {
		
		let payload = {
			header: {
				apiToken: this.props.user ? this.props.user.authorization : ''
			},
			params: {
				page: 1,
				per_page: this.props.product.length,
				// stock: 'tersedia',
				sort: 'nama-az'
			}
		}
		this.props.get_products(payload,
			() => {},
			(err) => {}
		);
	}

  	navigateToOtherPage(payload){
		let newPages = this.state.pages;

		newPages.map((newPage) => {
			if(payload.name == newPage.name) newPage.selected = true;
			else newPage.selected = false;
			return newPage
		})

		this.setState({pages: newPages}, () => {
			switch (payload.name) {
				case 'drawerPage.pages.favorite': return this.actToNavigate(navConstant.Favourites, payload);
				case 'drawerPage.pages.history': return this.actToNavigate(navConstant.HistoryPage, payload)
				case 'drawerPage.pages.termsConditions': return this.actToNavigate(navConstant.TermsConditions, payload)
				case 'drawerPage.pages.privacyPolicy': return this.actToNavigate(navConstant.PrivacyPolicy, payload)
				case 'drawerPage.pages.contactUs': return this.actToNavigate(navConstant.ContactUs, payload)
				case 'drawerPage.pages.dashboard': return this.actToNavigate(navConstant.Dashboard, payload);
				default: return this.closeDrawerPage(payload);
			}
			
		})

	}
	
	actToNavigate(input, payload) {
		if(payload.selected == true) {
			this.closeDrawerPage(input)
		}
		if(input == 'drawerPage.pages.history') {
			actNav.navigate(input, {closeDrawer: this.props.navigation.closeDrawer, refreshProductList: this.refreshProductList});
		} else {			
			actNav.navigate(input, {closeDrawer: this.props.navigation.closeDrawer});
		}
	}

	navigateToProfilePage() {
		actNav.navigate(navConstant.ProfilePage, {closeDrawer: this.props.navigation.closeDrawer})
	}

	navigateLogOut() {
		this.props.log_out();
		this.props.reset_products();
		this.props.reset_transaction();
		actNav.reset(navConstant.Dashboard);
	}

	navigateSignIn() {
		actNav.navigate(navConstant.SignIn, { action: 'menuLogin', closeDrawer: this.props.navigation.closeDrawer})
	}

	closeDrawerPage(input) {
		if(input == undefined) {	
			let newPages = this.state.pages;
			
			newPages.map((newPage) => {
				if('drawerPage.pages.dashboard' == newPage.name) newPage.selected = true;
				else newPage.selected = false;
				return newPage
			})
			
			this.setState({pages: newPages}, () => {
				this.props.navigation.closeDrawer()
			})
		} else {
			this.props.navigation.closeDrawer()
		}
	}

  	render () {
  	  	return (
			<View style={styles.container}>
				<PhotoComponent
					navigateToProfilePage={this.navigateToProfilePage}
					user={this.props.user}
					updateMessage = {this.props.updateMessage}
					receivedBytes = {this.props.receivedBytes}
					totalBytes = {this.props.totalBytes}
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
	user: state.user.data,
	product: state.product.products,
	updateMessage: state.network.updateMessage,
	receivedBytes: state.network.receivedBytes,
	totalBytes: state.network.totalBytes,
})

const mapDispatchToProps = (dispatch) => ({
	get_products : (req,res,err) => dispatch(actions.product.api.get_products(req,res,err)),
	log_out : () => dispatch(actions.auth.reducer.log_out()),
	reset_products : () => dispatch(actions.product.reducer.reset_products()),
	reset_transaction: () => dispatch(actions.transaction.reducer.reset_transaction())
})

export default connect(mapStateToProps,mapDispatchToProps)(DrawerPage);