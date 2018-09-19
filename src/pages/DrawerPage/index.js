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
					name: 'Dashboard',
					selected: true,
				},
				{
					name: 'Favourites',
					selected: false,
				},
				{
					name: 'History',
					selected: false,
				},
				{
					name: 'Terms & Conditions',
					selected: false,
				},
				{
					name: 'Contact Us',
					selected: false,
				}
			],
			onPage: '',
		}
		this.changePages = this.changePages.bind(this);
		this.navigateToOtherPage = this.navigateToOtherPage.bind(this);
		this.navigateToProfilePage = this.navigateToProfilePage.bind(this);
  	}

	changePages(payload) {
		let pages = this.state.pages.slice();
		pages.map(item => {
			if(item.name == payload.name) item.selected = true
			else item.selected = false
			return item	
		})
		this.setState({pages})
	}

  	navigateToOtherPage(payload) {
		this.changePages(payload);

		if(payload.name === 'Favourites') {
			actNav.navigate(navConstant.Favourites)
		}
		else if(payload.name === 'History') {
			actNav.navigate(navConstant.HistoryPage)
		}
		else if(payload.name === 'Terms & Conditions') {
			actNav.navigate(navConstant.TermsConditions)
		}
		else if(payload.name === 'Contact Us') {
			actNav.navigate(navConstant.ContactUs)
		}
		else {
			actNav.navigate(navConstant.Product)
		}
	}
	  
	navigateToProfilePage() {
		actNav.navigate(navConstant.ProfilePage)
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
									onPress={ () => this.navigateToOtherPage(page)}
									style={styles.selectedPage} key={index}
								>
									<Text style={styles.selectedText}>{page.name}</Text>
								</TouchableOpacity>
							)
						}
						else {
							return (
								<TouchableOpacity 
									onPress={ () => this.navigateToOtherPage(page)}
									style={styles.unselectedPage} key={index}
								>
									<Text style={styles.unselectedText}>{page.name}</Text>
								</TouchableOpacity>
							)
						}
					}) }
  	      		</View>
  	      		<TouchableOpacity style={styles.bottomComponent}>
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