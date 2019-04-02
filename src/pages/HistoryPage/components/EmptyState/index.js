import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

export default class EmptyState extends Component {
  render() {
    return (
      <View style={styles.emptyState.container}>
        <Text style={styles.emptyState.text}>No History Available</Text>
      </View>
    )
  }
}

