import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Keyboard,
  ScrollView,
  Animated,
  Easing,
  Dimensions,
  Linking,
  Platform,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {actNav, navConstant} from '@navigations';
import {language, analytics, scaling, onShare, hasObjectValue} from '@helpers';
import Container from '@components/Container';
import ProductDetail from '@components/ProductDetail';
import SearchComponent from '../ProductList/components/SearchComponent';
import Checkout from '../ProductList/components/Checkout';
import Carousel from '@components/Carousel';
import PromoList from './components/PromoList';
import TransactionBlock from './components/TransactionBlock';
import Categories from './components/Categories';
import CategoriesPopUp from './components/CategoriesPopUp';
import ProductItem from '@components/ProductItem';
import StaticText from '@components/StaticText';
import FilterComponent from './components/FilterComponent';
import PopUp from './components/PopUp';
import actions from '@actions';
import styles from './styles';
import config from '../../config';
import ChangesAreaPopUp from './components/ChangesAreaPopUp';
import {copilot, walkthroughable, CopilotStep} from 'react-native-copilot';
import TooltipComponent from './components/TooltipComponent'

const {width, height} = Dimensions.get('window');

class Dashboard extends Component {
  static propTypes = {
    start: PropTypes.func.isRequired,
    copilotEvents: PropTypes.shape({
      on: PropTypes.func.isRequired,
    }).isRequired,
  };
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
        changesArea: false,
      },
      loadingTransaction: false,
      ignoreModalArea: false,
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
      isArea: false,
      selectedTempArea: props.selectedBranch? props.selectedBranch : {
        id: 1
      },
      isOpenBannerDetail: {status: false, data: {}},
      isOpenProductDetail: {status: false, data: {}}

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

    componentDidMount () {
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
        if(this.props.navigation.state.params.action !== 'reorder') {
          if(this.props.selectedBranch !== undefined) {
            this.setState({
              selectedTempArea: this.props.selectedBranch
            }, () => {
              this.checkBranch()
            })
          } else {
            this.checkBranch()
          }
        }
        if(this.props.navigation.state.params.action === 'reorder') {
         this.getProductList(false, true);
         actNav.reset(navConstant.Dashboard)
        }
      }
    )
    this.getCategories();
    this.checkCart();
    this.handleDeepLink();
    this.versionChecker();
    this.getHistoryData();
    this.hideFilterAnimation();
  }

  checkBranch = () => {
    const branchID = this.state.selectedTempArea.id
    let payload = {
			header: {
				apiToken: this.props.user ? this.props.user.authorization : '',
			},
      params: {
        branch_id: branchID
      }
		}
    if (this.props.user) {
        this.props.check_branch( payload,
        (res) => {
          if (res) {
              this.getListBranch()
          }
        },
        (err) => {
            this.setState({
              ignoreModalArea: true
            }, () => {
              this.getListBranch(false)
              // this.openPopUpChangesArea()
              this.onConfirmSelectedArea()
            })
        }
      )
    } else {
       this.getListBranch()
    }
  }

  getListBranch = (change = true) => {
		let payload = {
			header: {
				apiToken: this.props.user ? this.props.user.authorization : '',
			},
		}
		 this.props.get_list_branch(payload, 
        (res) => {
        if(res) {
          if(change) {
            this.getProductList(true, true);
            this.getProductPromo();
            this.getCart()
            this.getBanner();
          }
        }
      },
      (err) => {}
    )
	}

  handleStepChange = (step) => {
    console.warn(`Current step is: ${step.name}`);
  };

  componentWillUnmount = () => {
    this.removeLinking();
    this.willFocusListener.remove()
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
      Linking.addEventListener('url', this.handleOpenURL)
      // Linking.getInitialURL().then((url) => {
      //   this.navigate(url);
      // });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
  };

  handleOpenURL = (event) => {
    this.navigate(event);
  };

  navigate = async (e) => {
    const url = e.url.replace(/.*?:\/\//g, '');
    const id = url.match(/\/([^\/]+)\/?$/)[1].split('?')[0];
    const branchID = url.match(/\/([^\/]+)\/?$/)[1].split('?')[1].split('=')[1]
    const routeTarget = url.split('/')[0]
    const selectedAreaWeb = this.props.listBranch?.filter(branch => branch.id == branchID)[0]
    this.setSelectedArea(selectedAreaWeb)
    // // console.warn(routeName)
    await actNav.navigate(navConstant.Dashboard)
    if(routeTarget == '1'){
      this.setState({
        isOpenBannerDetail: {status: true, data: {id: id}}
      })
    } else if(routeTarget == '2') {
      this.setState({
        isOpenProductDetail: {status: true, data: {id, id}}
      })
    }
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

  getProductPromo = (fromDashboard = false, changeBranch = false) => {
    const branchID = this.state.selectedTempArea.id
    let categories_code;
    const { selectedBranch } = this.props
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
      params: {
        ...this.props.paramsPromo , 
        branch_id: branchID,
      },
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
      const branchID = this.state.selectedTempArea.id
      let payload = {
        header: {
          apiToken: this.props.user ? this.props.user.authorization : '',
        },
        params: {
          branch_id: branchID,
          session_cart: 1
        }
      };
      this.props.get_cart(payload,
        (res) => {},
        () => {}
      )
    }
    // if(this.props.saved_carts.length > 0) {
    //   this.props.get_saved_carts(this.props.saved_carts)
    // }
  }

  getProductList = (fromDashboard, refresh = false, withBranch = false) => {
    const branchID = this.state.selectedTempArea.id
    let payload = {
      header: {
        apiToken: this.props.user ? this.props.user.authorization : '',
      },
      // params: this.props.params,
      params: refresh
        ? {
            per_page: String(this.props.product.length),
            branch_id: branchID,
          }
        : withBranch ? {
          ...this.props.params,
          page: 1,
          branch_id: branchID,
        } : {
          ...this.props.params,
          branch_id: branchID,
        },
      // params: {
      //   // page: 1,
      //   per_page: String(this.props.product.length)
      // }
    };


    this.props.get_products(
      payload,
      () => {
        if(this.props.tour_guide) {
          this.props.copilotEvents.on('stepChange', this.handleStepChange);
          this.props.start();
        }
        if (this.props.navigation.state.params.action) {
          if (!fromDashboard) {
            this.validateCart()
          }
        }
      },
      (err) => {},
    );
  };

  getBanner = () => {
    const branchID = this.state.selectedTempArea.id
    let payload = {
      header: '',
      params: {
        branch_id: branchID,
      },
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
    const branchID = this.state.selectedTempArea.id
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
        type: type,
        branch_id: branchID
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
    const branchID = this.state.selectedTempArea.id
    let payload = {
      header: {},
      params: {
        branch_id: branchID
      },
    };
    this.props.get_categories(
      payload,
      () => {
        // this.getProductPromo();
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
    const branchID = this.state.selectedTempArea.id
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
        branch_id: branchID,
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
    this.setState({
      isOpenProductDetail: {status: false, data: {}}
    })
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
    this.getProductPromo(false, true);
  };

  navigateToCategories = (category) => {
    const branchID = this.state.selectedTempArea.id
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
            branch_id: branchID,
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
            branch_id: branchID,
            special_deals: 1
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
            branch_id: branchID,
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
    const branchID = this.state.selectedTempArea.id
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
        special_deals: 1,
        branch_id: branchID,
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
    const branchID = this.state.selectedTempArea.id
    let payload = {
      header: {
        apiToken: this.props.user ? this.props.user.authorization : '',
      },
      body: {},
      params: {
        bannerID: product.id,
        branch_id: branchID,
      },
    };

    this.props.get_detail_banner(
      payload,
      (res) => {
        if (product.links && product.links !== '') {
          actNav.navigate(navConstant.BannerDetail, {links: product.links, onBackground: true});
        } else {
          actNav.navigate(navConstant.BannerDetail);
        }
        this.setState({isOpenBannerDetail:{
          status: false,
          data: {}
        }})
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

  openAllCategories = (isArea = false) => {
    this.setModalVisible('openCategories', true);
    if(isArea) {
      this.setState({
        isArea: true
      })
    } 
  };

  closeDialogCategories = (isArea = false) => {
    if(!this.state.ignoreModalArea) {
      this.setModalVisible('openCategories', false);
      if(isArea) {
        this.setState({
          isArea: false
        })
      } 
    }
  };

  closePopUpChangesArea = () => {
    this.setModalVisible('changesArea', false)
  }

  openPopUpChangesArea = () => {
    this.setModalVisible('changesArea', true)
  }

  setSelectedArea = (area) => {
    if(area.id === this.props.selectedBranch.id) {
      this.closeDialogCategories(true)
      this.getAllDataFromBranch()
    } else {
      const data = {
        ...area,
        check: true
      }
        this.setState({
          selectedTempArea: data
        })
      let payload = {
        header: {
          apiToken: this.props.user ? this.props.user.authorization : '',
        },
        params: {
          branch_id: data.id
        }
      }
  
     this.props.check_branch(payload,
        (res) => {
          if(res) {
            if(this.props.user) {
              if(hasObjectValue(res.data, 'branch_id')) {
              const findIndex = this.props.listBranch.findIndex(list => list.id === res.data.branch_id)
              const selected = this.props.listBranch[findIndex]
              this.setState({
                selectedTempArea: selected
              }, () => {
                if(this.state.ignoreModalArea) {
                  this.setState({
                    ignoreModalArea: false
                  }, () => {
                    this.getAllDataFromBranch()
                    this.closeDialogCategories(true)
                    
                  })
                } else {
                  this.getAllDataFromBranch()
                }
              })
              } else {
                this.openPopUpChangesArea()
              }
            } else {
              this.openPopUpChangesArea()
            }
          }
        },
        (err) => {
          if(err || err === null) {
            if(this.state.ignoreModalArea) {
              this.setState({
                ignoreModalArea: false
              }, () => {
                this.setModalVisible('openCategories', false);
                this.openPopUpChangesArea()
              })
            } else {
              this.openPopUpChangesArea()
            }
          }
        }
      )
    }
  }

  onConfirmSelectedArea = () => {
    this.getAllDataFromBranch()
    if(this.state.ignoreModalArea) {
      this.setState({
        ignoreModalArea: false
      })
    }
  }
  
  onCancelSelectedArea = async () => {
    await this.openAllCategories(true)
    await this.closePopUpChangesArea()
  }

  getAllDataFromBranch = async () => {
    let area = this.state.selectedTempArea
    this.props.change_branch(area)
    await this.getProductList(true, false, true);
    await this.getProductPromo(false, true);
    await this.getCart()
    await this.getBanner();
    await this.closePopUpChangesArea();

    if(this.state.isOpenBannerDetail.status) {
      this.navigateToBannerDetail(this.state.isOpenBannerDetail.data)
    }

    if (this.state.isOpenProductDetail.status) {
      this.setDetailProduct(this.state.isOpenProductDetail.data.id)
    }
  }

  setDetailProduct = (code) => {
    const branchID = this.state.selectedTempArea.id
    let payload = {
      header: {
        apiToken: this.props.user ? this.props.user.authorization : '',
      },
      body: {},
      params: {
        product_code: code,
        branch_id: branchID
      },
    };

    this.props.get_product_detail(
      payload,
      (res) => {
        if (res.code === 200) {
          this.openDetailProduct(res.data.data[0])
        }
      },
      (err) => {
        actNav.reset(navConstant.Dashboard);
      },
    );
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

    const {listBranch} = this.props

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

        <CopilotStep
          order={1}
          name='tour_guide'
          {...this.props}
        >
          <Content />
        </CopilotStep>

        <FilterComponent
            onCategory={this.props.on_category}
            modalVisible={true}
            showFilter={50}
            dismissFilter={50}
            openAllCategories={this.openAllCategories}
            openDeliveryInfo = {this.openDeliveryInfo}
            listArea={listBranch}
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
          <ChangesAreaPopUp
            visible={this.state.modalVisible.changesArea}
            closePopUpInfo={this.closePopUpChangesArea}
            onConfirmSelectedArea={this.onConfirmSelectedArea}
            onCancelSelectedArea={this.onCancelSelectedArea}
          />
        </ScrollView>

        <CategoriesPopUp
          changeCategory={this.navigateToCategories}
          categories={this.props.categories}
          listArea={listBranch}
          modalVisible={this.state.modalVisible.openCategories}
          closeDialogCategories={this.closeDialogCategories}
          isArea={this.state.isArea}
          setSelectedArea={this.setSelectedArea}
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
  saved_carts: state.carts.carts,
  listBranch: state.utility.listBranch,
  selectedBranch: state.utility.selectedBranch,
  tour_guide: state.utility.tour_guide,
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
  get_list_branch: (req,res,err) => dispatch(actions.utility.api.get_list_branch(req,res,err)),
  change_branch: (payload) =>
    dispatch(actions.utility.reducer.change_branch(payload)),
  tourGuide: (payload) =>
    dispatch(actions.utility.reducer.tourGuide(payload)),
    get_address: (req, success, failure) => dispatch(actions.user.api.get_address(req, success, failure)),
    check_branch: (req,res,err) => dispatch(actions.utility.api.check_branch(req,res,err)),
});

  const Content = ({copilot}) => {
    if(width) {
      return (
        <View style={{width: width / 2, height: 45, position: 'absolute', top: 60, borderRadius: 10, left: 0}} {...copilot}/>
      );
    } else null
  };

  const StepNumber = () => {
	return <View />;
  };

export default copilot({
	animated: true, // Can be true or false
  overlay: 'svg', // Can be either view or svg
  androidStatusBarVisible: false,
  verticalOffset: 20,
  stepNumberComponent: StepNumber,
  tooltipComponent: TooltipComponent,
  tooltipStyle: {
    backgroundColor: 'unset',
    top: scaling.moderateScale(80),
    left: 0
  },
  arrowColor: null,
  backdropColor: 'rgba(0, 0, 0, 0.5)'
})(connect(mapStateToProps, mapDispatchToProps)(Dashboard));

// export default (connect(mapStateToProps, mapDispatchToProps)(Dashboard))
