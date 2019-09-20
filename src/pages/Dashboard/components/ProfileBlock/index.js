import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import styles from './styles';
import images from '@assets';
import StaticText from '@components/StaticText';

export default class ProfileBlock extends Component {

  navigateToCampaigns = () => {
    this.props.navigateToCampaign();
  }
  
  render() {

    return (
      <View style={styles.container}>

        <View style = {styles.user.content}>

          <StaticText
            style={styles.user.textBold}
            property={'dashboard.campaign.title'}
          />
          <TouchableOpacity onPress = {this.navigateToCampaigns}>

            <StaticText
              style={styles.user.textBoldSmall}
              property={'dashboard.campaign.more'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.picture.container}>
          
        </View>
        <View style={styles.bottom.whiteRound}/>
      </View>
    )
  }
}
