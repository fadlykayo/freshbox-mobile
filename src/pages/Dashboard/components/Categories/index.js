import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
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
            <View style={styles.icon.container}>

            </View>
          )}
        />
        </View>


      </View>
    )
  }
}
