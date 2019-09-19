import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import styles from './styles';
import images from '@assets';
import StaticText from '@components/StaticText';

export default class ProfileBlock extends Component {
  renderGoToDetails = () => {
    <>
    {/* <TouchableOpacity>
      <View style = {styles.top.right}>
        <Text style = {styles.top.textMore}>Lihat Semua</Text>
      </View>
    </TouchableOpacity> */}
    </>
  }
  render() {

    return (
      <View style={styles.container}>

        <View style = {styles.user.content}>

          <StaticText
            style={styles.user.textBold}
            property={'dashboard.campaign.title'}
          />
          <StaticText
            style={styles.user.textBoldSmall}
            property={'dashboard.campaign.more'}
          />
        </View>

        <View style={styles.picture.container}>
        
        {this.renderGoToDetails()}
          
        </View>
        <View style={styles.bottom.whiteRound}/>
      </View>
    )
  }
}
