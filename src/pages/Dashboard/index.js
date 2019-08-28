import React, { Component } from 'react';
import { View, Text, Keyboard, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import ProductDetail from '@components/ProductDetail';
import SearchComponent from '../ProductList/components/SearchComponent';
import ProfileBlock from './components/ProfileBlock';
// import Carousel from './components/Carousel';
import Carousel from '@components/Carousel'
import PromoList from './components/PromoList';
import TransactionBlock from './components/TransactionBlock';
import Categories from './components/Categories';
import ProductList from '../ProductList';
import actions from '@actions';
import styles from './styles';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchItem: '',
			scrollX: 0,
			bubble: 0,
			modalVisible: {
				openCategories: false,
				openProduct: false,
				openImageDetail: false,
				checkout: false,
			},
			loadingTransaction: true,
			banner: [
				{
					title: '1'
				},
				{
					title: '2'
				},
				{
					title: '3'
				},
			]
    }

  }
  componentDidMount() {
		if(this.props.user) {
			this.getProductList();
			this.getCategories();
			this.getHistoryData();
		} else {
			this.getProductList();
			this.getCategories();
		}

  }

  getProductList = (fromDashboard) => {
		let payload = {
			header: {
				apiToken: this.props.user ? this.props.user.authorization : ''
			},
			params: this.props.params
		}
		this.props.get_products(payload,
			() => {
				if(this.props.navigation.state.params.action) {
					if(!fromDashboard) {
						this.navigateToCart();
					}
				} 
			},
			(err) => {
				// console.log(err);
			}
		);
	}

	validateCart = () => {
		console.warn('masuk sini')
		let outStockCart = this.props.cart_product.slice().filter(item => item.count > item.stock);
		if(outStockCart.length > 0){
			language.transformText('message.outOfStock')
			.then(message => {
				this.props.set_error_status({
					status: true,
					title: 'formError.title.outOfStock',
					data: message,
				});
			});
		}
		else{
			this.navigateToCart();
		}
	}

	navigateToCart = () => {
		actNav.navigate(navConstant.Cart,{
			createOrderHandler: this.createOrderHandler,
		});
	}

	createOrderHandler = (invoice,type) => {
		new Promise((res) => {
			actNav.goBackToTop();
			this.props.clear_products();
			res();
		})
		.then(() => {
			setTimeout(() => this.navigateToPaymentSuccess(invoice,type),1000);
		});
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

	getHistoryData(){
		this.setState({loadingTransaction: true})
		let payload = {
			header: {
				apiToken: this.props.user.authorization,
			},
			params: this.props.transactionParams
		}

		this.props.get_transaction(payload, 
			() => {this.setState({loadingTransaction: false})},
			(err) => {
				// console.log(err);
			})
	}

	toggleFavorite = (payload) => {
		if (payload.wishlisted == 1) {
			let data = {
				request: {
					header: {
						apiToken: this.props.user.authorization
					},
					body: {}
				},
				favorite: payload
			}
			this.props.delete_favorite(data,
				() => {},
				(err) => {
					// console.log(err);
				}
			)
		}
		else {
			let data = {
				request: {
					header: {
						apiToken: this.props.user.authorization
					},
					body: {
						product_code: payload.code
					}
				},
				favorite: payload
			}
			this.props.add_favorite(data,
				() => {},
				(err) => {
					// console.log(err);
				}
			)
		}
	}


  openDrawerMenu = () => {
		Keyboard.dismiss();
    this.props.navigation.openDrawer();
		// console.log(this.props.navigation.openDrawer)
	}

	setModalVisible(type,value){
		let modalVisible = JSON.parse(JSON.stringify(this.state.modalVisible));
		modalVisible[type] = value;
		this.setState({modalVisible});
	}

	openDetailProduct = (payload) => {
		this.props.detail_product(payload);
		this.setModalVisible('openProduct',true);
	}

	closeDetailProduct = () => {
		this.setModalVisible('openProduct',false);
	}

	openDetailProductPicture = (payload) => {
		this.props.detail_product(payload);
		this.setModalVisible('openProduct', true);
	}

	changeTotalItem = () => {
		console.log('change total item')
	}

	openZoomImage = () => {
		this.setModalVisible('openImageDetail',true);
	}

	// handling zoom products' image
	closeZoomImage = () => {
		this.setModalVisible('openImageDetail',false);
	}

	// get position of scrollbar
	getPositionIndex = (e) => {
        this.setState({ scrollX: e.nativeEvent.contentOffset.x }, () => {
            this.getPositionBubble();
        })
    }
    
	getPositionBubble = () => {
			let position = Math.round(this.state.scrollX/(width* 0.18));

			if (this.state.bubble != position) {
					this.setState({ bubble: position })
			}
	}

	navigateToDetail = (input) => {
		let payload = {
			header: {
				apiToken: this.props.user.authorization,
			},
			invoice: input.invoice
		}
		this.props.detail_transaction(payload,
			() => {
				actNav.navigate(navConstant.Detail,{
					action: 'history',
					refreshHandler: this.refreshHandler
				});
			},
			(err) => {
				console.log(err);
			}
		)
	}

	navigateToPaymentSuccess = (input, type) => {
		let payload = {
			header: {
				apiToken: this.props.user.authorization,
			},
			invoice: input
		}
		this.props.detail_transaction(payload,
			() => {
				actNav.navigate(navConstant.Detail,{
					action: 'history',
					createOrderSuccess: true,
					invoice: type,
					refreshHandler: this.refreshHandler,
					fromDashboard: true
				});
			},
			(err) => {
				console.log('navigate to detail', err);
			}
		)
	}

	refreshHandler = () => {
		let fromDashboard = true;
		this.props.reset_params();
		this.getProductList(fromDashboard);
		this.getHistoryData();
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
      <ScrollView style={styles.scrollView} bounces={false}>

        <ProfileBlock
					user = {this.props.user}
				/>

        <View style={styles.whiteBackground}>
        
          <View
            style={styles.spacer}
          />
          <PromoList
            product = {this.props.product}
						user = {this.props.user}
						toggleFavorite = {this.toggleFavorite}
						openDetailProduct = {this.openDetailProduct}
          />
          <Categories
            categories = {this.props.categories}
          />
          <TransactionBlock
						transactions = {this.props.transactions}
						navigateToDetail = {this.navigateToDetail}
					/>
					
        </View>

				<ProductDetail
					type={'productList'}
					user={this.props.user}
					bubble={this.state.bubble}
					scrollX={this.state.scrollX}
					data={this.props.productDetail}
					openZoomImage={this.openZoomImage}
					closeZoomImage={this.closeZoomImage}
					toggleFavorite={this.toggleFavorite}
					changeTotalItem={this.changeTotalItem}
					getPositionIndex={this.getPositionIndex}
					getPositionBubble={this.getPositionBubble}
					closeDetailProduct={this.closeDetailProduct}
					modalVisible={this.state.modalVisible.openProduct}
					openImageDetail={this.state.modalVisible.openImageDetail}
				/>

        <Carousel
					products = {this.state.banner}
				/>
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
	transactionParams: state.transaction.params,
	transactions: state.transaction.transactions,
	productDetail: state.product.detail,
})

const mapDispatchToProps = dispatch => ({
  search_products: (req,res,err) => dispatch(actions.product.api.search_products(req,res,err)),
  get_products : (req,res,err) => dispatch(actions.product.api.get_products(req,res,err)),
  get_categories: (req,res,err) => dispatch(actions.product.api.get_categories(req,res,err)),
	get_transaction: (req,res,err) => dispatch(actions.transaction.api.get_transaction(req,res,err)),
	delete_favorite: (req,res,err) => dispatch(actions.product.api.delete_favorite(req,res,err)),
	add_favorite: (req,res,err) => dispatch(actions.product.api.add_favorite(req,res,err)),
	detail_product : (payload) => dispatch(actions.product.reducer.detail_product(payload)),
	detail_transaction: (req,res,err) => dispatch(actions.transaction.api.detail_transaction(req,res,err)),
	clear_products: () => dispatch(actions.product.reducer.clear_products()),
	reset_params: () => dispatch(actions.product.reducer.reset_params()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
