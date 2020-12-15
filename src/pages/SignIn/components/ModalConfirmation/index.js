import React, {Component} from 'react';
import {View, Image, TouchableWithoutFeedback} from 'react-native';
import styles from './styles';
import StaticText from '@components/StaticText';
import Button from '@components/Button';

import images from '@assets';

class Modal extends Component {
  render() {
    if (this.props.modalVisible == true) {
      return (
        <TouchableWithoutFeedback onPress={this.props.closeModal}>
          <View style={styles.overlay}>
            <View style={styles.container}>
              <View style={styles.subcontainer}>
                <StaticText
                  style={styles.title}
                  property={'message.confirmHideEmailTitle'}
                />
                <StaticText
                  style={styles.content}
                  property={'message.confirmHideEmail'}
                />
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  type={'red'}
                  title={'signIn.button.confirm'}
                  onPress={this.props.onCloseModal}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return null;
    }
  }
}

export default Modal;