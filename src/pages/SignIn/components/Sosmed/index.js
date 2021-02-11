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
    this.selectImage = this.selectImage.bind(this);
  }

  componentDidMount() {
    if(this.props.type !== 'facebook') {
      this.setupGoogleClient();
    }
  }

  async setupGoogleClient(){
    try {
        await GoogleSignin.hasPlayServices({ autoResolve: true, showPlayServicesUpdateDialog: true });
        await GoogleSignin.configure({
            webClientId: '73889112804-3lequnciqmah8j8pmu9poeh1onq1gh6h.apps.googleusercontent.com',
            iosClientId: '73889112804-3iv7l3inaun9sgidmmrloovl864ffhfa.apps.googleusercontent.com',
            offlineAccess: true,
        });
    }
    catch(err) {}
  }

  onPressButton () {
    this.props.onPress();
  }
  
  selectImage () {
    switch (this.props.type) {
      case 'facebook': return images.icon_facebook
      case 'apple': return images.icon_apple
      default: return images.icon_google
    }
  }

  render() {
    return (
      <View style = { styles.container }>
        <TouchableWithoutFeedback onPress={this.onPressButton}>
          <Image
            resizeMode    = { 'contain' }
            source        = { this.selectImage() }
            style         = { styles.image(this.props.type) }
          />
        </TouchableWithoutFeedback>
      </View>
      
    );
  }
}
