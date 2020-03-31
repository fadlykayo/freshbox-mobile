import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, Platform, Linking } from 'react-native';
import CodePush from "react-native-code-push";
import StaticText from '@components/StaticText';
import Button from '@components/Button';
import images from '@assets';
import styles from './styles';

export default class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onPressOk = () => {
    if(this.props.announcementMessage == 'major') {
      Linking.openURL('https://frshbox.app.link/downloadnow')
    } else {
      CodePush.restartApp();
    }
  } 

  render() {
    return (
      <Modal
        animationType = 'fade'
        transparent = {true}
        visible = {this.props.visible}

      >
        <View style={{flex: 1}}>
          <>
            <View style={styles.modal.container}>
              
            </View>
            <View style={styles.modal.card}>
            
              <View style={styles.modal.content}>
                <Image
                  source = {images.ilu_announcement}
                  style = {styles.modal.image}
                />
                <View style={styles.modal.textContainer}>
                  <StaticText
                    style={styles.modal.title}
                    property={'requireUpdate.title'}
                  />
                  <StaticText
                    style={styles.modal.text}
                    property={this.props.announcementMessage == "major" ? 'requireUpdate.contentMajor' : 'requireUpdate.contentMinor'}
                  />
                </View>
                
              </View>

              <View style={styles.modal.button.container}>
                <Button
                  type={'red'}
                  title={'requireUpdate.ok'}
                  onPress={this.onPressOk}
                />
                {
                  this.props.updateType == 'minor' ? 
                  <TouchableOpacity style={{flex: 1}} onPress={this.props.closePopUpInfo}>

                    <StaticText
                      style={styles.modal.textBold}
                      property={'requireUpdate.later'}
                    />

                  </TouchableOpacity> : null
                }
                
                
              </View>
              
            </View>
          </> 
        </View>
      </Modal>

    );
  }
}
