import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import styles from './styles';
import images from '@assets';

export default class ProfileBlock extends Component {
  renderImage = () => {
    if(this.props.user) {
      if(this.props.user.user.image) {
        return (
          <Image
            resizeMode={'contain'}
            source={this.props.user.user.image}
            style={styles.picture.image}
          />
        )
      } else {
        return (
          <Image
            resizeMode={'contain'}
            source={images.icon_img_ava_grey}
            style={styles.picture.image}
          />
        )
      }
    } else {
      return (
        <Image
          resizeMode={'contain'}
          source={images.icon_img_ava_grey}
          style={styles.picture.image}
        />
      )
    }
  }
  render() {

    return (
      <View style={styles.container}>

        <View style = {styles.user.content}>
        {
          this.props.user ? 

          <Text style = {styles.user.text}> Hi, <Text style={styles.user.textBold}>{this.props.user.user.name}</Text></Text> :
          <Text style = {styles.user.text}> Welcome to <Text style={styles.user.textBold}>Freshbox</Text></Text>

        }
        </View>

        <View style={styles.picture.container}>
        
        {this.renderImage()}
          
        </View>
        <View style={styles.bottom.whiteRound}/>
      </View>
    )
  }
}
