import React, { Component } from 'react';
import { View, Text, WebView, Platform, Image, FlatList } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import { connect } from 'react-redux';
import { gopay } from '@helpers';
import ProductItem from '@components/ProductItem';
import images from '@assets';
import styles from './style';


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

    renderContent = () => {
      if(this.props.currentDetail[0].syarat_ketentuan) {
        return (
          <View style = {styles.mid.container}>

            <View style = {styles.mid.titleContainer}>
              <View style = {styles.mid.hori}></View>
              <Text style = {styles.mid.titleText}>{this.props.currentDetail[0].name_banner}</Text>
            </View>

            <View style = {styles.mid.contentContainer}>
            {
              this.props.currentDetail[0].syarat_ketentuan ? 
              <Text style = {styles.mid.contentText}>{this.props.currentDetail[0].syarat_ketentuan}</Text> :
              <Text style = {styles.mid.contentText}>Terms and Conditions not available</Text>

            }
              
            </View>

          </View>
        )
      } else {
        return (
          <View style = {styles.mid.container}>

            <View style = {styles.mid.titleContainer}>
              <View style = {styles.mid.hori}></View>
              <Text style = {styles.mid.titleText}>Terms and Conditions</Text>
            </View>

            <View style = {styles.mid.contentContainer}>
              <Text style = {styles.mid.contentText}>halo</Text>
            </View>

          </View>
        )
      }
      
      
    }

    renderPromoList = () => {
      return (
          <View style = {styles.promo.container}>
          
            <View style = {styles.promo.titleContainer}>
              <View style = {styles.promo.hori}></View>
              <Text style = {styles.promo.titleText}>Products</Text>
            </View>
          
            {
              this.props.currentDetail[0].details.length ?
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data = {this.props.currentDetail[0].details}
                keyExtractor = {(item) => item.code}
                renderItem = {({item, index}) => 


                <View style={styles.promo.card} key={index}>
                  <ProductItem
                    search = {''}
                    data = {item}
                    index= {index+1}
                    type={'productList'}
                    user={this.props.user}
                    dashboard
                    bannerDetail
                    // toggleFavorite={this.props.toggleFavorite}
                    // changeTotalItem={this.changeTotalItem}
                    // productLength={this.props.product.length}
                    // openDetailProduct= {this.props.openDetailProduct}
                  />
                </View>

                  
                }
              /> : <ActivityIndicator/>
            }
            
            
          </View>

      )
    }

    render() {
        
        let params = this.props.navigation.state.params;
        console.log(this.props.currentDetail[0].images_page_mobile_url_original)
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
            <View style={styles.content}>
            {this.renderBanner()}
            {this.renderContent()}
            {this.renderPromoList()}
            </View>
          }
                
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.data,
    currentDetail: state.banners.currentDetail
});

export default connect(mapStateToProps,null)(BannerDetail);
