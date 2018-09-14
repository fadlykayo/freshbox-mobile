import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';


class CartComponent extends PureComponent {
  constructor() {
    super()
  }

  formatPrice = (input) => {
    return (input).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  render() {
    return (
      <View
        style={styles.contentContainer}
      >
        <Text
          style={styles.fontTitle}
        >{this.props.data.title}</Text>
        <Text
          style={styles.fontCategory}
        >{this.props.data.category}</Text>
        <Text style={styles.fontTitle}>
          <StaticText property={'cart.content.price'}/>{this.formatPrice(this.props.data.price)}
          <StaticText 
            style={styles.fontPack}
            property={'cart.content.pack'}/>
        </Text>
      </View>
    );
  }
}

export default CartComponent;