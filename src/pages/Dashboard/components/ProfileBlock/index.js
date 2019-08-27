import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import styles from './styles';
import images from '@assets';

export default class ProfileBlock extends Component {
  render() {
    console.log(this.props.user)
    return (
      <View style={styles.container}>

        <View style = {styles.user.content}>
          <Text style = {styles.user.text}> Hi, <Text style={styles.user.textBold}>{this.props.user.user.name}</Text></Text> 
        </View>

        <View style={styles.picture.container}>
        {
          this.props.user.user.image !== '' ?
          <Image
            resizeMode={'contain'}
            source={this.props.user.user.image}
            style={styles.picture.image}
          /> :
          <Image
            resizeMode={'contain'}
            source={images.icon_img_ava_grey}
            style={styles.picture.image}
          />
        }
          
        </View>
        <View style={styles.bottom.whiteRound}/>
      </View>
    )
  }
}
