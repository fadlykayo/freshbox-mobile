import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, FlatList, Dimensions} from 'react-native';
import {actNav, navConstant} from '@navigations';
import Container from '@components/Container';
import AlertDialog from '@components/AlertDialog';
import ProductItem from '@components/ProductItem';
import ProductDetail from '@components/ProductDetail';
import NavigationBar from '@components/NavigationBar';
import Checkout from './components/Checkout';
import ModalLoginConfirmation from './components/ModalLoginConfirmation';
import {language, onShare} from '@helpers';
import styles from './styles';
import actions from '@actions';

const {width, height} = Dimensions.get('window');

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
      search: false,
      scrollX: 0,
      bubble: 0,
      modalVisible: {
        openProduct: false,
        alertDialog: false,
        modalLoginConfirmation: false,
        modalPhoneConfirmation: false,
        openImageDetail: false,
      },
      selectedProduct: null,
    };
    this.changeTotalItem = this.changeTotalItem.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.navigateToSignIn = this.navigateToSignIn.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
    this.navigateToProduct = this.navigateToProduct.bind(this);
    this.openDetailProduct = this.openDetailProduct.bind(this);
    this.closeDetailProduct = this.closeDetailProduct.bind(this);
    this.navigateToCheckout = this.navigateToCheckout.bind(this);
    this.clearProductConfirmation = this.clearProductConfirmation.bind(this);
    this.clearProductCancelation = this.clearProductCancelation.bind(this);
    this.getPositionIndex = this.getPositionIndex.bind(this);
    this.getPositionBubble = this.getPositionBubble.bind(this);
    this.openZoomImage = this.openZoomImage.bind(this);
    this.closeZoomImage = this.closeZoomImage.bind(this);
    // this.setModalVisible = this.setModalVisible.bind(this);
    this.navigateToPhonePage = this.navigateToPhonePage.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.cart_product.length == 0) {
      actNav.goBack();
    }
    return true;
  }

  componentDidMount() {
    if (this.props.productMaxClaim.length > 0) {
      this.setAlertMaxClaim();
    }
  }

  componentWillUnmount() {
    if (this.props.productMaxClaim.length > 0) {
      // this.setAlertMaxClaim()
      this.props.clear_product_max_claim();
    }
  }

  listProductMaxClaim() {
    let maxProduct = this.props.productMaxClaim;
    for (let i = 0; i < maxProduct.length; i++) {
      return `${maxProduct[i].name}: ${maxProduct[i].quota_claim}\n`;
    }
  }

  setAlertMaxClaim() {
    this.props.set_error_status({
      status: true,
      title: 'formError.title.outOfClaim',
      data: this.listProductMaxClaim(),
    });
  }

  setModalVisible(type, value, type2, value2) {
    let modalVisible = JSON.parse(JSON.stringify(this.state.modalVisible));
    modalVisible[type] = value;
    if (type2 && value2) {
      modalVisible[type2] = value2;
    }
    this.setState({modalVisible});
  }

  openZoomImage() {
    this.setModalVisible('openImageDetail', true);
  }

  closeZoomImage() {
    this.setModalVisible('openImageDetail', false);
  }

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

  navigateToProduct() {
    this.props.remove_empty_items();
    actNav.reset(navConstant.Product);
  }

  navigateBack() {
    this.props.remove_empty_items();
    actNav.reset(navConstant.Product);
  }

  openDetailProduct(payload) {
    this.props.detail_product(payload);
    this.setModalVisible('openProduct', true);
  }

  closeDetailProduct() {
    if (this.props.setModalVisible) {
      this.props.set_modal_visible(!this.props.setModalVisible);
    }
    this.setModalVisible('openProduct', false);
  }

  changeTotalItem(payload, type) {
    if (payload.count == 1 && type == 'desc') {
      this.setState({selectedProduct: payload}, () => {
        this.setModalVisible('openProduct', false, 'alertDialog', true);
      });
    } else if (payload.count === payload.stock && type === 'inc') {
      this.props.set_error_status({
        status: true,
        title: 'formError.title.outOfStock',
        data: `${payload.name} hanya tersedia ${payload.stock} ${payload.unit}`,
      });
    } else {
      this.props.change_total(payload, type);
      this.storeCart(payload, type);
    }
  }

  storeCart = (cart, type) => {
    if (this.props.user) {
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
              ? Number(cart.quota_claim) - Number(cart.total_claim_product || 0)
              : 0
            : 0,
        quota_claim: Number(cart.quota_claim || 0),
        type: type,
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
  };

  getCart = () => {
    if (this.props.user) {
      let payload = {
        header: {
          apiToken: this.props.user ? this.props.user.authorization : '',
        },
        params: '',
      };
      this.props.get_cart(payload);
    }
  };

  clearProductConfirmation() {
    let buyProducts = this.checkCart();
    buyProducts = buyProducts.filter(
      (product) => product.product_code !== this.state.selectedProduct.code,
    );
    this.setModalVisible('alertDialog', false);
    // this.setModalVisible('openProduct', false);
    this.props.change_total(this.state.selectedProduct, 'desc');
    if (this.props.user) {
      this.postProductOfCart(buyProducts);
    }
  }

  clearProductCancelation() {
    this.setModalVisible('alertDialog', false);
  }

  checkCart = () => {
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
              ? Number(cart.quota_claim) - Number(cart.total_claim_product || 0)
              : 0
            : 0,
        quota_claim: Number(cart.quota_claim || 0),
      });
    });

    return buyProducts;
  };

  postProductOfCart = (buyProducts, moveScreen = false) => {
    let payload = {
      header: {
        apiToken: this.props.user.authorization,
      },
      body: buyProducts,
    };

    this.props.bulk_add_products(
      payload,
      (res) => {
        if (moveScreen) {
          actNav.navigate(navConstant.Checkout, {
            key: this.props.navigation.state.key,
            createOrderHandler:
              this.props.navigation.state.params.createOrderHandler,
          });
        }
      },
      (err) => {},
    );
  };

  navigateToCheckout() {
    if (this.props.cart_product.length == 0) {
      language.transformText('message.emptyCart').then((message) => {
        this.props.set_error_status({
          status: true,
          title: 'formError.title.emptyCart',
          data: message,
        });
      });
    } else {
      this.props.remove_empty_items();
      let buyProducts = this.checkCart();
      if (this.props.user && this.props.user.user.phone_number) {
        this.postProductOfCart(buyProducts, true);
      } else if (this.props.user && !this.props.user.user.phone_number) {
        this.setModalVisible('modalPhoneConfirmation', true);
      } else {
        this.setModalVisible('modalLoginConfirmation', true);
      }
    }
  }

  navigateToSignIn() {
    this.setModalVisible('modalLoginConfirmation', false);
    if (this.props.cart_product.length > 0) {
      actNav.navigate(navConstant.SignIn, {
        action: 'guestLogin',
        totalProduct: this.props.cart_product.length,
      });
    } else {
      actNav.navigate(navConstant.SignIn, {
        action: 'guestLogin',
      });
    }
  }

  navigateToPhonePage() {
    this.setModalVisible('modalPhoneConfirmation', false);
    actNav.navigate(navConstant.PhonePage, {
      type: 'otp',
      isName: true,
    });
  }

  render() {
    return (
      <Container bgColorBottom={'veryLightGrey'} bgColorTop={'red'}>
        <NavigationBar
          title={'cart.navigationTitle'}
          onPress={
            this.props.navigation.state.params.action == 'history'
              ? this.navigateToProduct
              : this.navigateBack
          }
        />
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <FlatList
              data={this.props.cart_product}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <ProductItem
                    search={this.state.search}
                    key={index}
                    data={item}
                    type={'cart'}
                    index={index + 1}
                    user={this.props.user}
                    changeTotalItem={this.changeTotalItem}
                    productLength={this.props.cart_product.length}
                    openDetailProduct={this.openDetailProduct}
                  />
                );
              }}
            />
          </View>
          <Checkout
            type={'red'}
            totalPrice={this.props.total_price}
            onPress={this.navigateToCheckout}
          />
        </View>
        <ProductDetail
          type={'cart'}
          user={this.props.user}
          data={this.props.productDetail}
          changeTotalItem={this.changeTotalItem}
          closeDetailProduct={this.closeDetailProduct}
          modalVisible={
            this.state.modalVisible.openProduct || this.props.setModalVisible
          }
          getPositionBubble={this.getPositionBubble}
          getPositionIndex={this.getPositionIndex}
          openZoomImage={this.openZoomImage}
          closeZoomImage={this.closeZoomImage}
          bubble={this.state.bubble}
          scrollX={this.state.scrollX}
          openImageDetail={this.state.modalVisible.openImageDetail}
          onShare={onShare}
        />
        <ModalLoginConfirmation
          button={'button.login'}
          message={'modal.content.loginConfirmation'}
          onPress={this.navigateToSignIn}
          modalVisible={this.state.modalVisible.modalLoginConfirmation}
        />
        <ModalLoginConfirmation
          button={'button.ok'}
          message={'modal.content.addPhoneNumber'}
          onPress={this.navigateToPhonePage}
          modalVisible={this.state.modalVisible.modalPhoneConfirmation}
        />
        <AlertDialog
          modalVisible={this.state.modalVisible.alertDialog}
          content={'dialog.clearProduct'}
          params={{
            item:
              this.state.selectedProduct == null
                ? ''
                : this.state.selectedProduct.name,
          }}
          requestHandler={this.clearProductConfirmation}
          requestCancel={this.clearProductCancelation}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.data,
  product: state.product.products,
  productDetail: state.product.detail,
  total_price: state.product.total.price,
  total_count: state.product.total.count,
  index_product: state.product.cart.index,
  cart_product: state.product.cart.products,
  setModalVisible: state.product.setModalVisible,
  paramsPromo: state.product.paramsPromo,
  productMaxClaim: state.product.productMaxClaim,
});

