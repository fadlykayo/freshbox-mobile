import React, { Component } from 'react';
import { View, Text, Keyboard, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Container from '@components/Container';
import SearchComponent from '../ProductList/components/SearchComponent';
import ProfileBlock from './components/ProfileBlock';
import Carousel from './components/Carousel';
import PromoList from './components/PromoList';
import TransactionBlock from './components/TransactionBlock';
import Categories from './components/Categories';
import actions from '@actions';
import styles from './styles';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchItem: '',
    }

  }
  componentDidMount() {
    this.getProductList();
    this.getCategories();
  }

  getProductList = () => {
		let payload = {
			header: {
				apiToken: this.props.user ? this.props.user.authorization : ''
			},
			params: this.props.params
		}
		this.props.get_products(payload,
			() => {
				console.warn('success')
			},
			(err) => {
				// console.log(err);
			}
		);
	}

  getCategories = () => {
		let payload = {
			header: {},
			params: {}
		}
		this.props.get_categories(payload,
			() => {},
			(err) => {
				// console.log(err);
			}
		);
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
      <ScrollView style={styles.scrollView}>
        <ProfileBlock/>

        <View style={styles.whiteBackground}>
        
          <View
            style={styles.spacer}
          />
          <PromoList
            product = {this.props.product}
          />
          <Categories
            categories = {this.props.categories}
          />
          <TransactionBlock/>
        </View>

        

        <Carousel/>
      </ScrollView>
        


      
      
     
      </Container>

    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  on_category: state.product.on_category,
	categories: state.product.categories,
  product: state.product.products,
  params: state.product.params,
})

const mapDispatchToProps = dispatch => ({
  search_products: (req,res,err) => dispatch(actions.product.api.search_products(req,res,err)),
  get_products : (req,res,err) => dispatch(actions.product.api.get_products(req,res,err)),
  get_categories: (req,res,err) => dispatch(actions.product.api.get_categories(req,res,err)),

})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
