import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

export default class Carousel extends Component {
  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.carousel.container}>
          <View style = {styles.carousel.bottomContainer}></View>
        </View>
      </View>
    )
  }
}
