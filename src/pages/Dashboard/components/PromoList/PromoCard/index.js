import React, { Component } from 'react'
import { Text, View } from 'react-native'
import ButtonFav from '@components/ButtonFav'
import styles from './styles'

export default class index extends Component {
  render() {
    return (
      <View style = {styles.card.container}>
        <View>
          <ButtonFav/>
        </View>
      </View>
    )
  }
}
