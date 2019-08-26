import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import ProductItem from '@components/ProductItem';
import styles from './styles'

export default class PromoList extends Component {
  render() {
    return (

        <View style = {styles.container}>

          <View style = {styles.top.container}>

            <View style = {styles.top.left}>
              <Text style = {styles.top.textPromo}>Promo!</Text>
            </View>

            <View style = {styles.top.right}>
              <Text style = {styles.top.textMore}>Lihat Semua</Text>
            </View>

          </View>

          <View style = {styles.promo.container}>
            
            <FlatList
              horizontal
              data = {this.props.product}
              keyExtractor = {(item) => item.code}
              renderItem = {({item, index}) => 


              <View style={{marginVertical: 10}} key={index}>
                <ProductItem
                  search = {''}
                  data = {item}
                  index= {index+1}
                  type={'productList'}
                  user={this.props.user}
                  dashboard
                />
              </View>

                
              }
            />
            
          </View>

        </View>

    )
  }
}
