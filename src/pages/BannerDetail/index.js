import React, { Component } from 'react';
import { View, Text, WebView, Platform, Animated, Easing, Dimensions, Image, FlatList, ScrollView, ActivityIndicator, Clipboard, TouchableOpacity, Share } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { language, analytics, hasObjectValue, encode64, onShare } from '@helpers';
import moment from 'moment';
import { connect } from 'react-redux';
import Checkout from '../ProductList/components/Checkout';
import Container from '@components/Container';
import PromoList from './PromoList'
import AlertDialog from '@components/AlertDialog';
import NavigationBar from '@components/NavigationBar';
import { gopay } from '@helpers';
import ProductItem from '@components/ProductItem';
import ProductDetail from '@components/ProductDetail';
import Button from '@components/Button';
import images from '@assets';
import styles from './style';
import actions from '@actions';

const { width, height } = Dimensions.get('window');


class BannerDetail extends Component {
    constructor() {
      super();
      this.state = {
        scrollX: 0,
        bubble: 0,
        modalVisible: {
          openCategories: false,
          openProduct: false,
          openImageDetail: false,
          checkout: false,
          alertDialog: false,
        },
        loading: {
          promoList: false,
        },
        bannerPriceProductDetail: null,
        voucher: false,
      }
      this.showCheckout = new Animated.Value(0);
    }

    componentDidMount() {
      this.checkCart();
    }

    shouldComponentUpdate(nextProps, nextState) {
      if(nextProps.total_count == 0) this.outroAnimate();
      else if (this.props.total_count == 0 && nextProps.total_count == 1) this.introAnimate();
      return true;
    }

    checkCart(){
      if(this.props.total_count > 0) this.introAnimate();
    }

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

