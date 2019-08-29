import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import numeral from 'numeral';
import { actNav, navConstant } from '@navigations';
import Button from '@components/Button';
import styles from './styles'

export default class TransactionBlock extends Component {

  renderTransactions (transactions) {

    let transactionNonPending = transactions.map((transaction, i) => {
      if(transaction.status !== 'pending_payment') {
        return transaction
      }
    })
    
    return transactionNonPending.slice(0,2).map((transaction, i) => {
      if(transaction.status !== 'pending_payment') {

        return (
          <View style={styles.card.container}>

            <View>
              <View style={styles.card.invoice.container}><Text style={styles.card.invoice.text}>{transaction.invoice}</Text></View>
              <View><Text style={styles.card.items.text}>{transaction.details.length} item(s)</Text></View>
              <View style={styles.card.grandTotal.container}><Text style={styles.card.grandTotal.text}>IDR {numeral(transaction.grand_total).format(`0,0`)}</Text></View>
            </View>

            <View style={styles.card.button.container}>
              <Button 
                type={'red'} 
                title={'historyPage.content.reOrder'} 
                borderRadius={50} 
                fontSize={13}
                onPress={() => this.props.navigateToDetail(transaction)}
              />
            </View>

          </View>
        )
      }
    });

  }

  navigateToHistory = () => {
    actNav.navigate(navConstant.HistoryPage)
  }
  
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

        <View style={styles.bottom.outerContainer}>
          <ScrollView style = {styles.bottom.container} contentContainerStyle = {styles.bottom.contentContainer} nestedScrollEnabled={true}>

            {this.renderTransactions(this.props.transactions)}
          </ScrollView>
        </View>
        


      </View>
    )
  }
}
