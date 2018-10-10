import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import numeral from 'numeral';
import styles from './styles';

class TotalPrice extends Component {
  	constructor(props) {
        super(props);
        this.navigateToChoosePayment = this.navigateToChoosePayment.bind(this);  
    }

    navigateToChoosePayment() {
        this.props.onPress()
    }

  	render() {
  	  	return (
            <View style={styles.bottomComponent}>
                <View style={styles.topTotalPrice}>
                    <View style={styles.subTotal}>
                        <StaticText
                            style={styles.staticText}
                            property={'checkout.content.subTotal'}
                        />
                        <Text style={styles.price}><StaticText
                        property={'checkout.content.price'}/>{numeral(this.props.subTotal).format('0,0')}</Text>
                    </View>
                    <View style={styles.subTotal}>
                        <StaticText
                            style={styles.staticText}
                            property={'checkout.content.delivery'}
                        />
                        <Text style={styles.price}><StaticText
                        property={'checkout.content.price'}/>{numeral(this.props.delivery_price).format('0,0')}</Text>
                    </View>
                    <View style={styles.grandTotal}>
                        <StaticText
                            style={styles.staticText}
                            property={'checkout.content.grandTotal'}
                        />
                        <Text style={styles.grandPrice}><StaticText
                        property={'checkout.content.price'}/>{numeral(this.props.grandTotal).format('0,0')}</Text>
                    </View>
                </View>
                <TouchableOpacity 
                    onPress={this.navigateToChoosePayment}
                    style={styles.checkoutButton}
                >
                    <StaticText
                        style={styles.checkoutText}
                        property={'checkout.content.checkout'}
                    />
                </TouchableOpacity>
                
            </View>
  	  	);
  	}
}

export default TotalPrice;