    navigateToPaymentSuccess = (input, type) => {
      const { status } = this.props.transactionDetail
      let payload = {
        header: {
          apiToken: this.props.user.authorization,
        },
        invoice: input
      }
      this.props.detail_transaction(payload,
        () => {
          if (type === "gopay" || type === "credit_card") {
            if (status === "paid") {
              actNav.navigate(navConstant.Thanks, {
                // refreshHandler: this.refreshHandler,
                invoice: type,
              });
            } else {
              actNav.navigate(navConstant.Detail, {
                action: 'history',
                createOrderSuccess: false,
                invoice: type,
                // refreshHandler: this.refreshHandler,
                fromDashboard: true
              });
            }
          } else {
            actNav.navigate(navConstant.Detail, {
              action: 'history',
              createOrderSuccess: true,
              invoice: type,
              // refreshHandler: this.refreshHandler,
              fromDashboard: true
            });
          }
        },
        (err) => {
          // console.log('navigate to detail', err);
        }
      )
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

    navigateToCart = () => {
      actNav.navigate(navConstant.Cart,{
        createOrderHandler: this.createOrderHandler,
      });
    }

    renderBanner = () => {
      // console.warn(1200 / width)
      return (
        <View style = {styles.banner.container}>
          <Image
            source = {{uri: this.props.currentDetail.images_page_mobile_url_original}}
            style = {styles.banner.image}
            // resizeMode = {'contain'}
          />
                   <View style = {{position: 'absolute', right: 5, top: -10, zIndex:9}}>
                  <TouchableOpacity onPress={() => {
                    this.onShare(this.props.currentDetail)
                  }}>
                  <Image
                      style={styles.iconOnShare}
                      resizeMode={'contain'}
                      source={
                          images.ic_share
                      }
                  />
                  </TouchableOpacity>
          </View>
        </View>
      )
    }

    onShare = async (data) => {
      let encryptCode = encode64.btoa(data.id)
      const url = `https://freshbox.id/link?code_link=1&code_data=${encryptCode}`
      // const product = data.name.split(" ").join("_");
      try {
        const result = await Share.share({
          message: `Promo ${data.name_banner} Ga Pake Repot Hanya Di Freshbox! Klik disini: ${url}`,
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
  
    }

    _renderSyarat = () => {
      if(this.props.currentDetail.syarat_ketentuan && this.props.currentDetail.syarat_ketentuan !== '') {
        return (
          <Text style = {styles.mid.contentText}>{this.props.currentDetail.syarat_ketentuan}</Text>
        )
      } else {
        return (
          <Text style = {styles.mid.contentText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
        )
      }
    }

    renderContent = () => {
     const details = this.props.currentDetail;
     const expirationDate = moment(details.expiry_date).format("MMM Do, YYYY");
        return (
          <View style={styles.mid.outerContainer}>
            <View style = {styles.mid.container}>

              <View style = {styles.mid.titleContainer}>
                <Text style = {styles.mid.titleText}>{details.name_banner}</Text>
                <View style = {styles.mid.subtitleContainer}>
                  <Image
                    style={styles.mid.calendar}
                    source={images.ic_calendar_grey}
                  />
                  <Text style = {styles.mid.date}>Valid until {expirationDate}</Text>
                </View>
              </View>

              
              

            </View>

            <View style={styles.mid.content}>
              {this._renderSyarat()}
            </View>
          </View>
        )
      
      
      
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
          console.log(err);
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
          console.log(err);
        }
      )
    }
  }

  //product functions
  openDetailProduct = (payload, bannerPrice) => {
		// console.warn(payload)
    this.setState({
      bannerPriceProductDetail: bannerPrice
    }, () => {
      this.setModalVisible('openProduct',true);
    })
  this.props.detail_product(hasObjectValue(this.props.currentDetail, 'new_products') ? payload : payload.product);
	}

  openDetailProductPicture = (payload) => {
    // console.warn(payload)
    this.props.detail_product(hasObjectValue(this.props.currentDetail, 'new_products') ? payload : payload.product);
		this.setModalVisible('openProduct', true);
	}

  changeTotalItem = (payload,type) => {
		this.props.change_total(payload,type);
	}

  setModalVisible = (type,value) => {
    let modalVisible = JSON.parse(JSON.stringify(this.state.modalVisible));
    modalVisible[type] = value;
    this.setState({modalVisible});
  }

  getPositionIndex =(e) => {
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

  	// handling zoom products' image
	openZoomImage = () => {
		this.setModalVisible('openImageDetail',true);
	}

	// handling zoom products' image
	closeZoomImage = () => {
    if(this.props.setModalVisible) {
      this.props.set_modal_visible(!this.props.setModalVisible)
    }
		this.setModalVisible('openImageDetail',false);
	}

  closeDetailProduct = () => {
		this.setModalVisible('openProduct',false);
	} 
  // end product functions

  //render product list

  renderProductList = () => {
    
    if(this.state.loadingProduct) {
      // promo will have new price if theres voucher id
      return (
        <ActivityIndicator/>
      ) 
      } else {
        
        if(this.props.currentDetail.products) {
          return (
            <FlatList
              showsHorizontalScrollIndicator={false}
              data = {this.props.currentDetail.products}
              keyExtractor = {(item) => item.code}
              renderItem = {({item, index}) => 


              <View style={styles.promo.card} key={index}>
                <ProductItem
                  bannerDetail
                  search = {''}
                  data = {item}
                  index= {index+1}
                  type={'productList'}
                  user={this.props.user}
                  toggleFavorite={this.toggleFavorite}
                  changeTotalItem={this.changeTotalItem}
                  productLength={this.props.currentDetail.products.length}
                  openDetailProduct= {this.openDetailProduct}
                />
              </View>

                
              }
            />
          )
        } else {
          // return (
          //   <Text>Shop Now!</Text>
          // )
          return (
            null
          )
        }
      }
    
  }

  renderPromoCategories = () => {
    if(this.props.currentDetail.new_products) {
      return (
        <PromoList
              categoriesProduct={this.props.currentDetail.new_products}
              product={this.props.promoProduct}
              user={this.props.user}
              toggleFavorite={this.toggleFavorite}
              openDetailProduct={this.openDetailProduct}
              loadingPromo={this.state.loading.promoList}
              // handleLoadMore={this.handleLoadMore}
              navigateToCategories={this.navigateToCategories}
              changeTotalItem={this.changeTotalItem}
              fromSplashScreen={hasObjectValue(this.props.navigation.state, 'params') && this.props.navigation.state.params.fromSplashScreen}
            />
      )
    }
    return null
  }


  renderPromoList = () => {
    // console.log('has valueeeeeeeee?', hasObjectValue(this.props.currentDetail, 'new_products') )
    return (
      
        <View style = {styles.promo.container}>
        
          {
            this.props.currentDetail.products && this.props.currentDetail.products.length ? 
            <View style = {styles.promo.titleContainer}>
              <Text style = {styles.promo.titleText}>Produk Campaign</Text>
              {/* <Text style = {styles.promo.moreText}>Lihat Semua Produk</Text> */}
            </View> : null

          }

          <View style = {styles.promo.cart}>
            {/* {this.renderProductList()} */}
            {hasObjectValue(this.props.currentDetail, 'new_products') ? this.renderPromoCategories() : this.renderProductList()}
          </View>
          
          
          
        </View>

    )
  }

    renderVoucher = () => {
      return (
        <View style = {styles.voucher.container}>

          <View style = {styles.promo.titleContainer}>
            <Text style = {styles.promo.titleText}>Promo Code</Text>
            {/* <Text style = {styles.promo.moreText}>Lihat Semua Produk</Text> */}
          </View>

          <View style={styles.voucher.textContainer}>
            <View>
              <Text style={styles.voucher.text}>
                {this.props.currentDetail.coupon_code}
              </Text>
            </View>
            <View>

              <TouchableOpacity style = {{width: 20, height: 20}} onPress={this.openCopyDialog}>
                <Image
                  source={images.icon_copy}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
              
            </View>
          </View>

        </View>
      )
    }

    openCopyDialog = () => {
      this.setModalVisible('alertDialog', true);
    }

    SetAndUseVoucher = () => {
      
      let state = {...this.state};
      state.modalVisible.alertDialog = false;

      Clipboard.setString(this.props.currentDetail.coupon_code);
      this.props.set_voucher_code(this.props.currentDetail.coupon_code);

      this.setState({state}, () => {actNav.navigate(navConstant.Product)});
      
    }

    cancelUseVoucher = () => {
      Clipboard.setString(this.props.currentDetail.coupon_code);
      this.setModalVisible('alertDialog', false);
    }

    navigateToProducts = () => {
      actNav.navigate(navConstant.ProductList);
    }

    navigateToCategories = (category) => {
      let payload = {
        header: {
          apiToken: this.props.user ? this.props.user.authorization : ''
        },
        body: {},
        params: {
          page:1,
          banner_id:this.props.currentDetail.new_products[category].info.banner_id ,
          category_code: this.props.currentDetail.new_products[category].info.category_code,
          product_detail_type: this.props.currentDetail.new_products[category].info.product_detail_type
        }
      };
      let category_code = this.props.categories.filter((item) => {
        return item.name === category
      })
      
      this.props.change_categories(category_code[0]);
      this.props.search_products(payload,
        () => {

          actNav.navigate(navConstant.ProductList, {
            fromDashboard: true,
            showPromo: false,
            fromBanner: true,
            category: category
          })
        },
        (err) => {
          console.log('change category', err)
        }
      )	
    }

    renderButton = () => {
      return (
        <View style = {styles.voucher.button}>
          <Button
            type = {'red'}
            onpress = {this.SetAndUseVoucher}
            title={'voucher.button.title'}
          />
        </View>
      )
    }
    onPressFromSplashScreen = () => {
      if(hasObjectValue(this.props.navigation.state, 'params') && this.props.navigation.state.params.fromSplashScreen) {
        actNav.navigate(navConstant.Dashboard);
      } else {
        actNav.goBack();
      }
    }

    render() {
        // console.log('banner detil', this.props.currentDetail)
        let params = this.props.navigation.state.params;
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
              style={styles.container}
              bgColorTop={'white'}
            >
          <NavigationBar
            navBarTitle
			    	title={this.props.currentDetail.name_banner}
            onPress={this.onPressFromSplashScreen}
			    />
          {
            params.links && params.links !== '' ?
            <View style={styles.content}>
              <WebView
                  source={{uri: params.links}}
                  style={{flex: 1}}
              />
            </View> : hasObjectValue(this.props.currentDetail, 'id') &&
            <ScrollView style={styles.content}>
            {this.renderBanner()}
            {this.renderContent()}
            {this.props.currentDetail.coupon_code !== null && this.props.currentDetail.coupon_code ? this.renderVoucher() : null}
            {this.renderPromoList()}
            {/* {this.props.currentDetail.coupon_code !== null && this.props.currentDetail.coupon_code ? this.renderButton() : null} */}
            </ScrollView>
          }

          <ProductDetail
            bannerDetail
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
            modalVisible={this.state.modalVisible.openProduct || this.props.setModalVisible}
            openImageDetail={this.state.modalVisible.openImageDetail}
            bannerPrice={this.state.bannerPriceProductDetail}
            onShare={onShare}
          />

          <Checkout
            introButton={introButton}
            outroButton={outroButton}
            validateCart={this.validateCart}
            totalCount={this.props.total_count}
            totalPrice={this.props.total_price}
            modalVisible={this.state.modalVisible.checkout}
          />

          <AlertDialog
            modalVisible={this.state.modalVisible.alertDialog} 
            content={'dialog.copyVoucher'}
            bannerDetail
            requestHandler={this.SetAndUseVoucher}
            requestCancel={this.cancelUseVoucher}
          />
                
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.data,
    promoProduct: state.product.promoProduct,
    currentDetail: state.product.currentDetail,
    productDetail: state.product.detail,
    total_count: state.product.total.count,
    total_price: state.product.total.price,
    cart_product: state.product.cart.products,
    transactionDetail: state.transaction.detail,
    categories: state.product.categories,
    setModalVisible: state.product.setModalVisible
});

const mapDispatchToProps = dispatch => ({
  add_favorite: (req,res,err) => dispatch(actions.product.api.add_favorite(req,res,err)),
  detail_transaction: (req,res,err) => dispatch(actions.transaction.api.detail_transaction(req,res,err)),
  delete_favorite: (req,res,err) => dispatch(actions.product.api.delete_favorite(req,res,err)),
  change_total : (payload,type) => dispatch(actions.product.reducer.change_total(payload,type)),
  detail_product : (payload) => dispatch(actions.product.reducer.detail_product(payload)),
  clear_products: () => dispatch(actions.product.reducer.clear_products()),
  set_voucher_code: (payload) => dispatch(actions.voucher.reducer.set_voucher(payload)),
  search_products: (req, res, err) => dispatch(actions.product.api.search_products(req, res, err)),
  change_categories: (payload) => dispatch(actions.product.reducer.change_categories(payload)),
  set_modal_visible: (payload) => dispatch(actions.product.reducer.set_modal_visible(payload)),
})

export default connect(mapStateToProps,mapDispatchToProps)(BannerDetail);
