import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, FlatList, Keyboard, TouchableOpacity, Dimensions, Platform, Image, Animated, Easing, Text, Modal, TouchableHighlight, ActivityIndicator, Share, BackHandler, ScrollView, RefreshControl} from 'react-native';
import {language, permission, encode64, onShare} from '@helpers';
import {actNav, navConstant} from '@navigations';
import Checkout from './components/Checkout';
import ProductItem from '@components/ProductItem';
import ProductDetail from '@components/ProductDetail';
import Container from '@components/Container';
import StaticText from '@components/StaticText';
import EmptyState from '@components/EmptyState';
import SearchComponent from './components/SearchComponent';
import FilterComponent from './components/FilterComponent';
import Notes from './components/Notes';
import Categories from './components/Categories';
import images from '@assets';
import {debounce} from 'lodash';
import styles from './styles';
import actions from '@actions';
import ChangesAreaPopUp from './components/ChangesAreaPopUp';

const {width, height} = Dimensions.get('window');

class ProductList extends Component {
	constructor (props) {
		super(props);
		this.state = {
			refreshing: false,
			currentHeight: height,
			searchItem: '',
			search: false,
			onCategory: '',
			indexProduct: 0,
			scrollX: 0,
			bubble: 0,
			detailDataProduct: {},
			modalVisible: {
				openCategories: false,
				openProduct: false,
				openImageDetail: false,
				checkout: false,
				delivery: false,
				changesArea: false
			},
			listLoading: false,
			wasSearching: false,
			broadcast_message: '',
			drawerVisible: false,
			defaultCategory: '',
			isArea: false,
			listArea : [
				{
					check: true,
					code: "CAT-0",
					name: "Jakarta",
					parent_count: 0,
					parent_id: 0,
					slug: "default",
					position: 1
				},
				{
					check: false,
					code: "CAT-1",
					name: "Bandung",
					parent_count: 0,
					parent_id: 0,
					slug: "default",
					position: 2
				},
				{
					check: false,
					code: "CAT-2",
					name: "Surabaya",
					parent_count: 0,
					parent_id: 0,
					slug: "default",
					position: 3
				}
			],
			selectedTempArea: {}
		};
		this.listRef = null;
		this.submitSearch = this.submitSearch.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
		this.checkCategory = this.checkCategory.bind(this);
		this.validateCart = this.validateCart.bind(this);
		this.refreshHandler = this.refreshHandler.bind(this);
		this.toggleFavorite = this.toggleFavorite.bind(this);
		this.changeCategory = this.changeCategory.bind(this);
		this.openDrawerMenu = this.openDrawerMenu.bind(this);
		this.handleLoadMore = this.handleLoadMore.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);
		this.changeTotalItem = this.changeTotalItem.bind(this);
		this.navigateToCart = this.navigateToCart.bind(this);
		this.openAllCategories = this.openAllCategories.bind(this);
		// this.openDetailProduct = this.openDetailProduct.bind(this);
		this.createOrderHandler = this.createOrderHandler.bind(this);
		this.closeDetailProduct = this.closeDetailProduct.bind(this);
		this.closeDialogCategories = this.closeDialogCategories.bind(this);
		this.getFavorites = this.getFavorites.bind(this);
		this._renderButton = this._renderButton.bind(this);
		this.backToDefault = this.backToDefault.bind(this);
		this.backToTop = this.backToTop.bind(this);
		this.getPositionIndex = this.getPositionIndex.bind(this);
		this.getPositionBubble = this.getPositionBubble.bind(this);
		this.openZoomImage = this.openZoomImage.bind(this);
		this.closeZoomImage = this.closeZoomImage.bind(this);
		this.refreshProductList = this.refreshProductList.bind(this);
		this.checkNotification = this.checkNotification.bind(this);
		this.openFromNotification = this.openFromNotification.bind(this);
		this.introAnimate = this.introAnimate.bind(this);
		this.outroAnimate = this.outroAnimate.bind(this);
		this.showCheckout = new Animated.Value(0);
		this.openDeliveryInfo = this.openDeliveryInfo.bind(this);
		this.closeDeliveryInfo = this.closeDeliveryInfo.bind(this);
	}

	componentDidMount() {
		if (!this.props.navigation.state.params.fromDashboard) {
			this.getProductList();
		}
		if (this.props.navigation.state.params.detailProduct) {
			this.openDetailProduct(this.props.navigation.state.params.detailProduct[0]);
		}
		this.checkCategory();
		this.getFavorites();
		this.checkNotification();
		this.checkCart();
		this.apiBroadcastMessage();
		if (Platform.OS == 'android') {
			permission.requestSaveExternal();
		}
	}

	componentWillUnmount = () => {
		this.getProductList('unmount');
	};


	shouldComponentUpdate(nextProps, nextState) {

		if (nextProps.total_count == 0) this.outroAnimate();
		else {
			if (this.props.total_count == 0 && nextProps.total_count == 1) this.introAnimate();
		}
		return true;
	}

	// backButtonAndroid = () => {
	// 	BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	// }

	// unMountBackButton = () => {
	// 	this.backButtonAndroid.remove()
	// }

	// handleBackPress = async () => {
	// 	await this.getProductList();
	// 	actNav.goBack();
	// 	return true
	// }

	apiBroadcastMessage() {
		let payload = {
			header: {
				apiToken: this.props.user ? this.props.user.authorization : ''
			},
			body: {},
			params: {}
		};
		this.props.get_broadcast_message(
			payload,
			() => {
				let state = this.state;
				state.broadcast_message = this.props.broadcast_message;
				this.setState(state);
				// console.warn('success')
			},
			(err) => {

			}
		);
	}

	// cart button slide up animation
	introAnimate() {
		this.showCheckout.setValue(0);
		const createAnimation = (value, duration, easing, delay = 0) => {
			return Animated.timing(
				value,
				{
					toValue: 1,
					duration,
					easing,
					delay,
					// useNativeDriver: true,
				}
			);
		};
		Animated.parallel([createAnimation(this.showCheckout, 200, Easing.ease, 0)]).start();
	}

	// cart button slide down animation
	outroAnimate() {
		this.showCheckout.setValue(0);
		const createAnimation = (value, duration, easing, delay = 0) => {
			return Animated.timing(
				value,
				{
					toValue: 1,
					duration,
					easing,
					delay,
					// useNativeDriver: true,
				}
			);
		};
		Animated.parallel([createAnimation(this.showCheckout, 200, Easing.ease, 0)]).start();
	}

	// validate if cart not empty
	checkCart() {
		if (this.props.total_count > 0) this.introAnimate();
	}

	// check notification from onesignal
	checkNotification() {
		if (this.props.notif) {
			if (this.props.notif.action == 'open.transaction') {
				this.openFromNotification(this.props.notif.invoice);
			}
		}
	}

	// open notification from onesignal -> navigate to page Detail
	openFromNotification(input) {
		let payload = {
			header: {
				apiToken: this.props.user.authorization,
			},
			invoice: input
		};
		this.props.detail_transaction(payload,
			() => {
				actNav.navigate(navConstant.Detail, {
					action: 'history',
					createOrderSuccess: false,
					refreshHandler: this.refreshHandler,
				});
			},
			(err) => {}
		);
	}

	//handle deliveries information modal
	openDeliveryInfo() {
		this.setModalVisible('delivery', true);
	}

	closeDeliveryInfo() {
		this.setModalVisible('delivery', false);
	}

	// handling zoom products' image
	openZoomImage() {
		this.setModalVisible('openImageDetail', true);
	}

	// handling zoom products' image
	closeZoomImage() {
		this.setModalVisible('openImageDetail', false);
	}

	// get position of scrollbar
	getPositionIndex(e) {
		this.setState({scrollX: e.nativeEvent.contentOffset.x}, () => {
			this.getPositionBubble();
		});
	}

	getPositionBubble() {
		let position = Math.round(this.state.scrollX / (width * 0.18));

		if (this.state.bubble != position) {
			this.setState({bubble: position});
		}
	}

	_renderButton(index, length) {
		if (this.state.search) {
			if (index == length) {
				return (
					<TouchableOpacity style={styles.clear.button} onPress={this.backToDefault}>
						<StaticText
							style={styles.clear.text}
							property={'productList.button.clear'}
						/>
					</TouchableOpacity>
				);
			}
			else return null;
		}
		else return null;
	}

	backToDefault() {
		this.props.clear_product_lists();
		this.onChangeText('search', false);
		this.onChangeText('searchItem', '');
		this.props.reset_params();
		this.setState({refreshing: true}, () => {
			if (this.state.search) {
				this.onChangeText('search', false);
			}
			this.getProductList();
		});
	}

	onChangeText(type, value) {

		clearTimeout(this.timeout); //clear old timeout

		let state = JSON.parse(JSON.stringify(this.state));
		state[type] = value;

		this.setState(state, () => {
			if (type == 'searchItem') {
				this.timeout = setTimeout(() => this.submitSearch(), 500); //wait until user finish their input
			};
		});

	}

	clearSearch() {
		this.onChangeText('searchItem', '');
	}

	setModalVisible(type, value) {
		let modalVisible = JSON.parse(JSON.stringify(this.state.modalVisible));
		modalVisible[type] = value;
		this.setState({modalVisible});
	}

	refreshHandler() {
		this.setState({refreshing: true}, () => {
			if (this.state.search) {
				this.backToDefault();
			} else {
				this.refreshProductList();
				this.apiBroadcastMessage();
			}
		});
	}

	refreshProductList() {
		let payload;

		let category_code = null;

		this.props.categories.map(c => {
			if (this.props.on_category !== "Default") {

				if (c.name == this.props.on_category) {
					category_code = c.code;
				}

			}
		});

		if (this.props.navigation.state.params.fromPromo) {
			payload = {
				header: {
					apiToken: this.props.user ? this.props.user.authorization : ''
				},
				params: {
					page: 1,
					// per_page: this.props.product.length,
					// stock: 'tersedia',
					sort: 'nama-az',
					on_promo: 1
				}
			};
		} else if (this.props.navigation.state.params.fromBanner) {
			let category = this.props.navigation.state.params.category;
			payload = {
				header: {
					apiToken: this.props.user ? this.props.user.authorization : ''
				},
				body: {},
				params: {
					page: 1,
					banner_id: this.props.currentDetail.new_products[category].info.banner_id,
					category_code: this.props.currentDetail.new_products[category].info.category_code,
					product_detail_type: this.props.currentDetail.new_products[category].info.product_detail_type
				}
			};
		} else {
			payload = {
				header: {
					apiToken: this.props.user ? this.props.user.authorization : ''
				},
				params: {
					page: 1,
					// per_page: this.props.product.length,
					// stock: 'tersedia',
					sort: 'nama-az',
					category_code: category_code
				}
			};
		}
		this.props.get_products(payload,
			() => {
				if (this.state.refreshing != false) this.setState({refreshing: false});
			},
			(err) => {}
		);
	}

	getProductList(unload) {

		let payload = {
			header: {
				apiToken: this.props.user ? this.props.user.authorization : ''
			},
			params: this.props.params
		};

		if (unload) {
			payload = {
				header: {
					apiToken: this.props.user ? this.props.user.authorization : ''
				},
				params: {
					page: 1,
					sort: 'nama-az'
				}
			};
		}
		this.props.get_products(payload,
			() => {
				if (this.state.refreshing != false) this.setState({refreshing: false});
				if (this.props.navigation.state.params.action) this.navigateToCart();
			},
			(err) => {}
		);
	}

	getFavorites() {
		if (this.props.user) {
			let payload = {
				header: {
					apiToken: this.props.user.authorization
				}
			};
			this.props.get_favorites(payload,
				(success) => {
				},
				(err) => {});
		}
	}

	getCategories() {
		let payload = {
			header: {},
			params: {}
		};
		this.props.get_categories(payload,
			() => { },
			(err) => {}
		);
	}

	handleLoadMore() {

		this.setState({listLoading: true});
		let category_code = null;

		this.props.categories.map(c => {
			if (this.props.on_category !== "Default") {

				if (c.name == this.props.on_category) {
					category_code = c.code;
				}

			}
		});

		if (this.props.current_page <= this.props.last_page && this.props.product.length > 3) {
			let payload = {
				header: {
					apiToken: this.props.user ? this.props.user.authorization : ''
				},
				body: {},
				params: {...this.props.params}
			};
			this.props.get_products(payload,
				() => {
					let state = JSON.parse(JSON.stringify(this.state));
					state.currentHeight = state.currentHeight * 1.3;
					state.listLoading = false;
					this.setState(state);
				},
				(err) => {
					console.warn(err);
				});

		} else {
			this.setState({listLoading: false});
		}
	}

	checkCategory() {
		let categories = this.props.categories;
		let category = '';
		for (let i = 0; i < categories.length; i++) {
			if (categories[i].check === true) {
				category = categories[i].name;
			}
		}
		this.onChangeText('onCategory', category);
		this.onChangeText('defaultCategory', category);
	}

	backToTop() {
		if (this.props.product.length > 0) {
			this.listRef.scrollToOffset({y: 0.5, animated: true});
		};
	}

	changeCategory(input) {
		// this.onChangeText('searchItem', '')
		if (this.props.navigation.state.params.fromBanner) {
			let category = this.props.navigation.state.params.category;
			let payload = {
				header: {
					apiToken: this.props.user ? this.props.user.authorization : ''
				},
				body: {},
				params: {
					page: 1,
					banner_id: this.props.currentDetail.new_products[category].info.banner_id,
					category_code: input.code,
					product_detail_type: this.props.currentDetail.new_products[category].info.product_detail_type
				}
			};
			this.props.search_products(payload,
				() => {
					this.props.change_categories(input);
					this.checkCategory();
					this.closeDialogCategories();
					// this.backToTop();
				},
				(err) => {});
		} else if (input.name == 'Default') {
			let payload = {
				header: {
					apiToken: this.props.user ? this.props.user.authorization : ''
				},
				body: {},
				params: {
					page: 1,
					sort: 'nama-az',
					// stock: 'tersedia'
				}
			};

			this.props.search_products(payload,
				() => {
					this.props.change_categories(input);
					this.checkCategory();
					this.closeDialogCategories();
					// this.backToTop();
				},
				(err) => {});
		}
		else {

			let payload = {
				header: {
					apiToken: this.props.user ? this.props.user.authorization : ''
				},
				body: {},
				params: {
					page: 1,
					sort: 'nama-az',
					// stock: 'tersedia',
					category_code: input.code,
				}
			};

			if (input.name.toUpperCase() == 'SPECIAL DEALS') {
				payload = {
					header: {
						apiToken: this.props.user ? this.props.user.authorization : ''
					},
					body: {},
					params: {
						page: 1,
						sort: 'nama-az',
						// stock: 'tersedia',
						// on_promo: 1,
						category_code: input.code,
					}
				};
			}

			this.props.search_products(payload,
				() => {
					this.props.change_categories(input);
					this.checkCategory();
					this.closeDialogCategories();
					// this.backToTop();
				},
				(err) => {});
		}
	}

	openAllCategories(isArea = false) {
		Keyboard.dismiss();
		this.setModalVisible('openCategories', true);
		if(isArea) {
			this.setState({
			  isArea: true
			})
		  } 
	}

	openDetailProduct = (payload) => {
		this.props.detail_product(payload);
		if (payload.product_category_name !== this.props.on_category) {
			let categoryPayload = {
				name: "Default"
			};

			this.props.change_categories(categoryPayload);
			this.checkCategory();
		}
		this.setModalVisible('openProduct', true);
	};

	closeDialogCategories(isArea = false) {
		this.setModalVisible('openCategories', false);
		if(isArea) {
			this.setState({
			  isArea: false
			})
		  } 
	}

	closeDetailProduct() {
		if (this.props.setModalVisible) {
			this.props.set_modal_visible(!this.props.setModalVisible);
		}

		this.setModalVisible('openProduct', false);
	}

	openDetailProductPicture(payload) {
		this.props.detail_product(payload);
		this.setModalVisible('openProduct', true);
	}

	toggleFavorite(payload) {
		if (payload.wishlisted == 1) {
			let data = {
				request: {
					header: {
						apiToken: this.props.user.authorization
					},
					body: {}
				},
				favorite: payload
			};
			this.props.delete_favorite(data,
				() => { },
				(err) => {}
			);
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
			};
			this.props.add_favorite(data,
				() => { },
				(err) => {}
			);
		}
	}

	changeTotalItem(payload, type) {
	if (payload.count === payload.stock && type === 'inc') {
      this.props.set_error_status({
        status: true,
        title: 'formError.title.outOfStock',
        data: `${payload.name} hanya tersedia ${payload.stock} ${payload.unit}`,
      });
    } else {
      this.props.change_total(payload, type);
	  this.storeCart(payload, type)
    }
	}

	storeCart = (cart, type) => {
		if(this.props.user){
		  let buyProducts = {
			product_code: cart.code,
			qty: 1,
			status_promo: cart.on_promo,
			cart_price: cart.price,
			cart_promo_price:
			  Number(cart.on_promo) === 1
				? cart.banner_harga_jual
				  ? cart.banner_harga_jual
				  : cart.promo_price
				: cart.promo_price,
			remaining_quota:
			  Number(cart.on_promo) === 1
				? Number(cart.quota_claim) > 0
				  ? Number(cart.quota_claim) -
					Number(cart.total_claim_product || 0)
				  : 0
				: 0,
			quota_claim: Number(cart.quota_claim || 0),
			type: type
		  };
			let payload = {
			  header: {
				apiToken: this.props.user.authorization,
			  },
			  body: buyProducts,
			};
	
			this.props.post_cart(
			  payload,
			  (res) => {
				// this.getCart()
			  },
			  (err) => {},
			);
		  } 
	  }

	  getCart = () => {
		if(this.props.user) {
		  let payload = {
			header: {
			  apiToken: this.props.user ? this.props.user.authorization : '',
			},
			params: '',
		  };
		  this.props.get_cart(payload)
		}
	  }

	submitSearch() {
		let payload;
		this.setState({listLoading: false});
		let category_code = null;

		this.props.categories.map(c => {
			if (this.props.on_category !== "Default") {

				if (c.name == this.state.defaultCategory) {
					category_code = c.code;
				}

			}
		});

		if (this.state.searchItem === "") {
			this.props.change_categories({
				name: this.state.defaultCategory
			});
			this.checkCategory();
		}
		if (this.props.navigation.state.params.fromBanner) {
			let category = this.props.navigation.state.params.category;
			payload = {
				header: {
					apiToken: this.props.user ? this.props.user.authorization : ''
				},
				body: {},
				params: {
					page: 1,
					banner_id: this.props.currentDetail.new_products[category].info.banner_id,
					category_code: this.props.currentDetail.new_products[category].info.category_code,
					product_detail_type: this.props.currentDetail.new_products[category].info.product_detail_type,
					sort: 'nama-az',
					name: this.state.searchItem,
				}
			};
		} else {
			payload = {
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
			};
		}


		if (this.state.searchItem === '') {
			payload.params.category_code = category_code;
		}

		this.props.search_products(payload,
			(success) => {
				this.onChangeText('search', true);
				// this.backToTop();
			},
			(err) => {});

	}

	openDrawerMenu() {
		Keyboard.dismiss();
		this.props.navigation.openDrawer();
	}

	validateCart() {
		let outStockCart = this.props.cart_product.slice().filter(item => item.count > item.stock);
		if (outStockCart.length > 0) {
			language.transformText('message.outOfStock')
				.then(message => {
					this.props.set_error_status({
						status: true,
						title: 'formError.title.outOfStock',
						data: message,
					});
				});
		}
		// else {
			this.navigateToCart();
		// }
	}

	navigateToCart() {
		actNav.navigate(navConstant.Cart, {
			createOrderHandler: this.createOrderHandler
		});
	}

	createOrderHandler(invoice, type) {
		new Promise((res) => {
			actNav.goBackToTop();
			this.props.clear_products();
			res();
		})
			.then(() => {
				setTimeout(() => this.navigateToDetail(invoice, type), 1000);
			});
	}

	navigateToDetail(input, type) {
		let payload = {
			header: {
				apiToken: this.props.user.authorization,
			},
			invoice: input
		};
		this.props.detail_transaction(payload,
			() => {
				actNav.navigate(navConstant.Detail, {
					action: 'history',
					createOrderSuccess: true,
					invoice: type,
					refreshHandler: this.refreshHandler,
				});
			},
			(err) => {}
		);
	}

	renderFlatListFooter() {
		// console.warn('masuk')
		if (!this.state.listLoading) {
			return (
				<View style={{flex: 1, height: 100, alignItems: 'center', marginRight: 18}}>
					<Text style={styles.footer.text}>End of Category</Text>
				</View>
			);
		} else {
			return (
				<ActivityIndicator
					size={'small'}
				/>
			);
		}


	}

	onShare = async (data) => {
		let encryptCode = encode64.btoa(data.id);
		const url = `https://freshbox.id/link?code_link=1&code_data=${encryptCode}`;
		const product = data.name.split(" ").join("_");
		try {
			const result = await Share.share({
				message: `Beli ${data.name} Ga Pake Repot Hanya Di Freshbox! Klik disini: ${url}`,
			});

			if (result.action == Share.sharedAction) {
				if (result.activityType) {
					// console.warn(result.activityType)
				} else {
					// console.warn(result)
				}
			} else if (result.action === Share.dismissedAction) {
				// console.warn('dismissed')
			}
		} catch (err) {
			// console.warn(err.message)
		}

	};

	onScrollEvent = (e) => {

		const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
			const paddingToBottom = 20;
			return layoutMeasurement.height + contentOffset.y >=
				contentSize.height - paddingToBottom;
		};

		if (isCloseToBottom(e.nativeEvent)) {
			this.handleLoadMore();
		}

	};

	renderProducts = (products) => {
		let productCards = products.map((product, index) => {
			return (
				<ProductItem
					dashboard
					search={this.state.search}
					data={product}
					index={index + 1}
					type={'productList'}
					user={this.props.user}
					toggleFavorite={this.toggleFavorite}
					changeTotalItem={this.changeTotalItem}
					productLength={this.props.product.length}
					openDetailProduct={this.openDetailProduct}
				/>
			);
		});
		return (
			<ScrollView
				style={styles.scrollView}
				refreshControl={
					<RefreshControl refreshing={this.state.refreshing} onRefresh={this.refreshHandler} />
				}
				onScroll={this.onScrollEvent}
				scrollEventThrottle={0}
			>
				<View style={styles.main.products.container}>
					{productCards}
				</View>
			</ScrollView>
		);
	};

	backHandler = () => {
		this.props.navigation.state.params.refreshProduct = true;
		actNav.goBack();
	};
	openPopUpChangesArea = () => {
		this.setModalVisible('changesArea', true)
	}
	closePopUpChangesArea = () => {
		this.setModalVisible('changesArea', false)
	}
	setSelectedArea = (area) => {
		const data = {
		  ...area,
		  check: true
		}
		this.setState({
		  selectedTempArea: data
		})
	}

	onConfirmSelectedArea = () => {
		const areas = this.state.listArea
		let area = this.state.selectedTempArea
	
		areas.map((list) => {
		  if((list.name === area.name)) {
			list.check = true
		  } else {
			list.check = false
		  }
		  return list
		})
	
		this.setState({
		  listArea: areas
		}, () => {
		  this.closePopUpChangesArea()
		})
	  }
	  
	  onCancelSelectedArea = () => {
		this.setState({
		  selectedTempArea: {}
		})
	  }

	render() {
		const introButton = this.showCheckout.interpolate({
			inputRange: [0, 1],
			outputRange: [-(width * 0.3), 0]
		});
		const outroButton = this.showCheckout.interpolate({
			inputRange: [0, 1],
			outputRange: [0, -(width * 0.3)]
		});

		let products = this.props.navigation.state.params.showPromo ? this.props.promoProduct : this.props.product;
		let data = products && products.filter(x => Number(x.quota_claim) === 0 || Number(x.quota_claim) - Number(x.total_claim_product || 0) > 0 && x) || [];
		return (
			<Container
				bgColorBottom={'veryLightGrey'}
				bgColorTop={'red'}
				containerColor
			>
				<SearchComponent
					type={'searchItem'}
					title={'productList.searchPlaceHolder'}
					value={this.state.searchItem}
					onChangeText={this.onChangeText}
					onSubmitEditing={this.submitSearch}
					openDrawerMenu={this.openDrawerMenu}
					clearSearch={this.clearSearch}
					backHandler={this.backHandler}
					user={this.props.user}
					params={this.props.params}
				/>
				<FilterComponent
					onCategory={this.props.on_category}
					openAllCategories={this.openAllCategories}
					openDeliveryInfo={this.openDeliveryInfo}
					listArea={this.state.listArea}
				/>

				<Notes
					text={this.props.broadcast_message}
				/>
				<View style={styles.container}>
					{
						this.props.product.length > 0 ?
							<FlatList
								contentContainerStyle={{marginLeft: 18}}
								numColumns={2}
								ref={(e) => {this.listRef = e;}}
								data={data}
								onEndReachedThreshold={0.5}
								onRefresh={this.refreshHandler}
								refreshing={this.state.refreshing}
								keyExtractor={(item) => item.code}
								onEndReached={this.handleLoadMore}
								ListFooterComponent={this.renderFlatListFooter.bind(this)}
								renderItem={({item, index}) => (
									<View style={styles.main.products.container} key={index}>
										<ProductItem
											dashboard
											search={this.state.search}
											data={item}
											index={index + 1}
											type={'productList'}
											user={this.props.user}
											toggleFavorite={this.toggleFavorite}
											changeTotalItem={this.changeTotalItem}
											productLength={this.props.product.length}
											openDetailProduct={this.openDetailProduct}
										/>

									</View>
								)}
							/> :
							<EmptyState
								property={'emptyState.search'}
								image={images.empty_search}
							/>

					}


					<Checkout
						introButton={introButton}
						outroButton={outroButton}
						validateCart={this.validateCart}
						totalCount={this.props.total_count}
						totalPrice={this.props.total_price}
						modalVisible={this.state.modalVisible.checkout}
					/>
				</View>
				{/* </View> */}

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
					modalVisible={this.state.modalVisible.openProduct || this.props.setModalVisible}
					onShare={onShare}
				/>
				<Categories
					changeCategory={this.changeCategory}
					categories={this.props.categories}
					modalVisible={this.state.modalVisible.openCategories}
					closeDialogCategories={this.closeDialogCategories}
					listArea={this.state.listArea}
					isArea={this.state.isArea}
					openPopUpChangesArea={this.openPopUpChangesArea}
					setSelectedArea={this.setSelectedArea}
				/>
				<Modal
					animationType='slide'
					transparent={true}
					visible={this.state.modalVisible.delivery}

				>
					<View style={{flex: 1}}>
						<TouchableHighlight style={{flex: 1}} onPress={this.closeDeliveryInfo}>
							<>
								<View style={styles.modal.container}>

								</View>
								<View style={styles.modal.card}>
									<View style={styles.modal.content}>
										<Image
											source={images.icon_favorited}
											style={styles.modal.image}
										/>
										<View>
											<Text style={styles.modal.title}>Cities We Currently Serve</Text>
											<Text style={styles.modal.text}>We are currently serving Jakarta, Depok, and Tangerang area. We will serve other areas soon!</Text>
										</View>
									</View>



								</View>
							</>
						</TouchableHighlight>
					</View>
				</Modal>

			</Container>
		);
	}
}

