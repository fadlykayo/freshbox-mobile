import {
  Animated,
  Dimensions,
  Easing,
  Keyboard,
  Linking,
  Platform,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {actNav, navConstant} from '@navigations';
import {analytics, language, onShare, scaling} from '@helpers';

import Carousel from '@components/Carousel';
import Categories from './components/Categories';
import CategoriesPopUp from './components/CategoriesPopUp';
import Checkout from '../ProductList/components/Checkout';
import Container from '@components/Container';
import FilterComponent from './components/FilterComponent';
import PopUp from './components/PopUp';
import ProductDetail from '@components/ProductDetail';
import ProductItem from '@components/ProductItem';
import PromoList from './components/PromoList';
import SearchComponent from '../ProductList/components/SearchComponent';
import StaticText from '@components/StaticText';
import TransactionBlock from './components/TransactionBlock';
import actions from '@actions';
import config from '../../config';
import {connect} from 'react-redux';
import styles from './styles';

const {width, height} = Dimensions.get('window');

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchItem: '',
      currentHeight: height,
      productListHeight: height,
      announcement: false,
      updateType: 'mandatory',
      announcementMessage: 'minor',
      scrollX: 0,
      bubble: 0,
      modalVisible: {
        openCategories: false,
        openProduct: false,
        openImageDetail: false,
        checkout: false,
        filterComponent: false,
      },
      loadingTransaction: false,
      refreshing: false,
      banner: [
        {
          title: 'Terbaru dari Kami',
          subtitle: 'Akan Hadir produck baru pada 10 September 2019',
        },
        {
          title: 'Terbaru dari Kami',
          subtitle: 'Akan Hadir produck baru pada 10 September 2019',
        },
        {
          title: 'Terbaru dari Kami',
          subtitle: 'Akan Hadir produck baru pada 10 September 2019',
        },
      ],
      loading: {
        promoList: false,
        categories: false,
        transaction: false,
      },
      promoCode: '',
      scrollY: '',
    };
    this.offSet = 0;
    this.showCheckout = new Animated.Value(0);
    this.showFilterValue = new Animated.Value(0);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.total_count == 0) {
      this.outroAnimate();
    } else if (this.props.total_count == 0 && nextProps.total_count == 1) {
      this.introAnimate();
    }
    return true;
  }

  async componentDidMount() {
    await this.getProductList(true, true);
    await this.getProductPromo();
    await this.handleDeepLink();
    await this.versionChecker();
    await this.getCategories();
    await this.getBanner();
    await this.checkCart();
    await this.getHistoryData();
    await this.hideFilterAnimation();
    await this.getCart()
  }

  componentWillUnmount = () => {
    this.removeLinking();
  };

  versionChecker = () => {
    let version;
    if (Platform.OS == 'ios') {
      version = config.version.ios.split('-');
    } else {
      version = config.version.android.split('-');
    }

    let payload = {
      header: {
        apiToken: this.props.user ? this.props.user.authorization : '',
      },
      body: {
        version: version[0],
      },
    };
    this.props.version_checker(
      payload,
      () => {},
      (err) => {
        if (err.data.current_version.active > 0) {
          if (err.data.error_status !== 'notrelease') {
            if (err.data.error_status) {
              let state = JSON.parse(JSON.stringify(this.state));
              state.announcement = true;
              state.updateType = err.data.current_version.type;
              state.announcementMessage =
                err.data.error_status == 'codepush' ? 'minor' : 'major';
              this.setState(state);
            }
          }
        }
      },
    );
  };

  handleDeepLink = () => {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then((url) => {
        this.navigate(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
  };

  handleOpenURL = (event) => {
    this.navigate(event.url);
  };

  navigate = (url) => {
    // const route = url.replace(/.*?:\/\//g, '');
    // const routeName = route.split('/');
    // const routeTarget = routeName[0];
    // const product = routeName[1].split("_").join(" ");
    // // console.warn(routeName)
    // switch (routeTarget) {
    // 	case 'ProductList':
    // 		this.submitSearch(product);
    // 		break;
    // 	default:
    // 		break;
    // }
  };

  removeLinking = () => {
    Linking.removeEventListener('url', this.handleOpenURL);
  };

  // cart button slide up animation
  introAnimate = () => {
    this.showCheckout.setValue(0);
    const createAnimation = (value, duration, easing, delay = 0) => {
      return Animated.timing(value, {
        toValue: 1,
        duration,
        easing,
        delay,
        // useNativeDriver: true,
      });
    };
    Animated.parallel([
      createAnimation(this.showCheckout, 200, Easing.ease, 0),
    ]).start();
  };

  // cart button slide down animation
  outroAnimate = () => {
    this.showCheckout.setValue(0);
    const createAnimation = (value, duration, easing, delay = 0) => {
      return Animated.timing(value, {
        toValue: 1,
        duration,
        easing,
        delay,
        // useNativeDriver: true,
      });
    };
    Animated.parallel([
      createAnimation(this.showCheckout, 200, Easing.ease, 0),
    ]).start();
  };

  showFilterAnimation = () => {
    this.showFilterValue.setValue(0);
    const createAnimation = (value, duration, easing, delay = 0) => {
      return Animated.timing(value, {
        toValue: 1,
        duration,
        easing,
        delay,
        // useNativeDriver: true,
      });
    };
    Animated.parallel([
      createAnimation(this.showFilterValue, 200, Easing.ease, 0),
    ]).start();
    let state = JSON.parse(JSON.stringify(this.state));
    state.modalVisible.filterComponent = true;
    this.setState(state);
  };

  hideFilterAnimation = () => {
    this.showFilterValue.setValue(0);
    const createAnimation = (value, duration, easing, delay = 0) => {
      return Animated.timing(value, {
        toValue: 1,
        duration,
        easing,
        delay,
        // useNativeDriver: false,
      });
    };
    Animated.parallel([
      createAnimation(this.showFilterValue, 200, Easing.ease, 0),
    ]).start();
    let state = JSON.parse(JSON.stringify(this.state));
    state.modalVisible.filterComponent = false;
    this.setState(state);
  };

  // validate if cart not empty
  checkCart = () => {
    if (this.props.total_count > 0) {
      this.introAnimate();
    }
  };

  getProductPromo = (fromDashboard) => {
    let categories_code;
    this.setLoading('promoList', true);

    this.props.categories.map((c, i) => {
      if (c.name.toUpperCase() == 'SPECIAL DEALS') {
        categories_code = c.code;
      }
    });

    let payload = {
      header: {
        apiToken: this.props.user ? this.props.user.authorization : '',
      },
      body: {},
      params: {...this.props.paramsPromo},
    };
    this.props.get_promo(
      payload,
      () => {
        this.setLoading('promoList', false);

        if (this.props.navigation.state.params.action) {
          if (!fromDashboard) {
            this.navigateToCart();
          }
        }
      },
      (err) => {},
    );
  };

  handleLoadMore = () => {
    let categories_code;
    this.setLoading('promoList', true);

    this.props.categories.map((c, i) => {
      if (c.name.toUpperCase() == 'SPECIAL DEALS') {
        categories_code = c.code;
      }
    });

    if (this.props.paramsPromo.page <= this.props.paramsPromo.last_page) {
      let payload = {
        header: {
          apiToken: this.props.user ? this.props.user.authorization : '',
        },
        body: {},
        params: {...this.props.paramsPromo, category_code: categories_code},
      };

      this.props.get_promo(
        payload,
        () => {
          this.setLoading('promoList', false);

          if (this.props.navigation.state.params.action) {
            // eslint-disable-next-line no-undef
            if (!fromDashboard) {
              this.navigateToCart();
            }
          }
        },
        (err) => {},
      );
    }
  };

  getCart = () => {
    if(this.props.user && this.props.navigation.state.params.action !== 'reorder') {
      let payload = {
        header: {
          apiToken: this.props.user ? this.props.user.authorization : '',
        },
      };
      this.props.get_cart(payload)
    }
    // if(this.props.saved_carts.length > 0) {
    //   this.props.get_saved_carts(this.props.saved_carts)
    // }
  }

  getProductList = (fromDashboard, refresh = false) => {
    let payload = {
      header: {
        apiToken: this.props.user ? this.props.user.authorization : '',
      },
      // params: this.props.params,
      params: refresh
        ? {
            per_page: String(this.props.product.length),
          }
        : this.props.params,
      // params: {
      //   // page: 1,
      //   per_page: String(this.props.product.length)
      // }
    };

    this.props.get_products(
      payload,
      () => {
        if (this.props.navigation.state.params.action) {
          if (!fromDashboard) {
            this.navigateToCart();
          }
        }
      },
      (err) => {},
    );
  };

  getBanner = () => {
    let payload = {
      header: '',
      params: '',
    };
    this.props.get_banner(
      payload,
      (res) => {},
      (err) => {},
    );
  };

  validateCart = () => {
    let outStockCart = this.props.cart_product
      .slice()
      .filter((item) => item.count > item.stock);

    let outOfStockNames = [];
    outStockCart.forEach((item, index) => {
      if (item.name) {
        outOfStockNames.push(' ' + item.name.trim() + ' ');
      }
    });

    if (outStockCart.length > 0) {
      language.transformText('message.outOfStock').then((message) => {
        this.props.set_error_status({
          status: true,
          title: 'formError.title.outOfStock',
          data: `${message}\n\nOut of stock: ${outOfStockNames}`,
        });
      });
      // this.navigateToCart();
    } 
    this.navigateToCart();
  };

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

  navigateToCart = () => {
    if (this.props.cart_product.length) {
      if (this.props.user) {
        let buyProducts = [];
        this.props.cart_product.map((cart) => {
          buyProducts.push({
            product_code: cart.code,
            qty: cart.count,
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
          });
        });
        let payload = {
          header: {
            apiToken: this.props.user.authorization,
          },
          body: buyProducts,
        };
      //   this.props.bulk_add_products(
      //     payload,
      //     (res) => {
      //       // if(this.props.saved_carts.length > 0) {
      //       //   this.props.save_cart([])
      //       // }
      //       actNav.navigate(navConstant.Cart, {
      //         createOrderHandler: this.createOrderHandler,
      //       });
      //     },
      //     (err) => {},
      //   );
      // } else {
      //   // this.props.save_cart(this.props.cart_product)
      //   actNav.navigate(navConstant.Cart, {
      //     createOrderHandler: this.createOrderHandler,
      //   });
      }
      actNav.navigate(navConstant.Cart, {
        createOrderHandler: this.createOrderHandler,
      });
    }
  };

  createOrderHandler = (invoice, type) => {
    new Promise((res) => {
      actNav.goBackToTop();
      this.props.clear_products();
      res();
    }).then(() => {
      setTimeout(() => this.navigateToPaymentSuccess(invoice, type), 1000);
    });
  };

  getCategories = () => {
    let payload = {
      header: {},
      params: {},
    };
    this.props.get_categories(
      payload,
      () => {
        this.getProductPromo();
      },
      (err) => {},
    );
  };

  onChangeText = (type, value) => {
    let state = JSON.parse(JSON.stringify(this.state));
    state[type] = value;
    this.setState(state);
  };

  clearSearch = () => {
    this.onChangeText('searchItem', '');
  };

  submitSearch = (searchItem) => {
    let payload = {
      header: {
        apiToken: this.props.user ? this.props.user.authorization : '',
      },
      body: {},
      params: {
        page: 1,
        // stock: 'tersedia',
        sort: 'nama-az',
        name: searchItem ? searchItem : this.state.searchItem,
        // category_code: category_code,
      },
    };

    analytics.log('Search_Product', {
      name: searchItem ? searchItem : this.state.searchItem,
    });

    this.props.search_products(
      payload,
      (success) => {
        this.onChangeText('search', true);
        if (searchItem) {
          actNav.navigate(navConstant.ProductList, {
            fromDashboard: true,
            detailProduct: success.data.data,
            showPromo: false,
          });
        } else {
          actNav.navigate(navConstant.ProductList, {
            fromDashboard: true,
            showPromo: false,
          });
        }
        // this.backToTop();
      },
      (err) => {},
    );
  };

  getHistoryData() {
    this.setState({loadingTransaction: true});
    if (this.props.user) {
      let payload = {
        header: {
          apiToken: this.props.user.authorization,
        },
        params: this.props.transactionParams,
      };

      this.props.get_transaction(
        payload,
        () => {
          this.setState({loadingTransaction: false});
        },
        (err) => {
          this.setState({loadingTransaction: false});
        },
      );
    } else {
      this.setState({loadingTransaction: false});
    }
  }

  toggleFavorite = (payload) => {
    if (payload.wishlisted == 1) {
      let data = {
        request: {
          header: {
            apiToken: this.props.user.authorization,
          },
          body: {},
        },
        favorite: payload,
      };
      this.props.delete_favorite(
        data,
        () => {},
        (err) => {},
      );
    } else {
      let data = {
        request: {
          header: {
            apiToken: this.props.user.authorization,
          },
          body: {
            product_code: payload.code,
          },
        },
        favorite: payload,
      };
      this.props.add_favorite(
        data,
        () => {},
        (err) => {},
      );
    }
  };

  openDrawerMenu = () => {
    Keyboard.dismiss();
    this.props.navigation.openDrawer();
  };

  setModalVisible(type, value) {
    let modalVisible = JSON.parse(JSON.stringify(this.state.modalVisible));
    modalVisible[type] = value;
    this.setState({modalVisible});
  }

  setLoading = (type, value) => {
    let loading = JSON.parse(JSON.stringify(this.state.loading));
    loading[type] = value;
    this.setState({loading});
  };

  openDetailProduct = (payload) => {
    this.props.detail_product(payload);
    this.setModalVisible('openProduct', true);
  };

  closeDetailProduct = () => {
    if (this.props.setModalVisible) {
      this.props.set_modal_visible(!this.props.setModalVisible);
    }
    this.setModalVisible('openProduct', false);
  };

  openDetailProductPicture = (payload) => {
    this.props.detail_product(payload);
    this.setModalVisible('openProduct', true);
  };

  changeTotalItem = (payload, type) => {
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
  };

  openZoomImage = () => {
    this.setModalVisible('openImageDetail', true);
  };

  // handling zoom products' image
  closeZoomImage = () => {
    this.setModalVisible('openImageDetail', false);
  };

  // get position of scrollbar
  getPositionIndex = (e) => {
    this.setState({scrollX: e.nativeEvent.contentOffset.x}, () => {
      this.getPositionBubble();
    });
  };

  getPositionBubble = () => {
    let position = Math.round(this.state.scrollX / (width * 0.18));

    if (this.state.bubble != position) {
      this.setState({bubble: position});
    }
  };

  navigateToDetail = (input) => {
    let payload = {
      header: {
        apiToken: this.props.user.authorization,
      },
      invoice: input.invoice,
    };
    this.props.detail_transaction(
      payload,
      () => {
        actNav.navigate(navConstant.Detail, {
          action: 'history',
          createOrderSuccess: true,
          refreshHandler: this.refreshHandler,
        });
      },
      (err) => {},
    );
  };

  navigateToPaymentSuccess = (input, type) => {
    const {status} = this.props.transactionDetail;
    let payload = {
      header: {
        apiToken: this.props.user.authorization,
      },
      invoice: input,
    };

    this.props.detail_transaction(
      payload,
      () => {
        if (type === 'gopay' || type === 'credit_card') {
          if (status === 'paid') {
            actNav.navigate(navConstant.Thanks, {
              refreshHandler: this.refreshHandler,
              invoice: type,
            });
          } else {
            actNav.navigate(navConstant.Detail, {
              action: 'history',
              createOrderSuccess: false,
              invoice: type,
              refreshHandler: this.refreshHandler,
              fromDashboard: true,
            });
          }
        } else {
          actNav.navigate(navConstant.Detail, {
            action: 'history',
            createOrderSuccess: true,
            invoice: type,
            refreshHandler: this.refreshHandler,
            fromDashboard: true,
          });
        }
      },
      (err) => {
        console.warn('navigate to detail', err);
      },
    );
  };

  refreshHandler = () => {
    let fromDashboard = true;
    this.getProductList(fromDashboard);
    this.getHistoryData();
    this.getProductPromo();
  };

  navigateToCategories = (category) => {
    let payload = {};
    switch (category.name.toUpperCase()) {
      case 'DEFAULT':
        payload = {
          header: {
            apiToken: this.props.user ? this.props.user.authorization : '',
          },
          body: {},
          params: {
            page: 1,
            sort: 'nama-az',
          },
        };
        break;
      case 'SPECIAL DEALS':
        payload = {
          header: {
            apiToken: this.props.user ? this.props.user.authorization : '',
          },
          body: {},
          params: {
            page: 1,
            sort: 'nama-az',
            // category_code: category.code,
            on_promo: 1,
          },
        };

        break;

      default:
        payload = {
          header: {
            apiToken: this.props.user ? this.props.user.authorization : '',
          },
          body: {},
          params: {
            page: 1,
            sort: 'nama-az',
            // stock: 'tersedia'
            category_code: category.code,
          },
        };

        break;
    }

    this.props.change_categories(category);
    this.props.search_products(
      payload,
      () => {
        if (this.state.modalVisible.openCategories) {
          this.closeDialogCategories();
        }
        const reset = () => {
          this.offSet = 0;
          actNav.navigate(navConstant.ProductList, {
            fromDashboard: true,
            showPromo: false,
          });
        };
        this.setState(
          {
            currentHeight: height,
          },
          reset(),
        );
      },
      (err) => {
        if (this.state.modalVisible.openCategories) {
          this.closeDialogCategories();
        }
      },
    );
  };

  navigateToPromo = () => {
    let category_code;
    let category;
    let payload;

    this.props.categories.map((c, i) => {
      if (c.name.toUpperCase() == 'SPECIAL DEALS') {
        category_code = c.code;
        category = c;
      }
    });
    payload = {
      header: {
        apiToken: this.props.user ? this.props.user.authorization : '',
      },
      body: {},
      params: {
        page: 1,
        sort: 'nama-az',
        // stock: 'tersedia',
        // category_code: category_code,
        on_promo: 1,
      },
    };
    this.props.change_categories(category);
    this.props.search_products(
      payload,
      () => {
        actNav.navigate(navConstant.ProductList, {
          fromDashboard: true,
          showPromo: false,
          fromPromo: true,
        });
      },
      (err) => {},
    );
  };

  navigateToBannerDetail = (product) => {
    let payload = {
      header: {
        apiToken: this.props.user ? this.props.user.authorization : '',
      },
      body: {},
      params: {
        bannerID: product.id,
      },
    };

    this.props.get_detail_banner(
      payload,
      (res) => {
        if (product.links && product.links !== '') {
          actNav.navigate(navConstant.BannerDetail, {links: product.links});
        } else {
          actNav.navigate(navConstant.BannerDetail);
        }
      },
      (err) => {},
    );
  };

  handleLoadMoreProducts = () => {
    let category_code = null;

    this.props.categories.map((c) => {
      if (this.props.on_category !== 'Default') {
        if (c.name == this.props.on_category) {
          category_code = c.code;
        }
      }
    });

    if (this.props.current_page <= this.props.last_page) {
      let params = {...this.props.params};
      if (params.category_code) {
        params.category_code = undefined;
      }
      let payload = {
        header: {
          apiToken: this.props.user ? this.props.user.authorization : '',
        },
        body: {},
        params: params,
      };
      this.props.get_products(
        payload,
        () => {
          let state = JSON.parse(JSON.stringify(this.state));
          state.currentHeight = state.currentHeight * 1.3;
          this.setState(state);
        },
        (err) => {
          // console.warn(err);
        },
      );
    } else {
      // this.setState({listLoading: false})
    }
  };

  navigateToCampaign = () => {
    actNav.navigate(navConstant.Campaigns);
  };

  navigateToProductList = () => {
    this.getCategories();
    actNav.navigate(navConstant.ProductList, {showPromo: false});
  };

  closePopUpInfo = (success) => {
    this.setState(
      {
        announcement: false,
      },
      () => {
        if (success) {
          success();
        }
      },
    );
  };

  onRefresh = () => {
    this.setState({refreshing: true}, () => {
      this.versionChecker();
      this.getProductList(true, true);
      this.getCategories();
      this.getProductPromo();
      this.getBanner();
      this.checkCart();
      this.getHistoryData();
      this.getCart()
    });
    this.setState({refreshing: false});
  };

  renderProducts = (products) => {
    return products.map((product, index) => {
      return (
        <View key={index}>
          <ProductItem
            dashboard
            search={this.state.search}
            data={product}
            index={index + 1}
            type={'productList'}
            user={this.props.user}
            toggleFavorite={this.toggleFavorite}
            changeTotalItem={this.changeTotalItem}
            productLength={products.length}
            openDetailProduct={this.openDetailProduct}
          />
        </View>
      );
    });
  };

  onScrollEvent = (e) => {
    const currentOffset = e.nativeEvent.contentOffset.y;
    const currentHeight = this.state.currentHeight;
    const productListHeight = this.state.productListHeight;
    const dif = currentOffset - (this.offSet || 0);

    const transactionsShown = (currentOffset, height) => {
      let transactions = this.props.transactions;
      if (transactions !== undefined && transactions.length > 0) {
        return currentOffset / height > 1;
      } else {
        return currentOffset / height > 0.95;
      }
    };

    if (Math.abs(dif) < 3) {
    } else if (dif < 0) {
      if (this.state.modalVisible.filterComponent) {
        this.hideFilterAnimation();
      }
    } else {
      if (currentOffset / currentHeight > 1.3) {
        // this.handleLoadMoreProducts()
      }
      if (
        transactionsShown(currentOffset, height) &&
        !this.state.modalVisible.filterComponent
      ) {
        this.showFilterAnimation();
      }
    }
    this.offSet = currentOffset;
  };

  openAllCategories = () => {
    this.setModalVisible('openCategories', true);
  };

  closeDialogCategories = () => {
    this.setModalVisible('openCategories', false);
  };

  render() {
    const introButton = this.showCheckout.interpolate({
      inputRange: [0, 1],
      outputRange: [-(width * 0.3), 0],
    });
    const outroButton = this.showCheckout.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -(width * 0.3)],
    });
    const filterVisible = this.showFilterValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, scaling.moderateScale(50)],
    });
    const filterHide = this.showFilterValue.interpolate({
      inputRange: [0, 1],
      outputRange: [scaling.moderateScale(50), 0],
    });

    return (
      <Container backgroundColor={'white'} containerColor>
        <SearchComponent
          // dashboard
          menubar
          type={'searchItem'}
          title={'productList.searchPlaceHolder'}
          value={this.state.searchItem}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.submitSearch}
          openDrawerMenu={this.openDrawerMenu}
          clearSearch={this.clearSearch}
        />
        <FilterComponent
          onCategory={this.props.on_category}
          modalVisible={this.state.modalVisible.filterComponent}
          showFilter={filterVisible}
          dismissFilter={filterHide}
          openAllCategories={this.openAllCategories}
          // openDeliveryInfo = {this.openDeliveryInfo}
        />

        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          onScroll={this.onScrollEvent}
          scrollEventThrottle={200}>
          <View style={styles.whiteBackground}>
            <Carousel
              products={this.props.banners}
              navigateToBannerDetail={this.navigateToBannerDetail}
              navigateToCampaign={this.navigateToCampaign}
              user={this.props.user}
              onShare={onShare}
            />

            <PromoList
              product={this.props.promoProduct}
              user={this.props.user}
              toggleFavorite={this.toggleFavorite}
              openDetailProduct={this.openDetailProduct}
              loadingPromo={this.state.loading.promoList}
              handleLoadMore={this.handleLoadMore}
              navigateToPromo={this.navigateToPromo}
              changeTotalItem={this.changeTotalItem}
            />

            <Categories
              categoriesPage={this.props.categories_pages}
              categories={this.props.categories}
              navigateToCategories={this.navigateToCategories}
            />

            <TransactionBlock
              transactions={this.props.transactions}
              loadingTransaction={this.state.loadingTransaction}
              navigateToDetail={this.navigateToDetail}
            />

            <View style={styles.productList.outerContainer}>
              <View style={styles.productList.container}>
                <StaticText
                  style={styles.productList.textBold}
                  property={'dashboard.productList.title'}
                />
                <TouchableOpacity onPress={this.navigateToProductList}>
                  <StaticText
                    style={styles.productList.textBoldSmall}
                    property={'dashboard.productList.more'}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.productList.rowContainer}>
                {this.renderProducts(this.props.product)}
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
            modalVisible={
              this.state.modalVisible.openProduct || this.props.setModalVisible
            }
            openImageDetail={this.state.modalVisible.openImageDetail}
            onShare={onShare}
          />

          <PopUp
            visible={this.state.announcement}
            closePopUpInfo={this.closePopUpInfo}
            updateType={this.state.updateType}
            announcementMessage={this.state.announcementMessage}
          />
        </ScrollView>

        <CategoriesPopUp
          changeCategory={this.navigateToCategories}
          categories={this.props.categories}
          modalVisible={this.state.modalVisible.openCategories}
          closeDialogCategories={this.closeDialogCategories}
        />

        <Checkout
          introButton={introButton}
          outroButton={outroButton}
          validateCart={this.validateCart}
          totalCount={this.props.total_count}
          totalPrice={this.props.total_price}
          modalVisible={this.state.modalVisible.checkout}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.data,
  on_category: state.product.on_category,
  categories: state.product.categories,
  categories_pages: state.product.categories_pages,
  product: state.product.products,
  promoProduct: state.product.promoProduct,
  params: state.product.params,
  paramsPromo: state.product.paramsPromo,
  transactionParams: state.transaction.params,
  transactionDetail: state.transaction.detail,
  transactions: state.transaction.transactions,
  productDetail: state.product.detail,
  banners: state.banners.banners,
  total_price: state.product.total.price,
  total_count: state.product.total.count,
  cart_product: state.product.cart.products,
  current_page: state.product.params.page,
  last_page: state.product.last_page,
  announcement: state.utility.announcement,
  setModalVisible: state.product.setModalVisible,
  saved_carts: state.carts.carts
});

