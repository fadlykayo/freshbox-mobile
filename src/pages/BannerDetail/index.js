import React, { Component } from 'react';
import { View, Text, WebView, Platform, Image, FlatList, ScrollView } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import { connect } from 'react-redux';
import { gopay } from '@helpers';
import moment from 'moment';
import ProductItem from '@components/ProductItem';
import images from '@assets';
import styles from './style';
import actions from '@actions';


class BannerDetail extends Component {
    constructor() {
      super();
    }

    renderBanner = () => {
      return (
        <View style = {styles.banner.container}>
          <Image
            source = {{uri: this.props.currentDetail[0].images_page_mobile_url_original}}
            style = {styles.banner.image}
            resizeMode = {'contain'}
          />
        </View>
      )
    }

    _renderSyarat = () => {
      if(this.props.currentDetail[0].syarat_ketentuan && this.props.currentDetail[0].syarat_ketentuan !== '') {
        return (
          <Text style = {styles.mid.contentText}>{this.props.currentDetail[0].syarat_ketentuan}</Text>
        )
      } else {
        return (
          <Text style = {styles.mid.contentText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
        )
      }
    }

    renderContent = () => {
     const details = this.props.currentDetail[0];
     const expirationDate = moment(details.expiry_Date).format("MMM Do, YYYY");
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
    console.log('ini payload', payload)
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

    renderPromoList = () => {
      return (
          <View style = {styles.promo.container}>
          
            <View style = {styles.promo.titleContainer}>
              <Text style = {styles.promo.titleText}>Produk Campaign</Text>
              <Text style = {styles.promo.moreText}>Lihat Semua Produk</Text>
            </View>

            <View style = {styles.promo.cart}>
              {
                this.props.currentDetail[0].details.length ?
                <FlatList
                  // horizontal
                  showsHorizontalScrollIndicator={false}
                  data = {this.props.currentDetail[0].details}
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
                      // changeTotalItem={this.changeTotalItem}
                      productLength={this.props.currentDetail[0].details.length}
                      // openDetailProduct= {this.props.openDetailProduct}
                    />
                  </View>

                    
                  }
                /> : <ActivityIndicator/>
              }
            </View>
            
            
            
          </View>

      )
    }

    render() {
        
        let params = this.props.navigation.state.params;
        console.warn(this.props.currentDetail[0])
        return (
            <Container style={styles.container}>
                <NavigationBar
			    	title={'bannerDetail.navigationTitle'}
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
            {this.renderPromoList()}
            </ScrollView>
          }
                
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.data,
    currentDetail: state.product.currentDetail
});

const mapDispatchToProps = dispatch => ({
  add_favorite: (req,res,err) => dispatch(actions.product.api.add_favorite(req,res,err)),
  delete_favorite: (req,res,err) => dispatch(actions.product.api.delete_favorite(req,res,err)),
})

export default connect(mapStateToProps,mapDispatchToProps)(BannerDetail);
