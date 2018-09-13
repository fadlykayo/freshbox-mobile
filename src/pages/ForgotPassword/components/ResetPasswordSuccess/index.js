import React,{ PureComponent } from 'react';
import { View, Image, Text } from 'react-native';
import styles from './styles';
import StaticText from '@components/StaticText';
import images from '@assets';

class ResetPasswordSuccess extends PureComponent {
  constructor(props){
      super(props);
  }

  render(){
    if(this.props.viewVisible) {
      return(
          <View
            style={styles.overlay}
          >
            <View
                style={ styles.result }
            >
              <StaticText 
                  property={'forgotPassword.content.resetPasswordSuccess'}
              />
              <StaticText 
                  property={'forgotPassword.content.checkEmail'}
              />
              <Image
                  resizeMode={'contain'} 
                  source={images.icon_forgot_password_success}
                  style={styles.logo}
              />
            </View>
          </View>
      )
    }
    else {
      return null
    }
  }
}

export default ResetPasswordSuccess;