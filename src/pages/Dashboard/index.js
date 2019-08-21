import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import Container from '@components/Container';
import SearchComponent from '../ProductList/components/SearchComponent';
import ProfileBlock from './components/ProfileBlock';
import Carousel from './components/Carousel';
import styles from './styles';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchItem: '',
    }

  }
  onChangeText = (type, value) => {
    let state = JSON.parse(JSON.stringify(this.state));
		state[type] = value;
    this.setState(state);
  }

  clearSearch = () => {
		this.onChangeText('searchItem', '');
	}

  submitSearch = () => {

		// let category_code = null;

		// this.props.categories.map(c => {
		// 	if(this.props.on_category !== "Default") {
				
		// 		if(c.name == this.props.on_category) {
		// 			category_code = c.code
		// 		}

		// 	}
		// });

		// console.warn(category_code)

		let payload={
			header: {
				apiToken: this.props.user ? this.props.user.authorization : ''
			},
			body: {},
			params: {
				page: 1,
				// stock: 'tersedia',
				sort: 'nama-az',
				name: this.state.searchItem,
				// category_code: category_code,
			}
		}

		this.props.search_products(payload, 
			(success) => {
				this.onChangeText('search', true)
				// this.backToTop();
			},
			(err) => {
				// console.log(err);
			});
	
	}

  openDrawerMenu = () => {
		Keyboard.dismiss();
    this.props.navigation.openDrawer();
		// console.log(this.props.navigation.openDrawer)
	}

  render() {
    return (
      <Container
        bgColorBottom = {'veryLightGrey'}
        bgColorTop={'red'}
      >

      <SearchComponent
        type={'searchItem'}
        title={'productList.searchPlaceHolder'}
        value={this.state.searchItem}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.submitSearch}
        openDrawerMenu={this.openDrawerMenu}
        clearSearch={this.clearSearch}
      />
      <View
        style={styles.content2}
      >
      
      </View>

      <ProfileBlock/>
      <Carousel/>
      

      </Container>

    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  on_category: state.product.on_category,
	categories: state.product.categories,
})

const mapDispatchToProps = dispatch => ({
  search_products: (req,res,err) => dispatch(actions.product.api.search_products(req,res,err)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
