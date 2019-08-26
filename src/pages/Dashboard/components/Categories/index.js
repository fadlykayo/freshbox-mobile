import React, { Component } from 'react'
import { Text, View, FlatList, Image } from 'react-native'
import styles from './styles'

export default class Categories extends Component {
  
  render() {
    console.log(this.props.categories)
    return (
      <View style={styles.container}>
        <View style={styles.flatlist.container}>
        <FlatList
          horizontal
          data = {this.props.categories}
          keyExtractor={(item) => item.code}
          renderItem={({item, index}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.icon.container}>
            {
              item.images_url ? 
              <Image
                source={{uri: item.images_sizes_url.original[0]}}
                style={{height: 50, width: 50}}
              /> : null
            }
              
            </View>
            <Text style={styles.icon.text}>{item.name}</Text>
            </View>

          )}
        />
        </View>


      </View>
    )
  }
}