const mapDispatchToProps = (dispatch) => ({
  search_products: (req, res, err) =>
    dispatch(actions.product.api.search_products(req, res, err)),
  get_promo: (req, res, err) =>
    dispatch(actions.product.api.get_promo(req, res, err)),
  get_cart: (req, res, err) =>
    dispatch(actions.product.api.get_cart(req, res, err)),
  post_cart: (req, res, err) =>
    dispatch(actions.product.api.post_cart(req, res, err)),
  get_products: (req, res, err) =>
    dispatch(actions.product.api.get_products(req, res, err)),
  get_categories: (req, res, err) =>
    dispatch(actions.product.api.get_categories(req, res, err)),
  get_transaction: (req, res, err) =>
    dispatch(actions.transaction.api.get_transaction(req, res, err)),
  delete_favorite: (req, res, err) =>
    dispatch(actions.product.api.delete_favorite(req, res, err)),
  add_favorite: (req, res, err) =>
    dispatch(actions.product.api.add_favorite(req, res, err)),
  detail_product: (payload) =>
    dispatch(actions.product.reducer.detail_product(payload)),
  detail_transaction: (req, res, err) =>
    dispatch(actions.transaction.api.detail_transaction(req, res, err)),
  clear_products: () => dispatch(actions.product.reducer.clear_products()),
  clear_product_lists: () =>
    dispatch(actions.product.reducer.clear_product_lists()),
  reset_params: () => dispatch(actions.product.reducer.reset_params()),
  get_banner: (req, res, err) =>
    dispatch(actions.banner.api.get_banner(req, res, err)),
  change_categories: (payload) =>
    dispatch(actions.product.reducer.change_categories(payload)),
  get_detail_banner: (req, res, err) =>
    dispatch(actions.banner.api.get_detail_banner(req, res, err)),
  set_error_status: (payload) =>
    dispatch(actions.network.reducer.set_error_status(payload)),
  change_total: (payload, type) =>
    dispatch(actions.product.reducer.change_total(payload, type)),
  announcement: (payload) =>
    dispatch(actions.utility.reducer.announcement(payload)),
  version_checker: (req, res, err) =>
    dispatch(actions.utility.api.version_checker(req, res, err)),
  set_modal_visible: (payload) =>
    dispatch(actions.product.reducer.set_modal_visible(payload)),
  get_product_detail: (req, res, err) =>
    dispatch(actions.product.api.get_product_detail(req, res, err)),
  bulk_add_products: (req, res, err) =>
    dispatch(actions.transaction.api.bulk_add_products(req, res, err)),
  save_cart: (payload) =>
    dispatch(actions.cart.reducer.save_cart(payload)),
  get_saved_carts: (req, res, err) =>
    dispatch(actions.product.reducer.get_saved_carts(req, res, err)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
