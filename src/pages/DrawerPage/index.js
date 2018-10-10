import React, {Component} from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { actNav, navConstant } from '@navigations';
import StaticText from '@components/StaticText';
import Container from '@components/Container';
import PhotoComponent from './components/PhotoComponent';
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
		actNav.navigate(navConstant.SignIn)
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
					
  	      			<View style={styles.middleComponent}>
					{ this.state.pages.map ((page, index) => {
						if (page.selected) {
							return (
								<TouchableOpacity 
									onPress={ this.closeDrawerPage }
									style={styles.selectedPage} key={index}
								>
									<StaticText
										style={styles.selectedText}
										property={page.name}
									/>
								</TouchableOpacity>
							)
						}
						else {
							return (
								<TouchableOpacity 
									onPress={ () => this.navigateToOtherPage(page)}
									style={styles.unselectedPage} key={index}
								>
									<StaticText
										style={styles.unselectedText}
										property={page.name}
									/>
								</TouchableOpacity>
							)
						}
					}) }
  	      		</View>
				{ this.props.user == null ? (
					<TouchableOpacity 
						onPress={this.navigateSignIn}
						style={styles.bottomComponent}
					>
						<StaticText
							style={styles.logOutText}
							property={'drawerPage.content.login'}
						/>
  	      			</TouchableOpacity>
				) : (
					<TouchableOpacity 
						onPress={this.navigateLogOut}
						style={styles.bottomComponent}
					>
						<StaticText
							style={styles.logOutText}
							property={'drawerPage.content.logOut'}
						/>
  	      			</TouchableOpacity>
				)}
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