import React, {PureComponent} from 'react';
import {View, TouchableOpacity, Modal, Image, Text, ScrollView} from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';
import numeral from 'numeral';
import images from '@assets';

class DiscountDetail extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      date: [],
    };
    this.closeDeliveryDate = this.closeDeliveryDate.bind(this);
    this.getDeliveryDate = this.getDeliveryDate.bind(this);
  }

  getDeliveryDate(type, value) {
    this.props.getDeliveryDate(type, value);
  }

  closeDeliveryDate() {
    this.props.closeDeliveryDate();
  }

  render() {
    if (this.props.modalVisible) {

      return (
        <View style={styles.background}>
          <Modal
            animationType={'slide'}
            transparent={true}
            visible={this.props.modalVisible}
            onRequestClose={this.closeDeliveryDate}
          >
            <TouchableOpacity style={styles.touchable} onPress={this.closeDeliveryDate}></TouchableOpacity>
            <View style={styles.container}>
              <View style={styles.subcontainer.title}>
                <TouchableOpacity
                  onPress={this.closeDeliveryDate}
                  style={styles.subcontainer.button}
                >
                  <Image
                    resizeMode={'contain'}
                    source={images.icon_scroll_down}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.detail.container}>
                <Text style={styles.detail.text}>Discount Detail</Text>
              </View>


              <ScrollView style={styles.innerContainer}>
                {
                  this.props.subTotal >= this.props.freeShipping ?
                    <View style={styles.text.contentContainer}>
                      <Text style={styles.text.content}>Delivery Discount</Text>
                      <Text style={styles.text.content}>
                        <StaticText
                          style={styles.text.content}
                          property={'checkout.content.price'}
                        />
                        {numeral(this.props.delivery_price).format('0,0')}
                      </Text>
                    </View> : null
                }

                {
                  this.props.discount > 0 ?
                    <View style={styles.text.contentContainer}>
                      <Text style={styles.text.content}>Voucher Discount</Text>
                      <Text style={styles.text.content}>
                        <StaticText
                          style={styles.text.content}
                          property={'checkout.content.price'}
                        />
                        {numeral(this.props.discount).format('0,0')}
                      </Text>
                    </View> : null
                }

                {
                  this.props.additional > 0 ?
                    <View style={styles.text.contentContainer}>
                      <Text style={styles.text.content}>Process Fee Discount</Text>
                      <Text style={styles.text.content}>
                        <StaticText
                          style={styles.text.content}
                          property={'checkout.content.price'}
                        />
                        {numeral(this.props.additional).format('0,0')}
                      </Text>
                    </View> : null
                }


              </ScrollView>
              <View style={styles.text.totalContainer}>
                <Text style={styles.text.total}>Grand Total Discount</Text>
                <Text style={styles.text.total}>
                  <StaticText
                    style={styles.text.content}
                    property={'checkout.content.price'}
                  />
                  {numeral(this.props.additional + this.props.discount + (this.props.subTotal >= this.props.freeShipping ? this.props.delivery_price : 0)).format('0,0')}
                </Text>
              </View>
            </View>

          </Modal>
        </View>
      );
    } else {
      return null;
    }
  }
}

export default DiscountDetail;