const mapDispatchToProps = (dispatch) => ({
  detail_product: (index) =>
    dispatch(actions.product.reducer.detail_product(index)),
  toggle_favorite: (index) =>
    dispatch(actions.product.reducer.toggle_favorite(index)),
  get_products: (req, res, err) =>
    dispatch(actions.product.api.get_products(req, res, err)),
  set_error_status: (payload) =>
    dispatch(actions.network.reducer.set_error_status(payload)),
  change_total: (payload, type) =>
    dispatch(actions.product.reducer.change_total(payload, type)),
  bulk_add_products: (req, res, err) =>
    dispatch(actions.transaction.api.bulk_add_products(req, res, err)),
  remove_empty_items: () =>
    dispatch(actions.product.reducer.remove_empty_items()),
  set_modal_visible: (payload) =>
    dispatch(actions.product.reducer.set_modal_visible(payload)),
  get_promo: (req, res, err) =>
    dispatch(actions.product.api.get_promo(req, res, err)),
  set_loading_status: (payload) =>
    dispatch(actions.network.reducer.set_loading_status(payload)),
  clear_product_max_claim: () =>
    dispatch(actions.product.reducer.clear_product_max_claim({})),
  get_cart: (req, res, err) =>
    dispatch(actions.product.api.get_cart(req, res, err)),
  post_cart: (req, res, err) =>
    dispatch(actions.product.api.post_cart(req, res, err)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
