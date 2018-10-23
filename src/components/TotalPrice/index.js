import React, { Component } from 'react';
import { View, Text } from 'react-native';
import StaticText from '@components/StaticText';
import Button from '@components/Button';
import numeral from 'numeral';
import styles from './styles';

class TotalPrice extends Component {
  	constructor(props) {
        super(props);
    }

  	render() {
        const subTotal = numeral(this.props.subTotal).format('0,0');
        const deliveryPrice = numeral(this.props.delivery_price).format('0,0');
        const grandTotal = numeral(this.props.grandTotal).format('0,0');
  	  	return (
            <View style={styles.container}>
                <View style={styles.topComponent}>
                    <View style={styles.spaceBetweenData}>
                        <StaticText
                            style={styles.staticText}
                            property={'checkout.content.subTotal'}
                        />
                        <Text style={styles.price}><StaticText
                        property={'checkout.content.price'}/>{subTotal}</Text>
                    </View>
                    <View style={styles.spaceBetweenData}>
                        <StaticText
                            style={styles.staticText}
                            property={'checkout.content.delivery'}
                        />
                        <Text style={styles.price}><StaticText
                        property={'checkout.content.price'}/>{deliveryPrice}</Text>
                    </View>
                    <View style={styles.grandTotal}>
                        <StaticText
                            style={styles.staticText}
                            property={'checkout.content.grandTotal'}
                        />
                        <Text style={styles.grandPrice}><StaticText
                        property={'checkout.content.price'}/>{grandTotal}</Text>
                    </View>
                </View>
                <Button
                    type={this.props.type}
                    onPress={this.props.onPress}
                    title={this.props.title}
                />
            </View>
  	  	);
  	}
}

export default TotalPrice;
