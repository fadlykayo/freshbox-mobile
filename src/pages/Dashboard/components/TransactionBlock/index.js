import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import styles from './styles'

export default class TransactionBlock extends Component {
  renderTransactions () {
    return (
      <View style={styles.card.container}>

      </View>
    )
  }
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

        <ScrollView style = {styles.bottom.container} contentContainerStyle = {styles.bottom.contentContainer}>
          <View
            style={{height: 15}}
          />
          {this.renderTransactions()}
          {this.renderTransactions()}
          {this.renderTransactions()}
          {this.renderTransactions()}
        </ScrollView>


      </View>
    )
  }
}
