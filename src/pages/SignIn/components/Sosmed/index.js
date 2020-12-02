import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';
import styles from './styles';
import images from '@assets';

export default class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onPressButton = this.onPressButton.bind(this);
  }

  componentDidMount() {
    if(this.props.type !== 'facebook') {
      this.setupGoogleClient();
    }
  }

  async setupGoogleClient(){
    try {
        await GoogleSignin.hasPlayServices({ autoResolve: true });
        await GoogleSignin.configure({
            iosClientId: '73889112804-3iv7l3inaun9sgidmmrloovl864ffhfa.apps.googleusercontent.com',
            offlineAccess: false
        });
    }
    catch(err) {
        // console.log("Google signin error", err.code, err.message);
    }
  }
  

  onPressButton () {
    this.props.onPress();
  }
  

  render() {
    return (
      
      <View style = { styles.container }>
        <TouchableWithoutFeedback onPress={this.onPressButton}>
          <Image
            resizeMode    = { 'contain' }
            source        = { this.props.type == 'facebook' ? images.icon_facebook : images.icon_google }
            style         = { styles.image(this.props.type) }
          />
        </TouchableWithoutFeedback>
      </View>
      
    );
  }
}
