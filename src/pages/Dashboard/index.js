import React, { Component } from 'react';
import { View, Text, Keyboard, ScrollView, Animated, Easing, Dimensions, Linking, Platform, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import ProductDetail from '@components/ProductDetail';
import SearchComponent from '../ProductList/components/SearchComponent';
import ProfileBlock from './components/ProfileBlock';
import Checkout from '../ProductList/components/Checkout';
import Carousel from '@components/Carousel'
import PromoList from './components/PromoList';
import TransactionBlock from './components/TransactionBlock';
import Categories from './components/Categories';
import ProductList from '../ProductList';
import ProductItem from '@components/ProductItem';
import StaticText from '@components/StaticText';
import Announcement from './components/Announcement';
import actions from '@actions';
import styles from './styles';

const { width, height } = Dimensions.get('window');

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
					title: 'Terbaru dari Kami',
					subtitle: 'Akan Hadir produck baru pada 10 September 2019'
				},
				{
					title: 'Terbaru dari Kami',
					subtitle: 'Akan Hadir produck baru pada 10 September 2019'
				},
				{
					title: 'Terbaru dari Kami',
					subtitle: 'Akan Hadir produck baru pada 10 September 2019'
				},
			],
			loading: {
				promoList: false,
				categories: false,
				transaction: false,
			}
    }
		this.showCheckout = new Animated.Value(0);
  }
	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.total_count == 0) this.outroAnimate();
		else if (this.props.total_count == 0 && nextProps.total_count == 1) this.introAnimate();
		return true;
	}
	
  componentDidMount() {
		
		this.getProductList();
		this.getCategories();
		this.getProductPromo();
		this.getBanner();
		this.checkCart();
		this.handleDeepLink();
		// console.warn(this.props.paramsPromo)
		if(this.props.user) {
			this.getHistoryData();

		}

  }

	componentWillUnmount = () => {
		this.removeLinking();
	};
	

	handleDeepLink = () => {
		if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
		// Linking.addEventListener('url', this.handleOpenURL);

	}

	handleOpenURL = (event) => {
		this.navigate(event.url)
	}

	navigate = (url) => {
		const route = url.replace(/.*?:\/\//g, '');
		const routeName = route.split('/');
		const routeTarget = routeName[0];
		const product = routeName[1].split("_").join(" ");
		console.warn(routeName)
		switch (routeTarget) {
			case 'ProductList':
				this.submitSearch(product);
				break;
		
			default:
				break;
		}
	}

	removeLinking = () => {
		Linking.removeEventListener('url', this.handleOpenURL);
	}



	// cart button slide up animation
	introAnimate = () => {
		this.showCheckout.setValue(0);
		const createAnimation = (value, duration, easing, delay = 0) => {
			return Animated.timing(
			 	value,
			 	{
					toValue: 1,
					duration,
					easing,
					delay,
			 	}
			)
		}
		Animated.parallel([createAnimation(this.showCheckout, 200, Easing.ease, 0)]).start()
	}

	// cart button slide down animation
	outroAnimate = () => {
		this.showCheckout.setValue(0);
		const createAnimation = (value, duration, easing, delay = 0) => {
			return Animated.timing(
			 	value,
			 	{
					toValue: 1,
					duration,
					easing,
					delay,
			 	}
			)
		}
		Animated.parallel([createAnimation(this.showCheckout, 200, Easing.ease, 0)]).start();
	}

	// validate if cart not empty
	checkCart = () => {
		if(this.props.total_count > 0) this.introAnimate();
	}

	getProductPromo = (fromDashboard) => {

		let categories_code;
		this.setLoading('promoList', true);

		this.props.categories.map((c, i) => {
			if(c.code == 'Promo') {
				categories_code = c.code;
			}
		})
		let payload = {
			header: {
				apiToken: this.props.user ? this.props.user.authorization : ''
			},
			body: {},
			params: {...this.props.paramsPromo, category_code: categories_code}
		}

			this.props.get_promo(payload, 
				() => {

					this.setLoading('promoList', false);

					if(this.props.navigation.state.params.action) {
						if(!fromDashboard) {
							this.navigateToCart();
						}
					}
				},
				(err) => {
					console.log(err);
				});
	}

	handleLoadMore = () => {
		let categories_code;
		this.setLoading('promoList', true);
		
		this.props.categories.map((c, i) => {
			if(c.code == 'Promo') {
				categories_code = c.code;
			}
		})
		if(this.props.paramsPromo.page <= this.props.paramsPromo.last_page) {
					let payload = {
				header: {
					apiToken: this.props.user ? this.props.user.authorization : ''
				},
				body: {},
				params: {...this.props.paramsPromo, category_code: categories_code}
			}

				this.props.get_promo(payload, 
					() => {

						this.setLoading('promoList', false);

						if(this.props.navigation.state.params.action) {
							if(!fromDashboard) {
								this.navigateToCart();
							}
						}
					},
					(err) => {
						console.log(err);
					});
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

	getBanner = () => {
		let payload = {
			header: '',
			params: '',
		}
		this.props.get_banner(payload,
			(res) => {
				// console.log()
			},
			(err) => {
				// console.warn(err, 'kelar bos')
			}
		)
	}

	validateCart = () => {
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

  submitSearch = (searchItem) => {

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
				name: searchItem ? searchItem : this.state.searchItem,
				// category_code: category_code,
			}
		}

		this.props.search_products(payload, 
			(success) => {
				this.onChangeText('search', true)
				if(searchItem) {
					actNav.navigate(navConstant.ProductList, {fromDashboard: true, detailProduct: success.data.data})
				} else {
					actNav.navigate(navConstant.ProductList, {fromDashboard: true})
				}
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

	setLoading = (type, value) => {
		let loading = JSON.parse(JSON.stringify(this.state.loading));
		loading[type] = value;
		this.setState({loading});
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

	changeTotalItem = (payload,type) => {
		this.props.change_total(payload,type);
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

	navigateToCategories = (category) => {
		let payload = {}
		if (category.name == 'Default') {
			payload = {
				header: {
					apiToken: this.props.user ? this.props.user.authorization : ''
				},
				body: {},
				params: {
					page: 1,
					sort: 'nama-az',
					// stock: 'tersedia'
				}
			}

			this.props.search_products(payload, 
				() => {
					actNav.navigate(navConstant.ProductList, {fromDashboard: true})
				},
				(err) => {
					console.log(err);
				});
		}
		else {
			if(category.name === 'Promo') {
				console.log('promo')
				payload = {
					header: {
						apiToken: this.props.user ? this.props.user.authorization : ''
					},
					body: {},
					params: {
						page: 1,
						sort: 'nama-az',
						// stock: 'tersedia',
						category_code: category.code,
						on_promo: 1,
					}
				}
			} else {
				payload = {
					header: {
						apiToken: this.props.user ? this.props.user.authorization : ''
					},
					body: {},
					params: {
						page: 1,
						sort: 'nama-az',
						// stock: 'tersedia',
						category_code: category.code,
					}
				}
			}
			

			this.props.search_products(payload, 
				() => {
					actNav.navigate(navConstant.ProductList, {fromDashboard: true})
				},
				(err) => {
					console.log(err);
				});
		}		
	}

	navigateToBannerDetail = (product) => {
		let payload = {
		header: {
				apiToken: this.props.user ? this.props.user.authorization : ''
			},
			body: {},
			params: {
				bannerID: product.id,
			}
		};

		this.props.get_detail_banner(payload,
			(res) => {

				if(product.links && product.links !== '') {
					actNav.navigate(navConstant.BannerDetail, {links: product.links})
				} else {
					actNav.navigate(navConstant.BannerDetail)
				}
				
			},
			(err) => {
				console.log('err', err)
			}
		) 

	}

		handleLoadMoreProducts = () => {
		// this.setState({listLoading: true})

		console.warn('masuk')
		let category_code = null;

		this.props.categories.map(c => {
			if(this.props.on_category !== "Default") {
				
				if(c.name == this.props.on_category) {
					category_code = c.code
				}

			}
		});

		if(this.props.current_page <= this.props.last_page) {
			let payload = {
				header: {
					apiToken: this.props.user ? this.props.user.authorization : ''
				},
				body: {},
				params: {...this.props.params, category_code: category_code}
			}
			this.props.get_products(payload,
				() => {
					console.warn('cuess')
				},
				(err) => {
					console.warn(err);
				});

		} else {
			this.setState({listLoading: false})
		}
	}

	navigateToCampaign = () => {
		actNav.navigate(navConstant.Campaigns);
	}

  render() {
		
		const introButton = this.showCheckout.interpolate({
			inputRange: [0, 1],
			outputRange: [-(width * 0.3), 0]
		})
		const outroButton = this.showCheckout.interpolate({
			inputRange: [0, 1],
			outputRange: [0, -(width * 0.3)]
		})

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
					navigateToCampaign = {this.navigateToCampaign}
				/>

        <View style={styles.whiteBackground}>
        
          <View
            style={styles.spacer}
          />
					<Categories
            categories = {this.props.categories}
						navigateToCategories = {this.navigateToCategories}
          />
					<Announcement
						data = {this.state.banner}
					/>
          <PromoList
            product = {this.props.promoProduct}
						user = {this.props.user}
						toggleFavorite = {this.toggleFavorite}
						openDetailProduct = {this.openDetailProduct}
						loadingPromo = {this.state.loading.promoList}
						handleLoadMore = {this.handleLoadMore}
          />
          

					<TransactionBlock
						transactions = {this.props.transactions}
						navigateToDetail = {this.navigateToDetail}
					/>
					
					<View style={styles.productList.outerContainer}>
					<View style={styles.productList.container}>
						<StaticText
							style={styles.productList.textBold}
							property={'dashboard.productList.title'}
						/>
						<StaticText
							style={styles.productList.textBoldSmall}
							property={'dashboard.productList.more'}
						/>
					</View>
					<View style={{height: 600}}>
					<FlatList
								// ref={(e) => { this.listRef = e}}
								data={this.props.product}
								onEndReachedThreshold={0.5}
								// onRefresh={this.refreshHandler}
								// refreshing={this.state.refreshing}
								keyExtractor={(item) => item.code}
								onEndReached={this.handleLoadMoreProducts}
								// ListFooterComponent={this.renderFlatListFooter.bind(this)}
								renderItem={({item,index}) => (
									<View key={index}>

										<ProductItem
											search={this.state.search}
											data={item}
											index={index+1}
											type={'productList'}
											user={this.props.user}
											toggleFavorite={this.toggleFavorite}
											// changeTotalItem={this.changeTotalItem}
											productLength={this.props.product.length}
											openDetailProduct= {this.openDetailProduct}
										/>
										
										{/* { this._renderButton(index, this.props.product.length - 1) } */}
									</View>
								)}
							/>
							</View>
						</View>
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
					products = {this.props.banners}
					navigateToBannerDetail = {this.navigateToBannerDetail}
				/>
      </ScrollView>

			

      
      <Checkout
					introButton={introButton}
					outroButton={outroButton}
					validateCart={this.validateCart}
					totalCount={this.props.total_count}
					totalPrice={this.props.total_price}
					modalVisible={this.state.modalVisible.checkout}
				/>
     
      </Container>

    )
					
		
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  on_category: state.product.on_category,
	categories: state.product.categories,
  product: state.product.products,
	promoProduct: state.product.promoProduct,
  params: state.product.params,
	paramsPromo: state.product.paramsPromo,
	transactionParams: state.transaction.params,
	transactions: state.transaction.transactions,
	productDetail: state.product.detail,
	banners: state.banners.banners,
	total_price: state.product.total.price,
	total_count: state.product.total.count,
	cart_product: state.product.cart.products,
	current_page: state.product.params.page,
	last_page: state.product.last_page,
})

const mapDispatchToProps = dispatch => ({
  search_products: (req,res,err) => dispatch(actions.product.api.search_products(req,res,err)),
	get_promo: (req,res,err) => dispatch(actions.product.api.get_promo(req,res,err)),
  get_products : (req,res,err) => dispatch(actions.product.api.get_products(req,res,err)),
  get_categories: (req,res,err) => dispatch(actions.product.api.get_categories(req,res,err)),
	get_transaction: (req,res,err) => dispatch(actions.transaction.api.get_transaction(req,res,err)),
	delete_favorite: (req,res,err) => dispatch(actions.product.api.delete_favorite(req,res,err)),
	add_favorite: (req,res,err) => dispatch(actions.product.api.add_favorite(req,res,err)),
	detail_product : (payload) => dispatch(actions.product.reducer.detail_product(payload)),
	detail_transaction: (req,res,err) => dispatch(actions.transaction.api.detail_transaction(req,res,err)),
	clear_products: () => dispatch(actions.product.reducer.clear_products()),
	reset_params: () => dispatch(actions.product.reducer.reset_params()),
	get_banner: (req,res,err) => dispatch(actions.banner.api.get_banner(req, res, err)),
	change_categories: (payload) => dispatch(actions.product.reducer.change_categories(payload)),
	get_detail_banner: (req, res, err) => dispatch(actions.banner.api.get_detail_banner(req,res,err)),
	set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
	change_total : (payload,type) => dispatch(actions.product.reducer.change_total(payload,type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
