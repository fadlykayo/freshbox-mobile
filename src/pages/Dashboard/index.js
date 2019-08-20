import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Container from '@components/Container';

export default class Dashboard extends Component {
  render() {
    return (
      <Container
        bgColorBottom = {'veryLightGrey'}
        bgColorTop={'red'}
      >
        <View>
          <Text> textInComponent </Text>
        </View>

      </Container>

    )
  }
}
