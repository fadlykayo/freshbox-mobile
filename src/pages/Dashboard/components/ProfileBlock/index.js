import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import styles from './styles';
import images from '@assets';

export default class ProfileBlock extends Component {
  render() {
    return (
      <View style={styles.container}>

        <View style = {styles.user.content}>
          <Text style = {styles.user.text}> Hi, <Text style={styles.user.textBold}>John Doe</Text></Text> 
        </View>

        <View style={styles.picture.container}>
          <Image
            resizeMode={'contain'}
            source={images.icon_img_ava_grey}
            style={styles.picture.image}
          />
        </View>
        <View style={styles.bottom.whiteRound}/>
      </View>
    )
  }
}
