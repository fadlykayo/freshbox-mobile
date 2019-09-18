import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import numeral from 'numeral';
import { actNav, navConstant } from '@navigations';
import Button from '@components/Button';
import styles from './styles'

export default class Announcement extends Component {

  _renderCards = () => {
    let cards = this.props.data.map((d,i) => {
      return (
        <View style={styles.card.container}>
          {/* <Image

          /> */}
          <View style={styles.card.text.container}>
            <Text>{d.title}</Text>
            <Text>{d.subtitle}</Text>
          </View>
        </View>
      )
    })
    return (
      <ScrollView style = {styles.bottom.container} horizontal contentContainerStyle = {styles.bottom.contentContainer} showsHorizontalScrollIndicator={false}>
        {cards}
      </ScrollView>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View style = {styles.top.container}>

          <View style = {styles.top.left}>
            <Text style = {styles.top.textPromo}>Pengumuman</Text>
          </View>

          {/* <TouchableOpacity onPress={}> */}
            <View style = {styles.top.right}>
              <Text style = {styles.top.textMore}>Lihat Semua</Text>
            </View>
          {/* </TouchableOpacity> */}
        </View>

        <View style={styles.bottom.outerContainer}>
        {this._renderCards()}
          
        </View>
        


      </View>
    )
  }
}
