import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import { actNav, navConstant } from '@navigations';
import ProductItem from '@components/ProductItem';
import EmptyState from '@components/EmptyState';
import images from '@assets';
import styles from './styles'

export default class PromoList extends Component {

  navigateToProduct = () => {
    // actNav.navigate(navConstant.ProductList, {showPromo: true});
    this.props.navigateToPromo();
  }

  handleLoadMore = () => {
    this.props.handleLoadMore();
  }

  changeTotalItem = (payload, type) => {
    this.props.changeTotalItem(payload, type);
  }

  renderProduct = (items) => {
    return items.map((item, index) => {
      return (
        <View style={styles.promo.card} key={index}>
          <ProductItem
            search = {''}
            data = {item}
            index= {index+1}
            type={'productList'}
            user={this.props.user}
            dashboard
            toggleFavorite={this.props.toggleFavorite}
            changeTotalItem={this.changeTotalItem}
            // productLength={this.props.product.length}
            openDetailProduct= {this.props.openDetailProduct}
          />
        </View>
      )
    })
  }

  renderContent = () => {
    if(this.props.loadingPromo) {
      // console.log('masuk sini')
      return (
        <ActivityIndicator/>
      )
    } else {
      if(this.props.product.length !== 0) {
        return (
          <ScrollView
            style={{flex: 1}}
            horizontal
          >
            {this.renderProduct(this.props.product)}
          </ScrollView>

        )
      } else {
        return (
          <EmptyState
            property 	={'emptyState.search'}
            image 		= {images.empty_search}
          />
          )
        }
    } 
  }

  render() {
    return (

        <View style = {styles.container}>

          <View style = {styles.top.container}>

            <View style = {styles.top.left}>
              <Text style = {styles.top.textPromo}>Special Deals!</Text>
            </View>

            <TouchableOpacity onPress={this.navigateToProduct}>
              <View style = {styles.top.right}>
                <Text style = {styles.top.textMore}>Lihat Semua</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style = {styles.promo.container}>
            
            {this.renderContent()}
            
          </View>

        </View>

    )
  }
}
