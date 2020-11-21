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

  navigateToCategories = (category) => {
    this.props.navigateToCategories(category)
  }

  handleLoadMore = () => {
    this.props.handleLoadMore();
  }

  changeTotalItem = (payload, type) => {
    this.props.changeTotalItem(payload, type);
  }

  renderProduct = (items) => {
    let elemnt = []
    for(const obj in items) {
      if(obj !== 'info') {
        elemnt.push(<View style={styles.promo.card} key={items[obj].product.code} >
          <ProductItem
            search={''}
            data={items[obj].product}
            index={parseInt(obj) + 1}
            type={'productList'}
            user={this.props.user}
            dashboard
            toggleFavorite={this.props.toggleFavorite}
            changeTotalItem={this.changeTotalItem}
            // productLength={this.props.product.length}
            openDetailProduct={this.props.openDetailProduct}
            bannerPrice={items[obj].banner_harga_jual}
          />
        </View>)
      }
    }
    if(elemnt.length > 0) {
      return elemnt
    } else {
     return null
    }
    // return elemnt
    // return items.map((item, index) => {
    //   return (
    //     <View style={styles.promo.card} key={index}>
    //       <ProductItem
    //         search={''}
    //         data={item.product}
    //         index={index + 1}
    //         type={'productList'}
    //         user={this.props.user}
    //         dashboard
    //         toggleFavorite={this.props.toggleFavorite}
    //         changeTotalItem={this.changeTotalItem}
    //         // productLength={this.props.product.length}
    //         openDetailProduct={this.props.openDetailProduct}
    //       />
    //     </View>
    //   )
    // })
  }

  renderContent = (item) => {
    if (this.props.loadingPromo) {
      return (
        <ActivityIndicator />
      )
    } else {
      if (this.props.product.length !== 0 || this.props.fromSplashScreen) {
        return (
          <ScrollView
            style={{ flex: 1 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {this.renderProduct(this.props.categoriesProduct[item])}
          </ScrollView>

        )
      } else {
        return (
          <EmptyState
            property={'emptyState.search'}
            image={images.empty_search}
          />
        )
      }
    }
  }

  render() {
    let categories = Object.keys(this.props.categoriesProduct)
    return (


      <FlatList
        data={categories}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.container} key={index}>
              <View style={styles.top.container}>

                <View style={styles.top.left}>
                  <Text style={styles.top.textPromo}>{item}</Text>
                </View>

                <TouchableOpacity onPress={() => {
                  this.navigateToCategories(item)
                }}>
                  <View style = {styles.top.right}>
                    <Text style = {styles.top.textMore}>Lihat Semua</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.promo.container}>

                {this.renderContent(item)}

              </View>

            </View>
          )
        }}
      />




    )
  }
}
