import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import numeral from 'numeral';
import { actNav, navConstant } from '@navigations';
import Button from '@components/Button';
import styles from './styles'

export default class TransactionBlock extends Component {

  renderTransactions (transactions) {
    return transactions.map((transaction, i) => {
      if(transaction.status !== 'pending_payment') {

        return (
          <View style={styles.card.container}>

            <View>
              <View style={{paddingTop: 20}}><Text style={styles.card.invoice.text}>{transaction.invoice}</Text></View>
              <View><Text style={styles.card.items.text}>{transaction.details.length} item(s)</Text></View>
              <View style={{marginTop: 5, paddingBottom: 20}}><Text style={styles.card.grandTotal.text}>IDR {numeral(transaction.grand_total).format(`0,0`)}</Text></View>
            </View>

            <View style={{height:35, width: 120}}><Button type={'red'} title={'historyPage.content.reOrder'} borderRadius={50} fontSize={13}/></View>

          </View>
        )
      }
    });

  }

  navigateToHistory = () => {
    actNav.navigate(navConstant.HistoryPage)
  }
  
  // render 4 latest transactions
  render() {
    return (
      <View style={styles.container}>
        
        <View style = {styles.top.container}>

          <View style = {styles.top.left}>
            <Text style = {styles.top.textPromo}>Pesan Kembali</Text>
          </View>

          <TouchableOpacity onPress={this.navigateToHistory}>
            <View style = {styles.top.right}>
              <Text style = {styles.top.textMore}>Lihat Semua</Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView style = {styles.bottom.container} contentContainerStyle = {styles.bottom.contentContainer}>
          <View
            style={{height: 15}}
          />
          {this.renderTransactions(this.props.transactions.slice(0,4))}
        </ScrollView>


      </View>
    )
  }
}
