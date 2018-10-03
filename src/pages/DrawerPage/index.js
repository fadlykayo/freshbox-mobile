import React, {Component} from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { actNav, navConstant } from '@navigations';
import StaticText from '@components/StaticText';
import Container from '@components/Container';
import PhotoComponent from './components/PhotoComponent';
import images from '@assets';
import styles from './styles';

class DrawerPage extends Component {
  	constructor(props) {
    	super(props)
    	this.state = {
    	    user: {
    	        name: 'John Doe',
    	        photo: images.icon_img_ava_grey,
    	        email: 'john.doe@freshbox.com',
			},
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
		actNav.reset(navConstant.Menu)
	}

  	render () {
  	  	return (
			<Container>
  	  	  		<View style={styles.container}>
					<PhotoComponent
						navigateToProfilePage={this.navigateToProfilePage}
						user={this.state.user}
					/>
  	      			<View style={styles.middleComponent}>
					{ this.state.pages.map ((page, index) => {
						if (page.selected) {
							return (
								<TouchableOpacity 
									onPress={ () => this.props.navigation.closeDrawer()}
									style={styles.selectedPage} key={index}
								>
									<StaticText
										style={styles.selectedText}
										property={page.name}
									/>
									{/* <Text style={styles.selectedText}>{page.name}</Text> */}
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
									{/* <Text style={styles.unselectedText}>{page.name}</Text> */}
								</TouchableOpacity>
							)
						}
					}) }
  	      		</View>
				<TouchableOpacity 
					onPress={() => this.navigateLogOut()}
					style={styles.bottomComponent}
				>
					<StaticText
						style={styles.logOutText}
						property={'drawerPage.content.logOut'}
					/>
  	      		</TouchableOpacity>
  	    	</View>
		</Container>
  	  	);
  	}
}

export default DrawerPage;