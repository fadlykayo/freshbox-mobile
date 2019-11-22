import React, { Component } from 'react';
import { View, Text, Modal, TouchableHighlight, Image } from 'react-native';
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

  render() {
    return (
      <Modal
        animationType = 'fade'
        transparent = {true}
        visible = {this.props.visible}

      >
        <View style={{flex: 1}}>
          <TouchableHighlight style={{flex: 1}} onPress = {this.closePopUpInfo}>
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
                    property={'popup.title'}
                  />
                  <Text style={styles.modal.text}>Kami dari pihak Freshbox menghimbau kepada seluruh user untuk tidak mudah percaya kepada orang lain yang menawarkan produk Freshbox dengan harga lebih murah. </Text>
                  <Text style={styles.modal.textBottom}>Kami <Text style={styles.modal.textBold}>tidak akan bertanggung jawab</Text> dengan kualitas produk yang dibeli dari sumber yang mengatasnamakan Freshbox. </Text>
                </View>
                
              </View>

              <View style={styles.modal.button.container}>
                  <Button
                    type={'red'}
                    title={'popup.button'}
                    onPress={this.props.closePopUpInfo}
                  />
                </View>
              
            </View>
          </> 
          </TouchableHighlight>
        </View>
      </Modal>

    );
  }
}
