import React, { Component } from 'react';
import { View, Text, WebView, Platform, Animated, Easing, Dimensions, Image, FlatList, ScrollView, ActivityIndicator, Clipboard, TouchableOpacity } from 'react-native';
import { actNav, navConstant } from '@navigations';
import { language, analytics } from '@helpers';
import moment from 'moment';
import { connect } from 'react-redux';
import Checkout from '../ProductList/components/Checkout';
import Container from '@components/Container';
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
        voucher: false,
      }
      this.showCheckout = new Animated.Value(0);
    }

    shouldComponentUpdate(nextProps, nextState) {
      if(nextProps.total_count == 0) this.outroAnimate();
      else if (this.props.total_count == 0 && nextProps.total_count == 1) this.introAnimate();
      return true;
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
            // refreshHandler: this.refreshHandler,
            fromDashboard: true
          });
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
        </View>
      )
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
  openDetailProduct = (payload) => {
		// console.warn(payload)
		this.props.detail_product(payload.product);
		this.setModalVisible('openProduct',true);
	}

  openDetailProductPicture = (payload) => {
    // console.warn(payload)
		this.props.detail_product(payload.product);
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
        
        if(this.props.currentDetail.products.length !== 0) {
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


    renderPromoList = () => {

      return (
        
          <View style = {styles.promo.container}>
          
            {
              this.props.currentDetail.products.length ? 
              <View style = {styles.promo.titleContainer}>
                <Text style = {styles.promo.titleText}>Produk Campaign</Text>
                {/* <Text style = {styles.promo.moreText}>Lihat Semua Produk</Text> */}
              </View> : null

            }

            <View style = {styles.promo.cart}>
              {this.renderProductList()}
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
			    />
          {
            params.links && params.links !== '' ?
            <View style={styles.content}>
              <WebView
                  source={{uri: params.links}}
                  style={{flex: 1}}
              />
            </View> : 
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
            modalVisible={this.state.modalVisible.openProduct}
            openImageDetail={this.state.modalVisible.openImageDetail}
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
    currentDetail: state.product.currentDetail,
    productDetail: state.product.detail,
    total_count: state.product.total.count,
    total_price: state.product.total.price,
    cart_product: state.product.cart.products,
});

const mapDispatchToProps = dispatch => ({
  add_favorite: (req,res,err) => dispatch(actions.product.api.add_favorite(req,res,err)),
  detail_transaction: (req,res,err) => dispatch(actions.transaction.api.detail_transaction(req,res,err)),
  delete_favorite: (req,res,err) => dispatch(actions.product.api.delete_favorite(req,res,err)),
  change_total : (payload,type) => dispatch(actions.product.reducer.change_total(payload,type)),
  detail_product : (payload) => dispatch(actions.product.reducer.detail_product(payload)),
  clear_products: () => dispatch(actions.product.reducer.clear_products()),
  set_voucher_code: (payload) => dispatch(actions.voucher.reducer.set_voucher(payload)),
})

export default connect(mapStateToProps,mapDispatchToProps)(BannerDetail);
