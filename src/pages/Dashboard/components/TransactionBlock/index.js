import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

export default class TransactionBlock extends Component {
  render() {
    return (
      <View style={styles.container}>
        
        <View style = {styles.top.container}>

          <View style = {styles.top.left}>
            <Text style = {styles.top.textPromo}>Pesan Kembali</Text>
          </View>

          <View style = {styles.top.right}>
            <Text style = {styles.top.textMore}>Lihat Semua</Text>
          </View>

        </View>


      </View>
    )
  }
}
