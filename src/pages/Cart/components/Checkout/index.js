import React, { PureComponent } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class CheckoutComponent extends PureComponent {
  constructor() {
    super()
    this.formatPrice = this.formatPrice.bind(this)
  }

  formatPrice(input) {
    return (input).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  render() {
    return (
      <View
        style={styles.checkoutContainer}
      >
        <View
          style={styles.totalPrice}
        >
          <StaticText 
            style={styles.textData}
            property={'cart.content.subTotal'}/>

          <Text style={styles.textData}>
            <StaticText property={'cart.content.price'}/> {this.formatPrice(this.props.totalPrice)}
          </Text>
        </View>
        <TouchableHighlight
          onPress={() => alert('success')}
          style={styles.checkoutButton}
        >
          <StaticText 
            style={[styles.textData, styles.checkoutText]}
            property={'cart.button.checkout'}/>
        </TouchableHighlight>
      </View>
    )
  }
}


export default CheckoutComponent;