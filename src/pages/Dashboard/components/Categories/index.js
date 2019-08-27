import React, { Component } from 'react'
import { Text, View, FlatList, Image } from 'react-native'
import images from '@assets'
import styles from './styles'

export default class Categories extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flatlist.container}>
        <FlatList
          horizontal
          data = {this.props.categories}
          keyExtractor={(item) => item.code}
          renderItem={({item, index}) => (
            <View style={styles.icon.outerContainer}>
            <View style={styles.icon.container}>
            {
              item.images_url ? 
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

          )}
        />
        </View>


      </View>
    )
  }
}
