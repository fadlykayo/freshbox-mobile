import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableWithoutFeedback, ScrollView } from 'react-native'
import images from '@assets'
import styles from './styles'

export default class Categories extends Component {

  navigateToCategories = (category) => {
    this.props.navigateToCategories(category)
  }

  renderCategory = (page) => {
    return page.map((item, i) => {

        return (
          <TouchableWithoutFeedback onPress = {() => this.navigateToCategories(item)}>
            <View style={styles.icon.outerContainer}>
              <View style={styles.icon.container}>
              {
                item.images_url && item.images_url !== '' ? 
                <Image
                  source={{uri: item.images_sizes_url.original[0]}}
                  style={styles.icon.image}
                /> : <Image
                  source={images.icon_categories}
                  style={styles.icon.image}
                />
              }
                
              </View>

              <Text style={styles.icon.text}>{item.name == 'Default' ? 'All' : item.name}</Text>
              
              
            </View>
          </TouchableWithoutFeedback>
        )

    })
  }

  renderPageCategory = (page, index) => {
    
    return (
      
      <View style={styles.page.container}>

        {
          page ? this.renderCategory(page) : null
        }

      </View>
    )
  }


  render () {
    return (
      <View style={styles.container}>
          <FlatList
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled
            data = {this.props.categoriesPage}
            keyExtractor={(item) => item[0].code}
            renderItem={({item, index}) => (
            this.renderPageCategory(item, index)
            
            )}
          />
          
      </View>
    )
  }
  
}
