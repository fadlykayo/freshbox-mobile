import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import numeral from 'numeral';
import { actNav, navConstant } from '@navigations';
import Button from '@components/Button';
import styles from './styles'

export default class TransactionBlock extends Component {

  renderTransactions (transactions) {
    if(transactions !== undefined && transactions.length > 0) {
      let transactionNonPending = transactions.map((transaction, i) => {
        if(transaction.status !== 'pending_payment') {
          return transaction
        }
      })
      if(transactionNonPending.length > 1) {
        return transactionNonPending.slice(0,3).map((transaction, i) => {
          if(transaction) {
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
          } else {
            return null
          }

          
        });
        
      } else {
        return transactionNonPending.map((transaction, i) => {


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

      });
      }
      
    } else {
      return null
    }
    

  }

  _renderListTransaction = () => {
    if(this.props.loadingTransaction) {
      return (
        <ActivityIndicator/>
      )
    } else {
      if(this.props.transactions.length > 0) {
        return (
          <ScrollView 
            style = {styles.bottom.container} 
            horizontal 
            contentContainerStyle = {styles.bottom.contentContainer} 
            showsHorizontalScrollIndicator={false}
          >
            {this.renderTransactions(this.props.transactions)}
          </ScrollView> 
        )
      } else {
        return (
          // <View style={styles.card.emptyContainer}>
          //   <View style={styles.card.transactionText}>
          //     <Text style={styles.card.transactionText}>No Transactions Yet</Text>
          //   </View>
          //   <View style={styles.card.buttonNav}>
          //     <Button 
          //       type={'red'} 
          //       title={'transactionBlock.button'} 
          //       borderRadius={50} 
          //       fontSize={13}
          //       onPress={() => actNav.navigate(navConstant.ProductList)}
          //     />
          //   </View>
          // </View>
          null
        )
      }
    }
  }

  renderContent = () => {
    if(this.props.transactions.length > 0) {
      return (
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
      )
    } else {
      return null
    }
  }

  navigateToHistory = () => {
    actNav.navigate(navConstant.HistoryPage)
  }
  
  render() {
    return (
      <View style={styles.container}>
        
        {this.renderContent()}

        <View style={styles.bottom.outerContainer}>
          {this._renderListTransaction()}
        </View>
        


      </View>
    )
  }
}
