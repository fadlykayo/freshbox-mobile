import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import images from '@assets';

export default class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    // this.onPressButton = this.onPressButton.bind(this);
  }

  // onPressButton () {
  //   this.props.onPress();
  // }

  render() {
    return (
      
      <View style = { styles.container }>
        {/* <TouchableWithoutFeedback onPress={this.onPressButton}> */}
          <Image
            resizeMode    = { 'contain' }
            source        = { images.icon_facebook }
            style         = { styles.image }
          />
        {/* </TouchableWithoutFeedback> */}
      </View>
      
    );
  }
}
