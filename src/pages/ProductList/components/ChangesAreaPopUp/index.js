import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons'
import StaticText from '@components/StaticText';
import Button from '@components/Button';
import styles from './styles';
import images from '@assets';

export default class ChangesAreaPopUp extends Component {
  constructor(props) {
    super(props);
  }

  onPressCancel = () => {
    this.props.closePopUpInfo()
    this.props.onCancelSelectedArea()
  }

  onPressConfirm = () => {
    this.props.onConfirmSelectedArea()
  }

  render() {
    return (
      <Modal
        animationType = 'fade'
        transparent = {true}
        visible = {this.props.visible}
        onRequestClose={this.onPressCancel}
      >
        <View style={{flex: 1}}>
          <>
            <View style={styles.modal.container}>
            </View>
            
            <View style={styles.modal.card}>
            <TouchableOpacity style={styles.modal.containerIcon} onPress={this.onPressCancel}>
                <Icon name="close" size={20} color='#D8D8D8' />
            </TouchableOpacity>
              <View style={styles.modal.content}>
                  <Image
										resizeMode={'contain'}
										source={images.multi_location}
                    style={styles.modal.image}
									/>
                <View style={styles.modal.textContainer}>
                  <StaticText
                    style={styles.modal.title}
                    property={'changesArea.title'}
                  />
                  <Text style={styles.modal.text}>
                  <StaticText
                    property={'changesArea.contentMessage.message1'}
                  />
                  <StaticText
                  style={styles.modal.textBold}
                    property={'changesArea.contentMessage.message2'}
                  />
                  <StaticText
                    property={'changesArea.contentMessage.message3'}
                  />
                  </Text>
                </View>
                
              </View>

              <View style={styles.modal.buttonWrapper}>
                <View style={styles.modal.button.container}>
                  <Button
                    type={'white'}
                    title={'changesArea.button.cancel'}
                    onPress={() => this.onPressCancel()}
                  />
                </View>
                <View style={styles.modal.button.container}>
                  <Button
                    type={'red'}
                    title={'changesArea.button.next'}
                    onPress={() => this.onPressConfirm()}
                  />
                </View>
              </View>
            </View>
          </> 
        </View>
      </Modal>

    );
  }
}