const mapStateToProps = state => ({
	notif: state.notif.notification,
	user: state.user.data,
	state: state.product,
	cart_product: state.product.cart.products,
	current_page: state.product.params.page,
	params: state.product.params,
	product: state.product.products,
	on_category: state.product.on_category,
	categories: state.product.categories,
	last_page: state.product.last_page,
	total_price: state.product.total.price,
	total_count: state.product.total.count,
	productDetail: state.product.detail,
	broadcast_message: state.utility.broadcast_message,
	promoProduct: state.product.promoProduct,
	network: state.network,
	currentDetail: state.product.currentDetail,
	setModalVisible: state.product.setModalVisible
});

const mapDispatchToProps = dispatch => ({
	reset_params: () => dispatch(actions.product.reducer.reset_params()),
	clear_products: () => dispatch(actions.product.reducer.clear_products()),
	clear_product_lists: () => dispatch(actions.product.reducer.clear_product_lists()),
	add_favorite: (req, res, err) => dispatch(actions.product.api.add_favorite(req, res, err)),
	get_products: (req, res, err) => dispatch(actions.product.api.get_products(req, res, err)),
	detail_product: (payload) => dispatch(actions.product.reducer.detail_product(payload)),
	toggle_favorite: (payload) => dispatch(actions.product.reducer.toggle_favorite(payload)),
	get_favorites: (req, res, err) => dispatch(actions.product.api.get_favorites(req, res, err)),
	set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
	get_categories: (req, res, err) => dispatch(actions.product.api.get_categories(req, res, err)),
	search_products: (req, res, err) => dispatch(actions.product.api.search_products(req, res, err)),
	change_categories: (payload) => dispatch(actions.product.reducer.change_categories(payload)),
	delete_favorite: (req, res, err) => dispatch(actions.product.api.delete_favorite(req, res, err)),
	change_total: (payload, type) => dispatch(actions.product.reducer.change_total(payload, type)),
	detail_transaction: (req, res, err) => dispatch(actions.transaction.api.detail_transaction(req, res, err)),
	get_broadcast_message: (req, res, err) => dispatch(actions.utility.api.broadcast_message(req, res, err)),
	set_modal_visible: (payload) => dispatch(actions.product.reducer.set_modal_visible(payload)),
	get_cart: (req, res, err) =>
    dispatch(actions.product.api.get_cart(req, res, err)),
  	post_cart: (req, res, err) =>
    dispatch(actions.product.api.post_cart(req, res, err)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);