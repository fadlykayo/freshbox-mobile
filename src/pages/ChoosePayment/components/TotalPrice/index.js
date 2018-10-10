import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import numeral from 'numeral';
import styles from './styles';

class TotalPrice extends Component {
  	constructor(props) {
  		super(props)
    }

  	render() {
  	  	return (
            <View style={styles.bottomComponent}>
                <View style={styles.topTotalPrice}>
                    <View style={styles.subTotal}>
                        <StaticText
                            style={styles.staticText}
                            property={'choosePayment.content.subTotal'}
                        />
                        <Text style={styles.price}><StaticText
                        property={'choosePayment.content.price'}/>{numeral(this.props.subTotal).format('0,0')}</Text>
                    </View>
                    <View style={styles.subTotal}>
                        <StaticText
                            style={styles.staticText}
                            property={'choosePayment.content.delivery'}
                        />
                        <Text style={styles.price}><StaticText
                        property={'choosePayment.content.price'}/>{numeral(this.props.data.deliveryPrice).format('0,0')}</Text>
                    </View>
                    <View style={styles.grandTotal}>
                        <StaticText
                            style={styles.staticText}
                            property={'choosePayment.content.grandTotal'}
                        />
                        <Text style={styles.grandPrice}><StaticText
                        property={'choosePayment.content.price'}/>{numeral(this.props.grandTotal).format('0,0')}</Text>
                    </View>
                </View>
            </View>
  	  	);
  	}
}

export default TotalPrice;
