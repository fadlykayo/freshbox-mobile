import React, { Component } from 'react';
import { View, Text } from 'react-native';
import StaticText from '@components/StaticText';
import Button from '@components/Button';
import numeral from 'numeral';
import styles from './styles';

class TotalPrice extends Component {
  	constructor() {
        super();
    }

  	render() {
        const subTotal = numeral(this.props.subTotal).format('0,0');
        const deliveryPrice = numeral(this.props.delivery_price).format('0,0');
        const grandTotal = numeral(this.props.grandTotal).format('0,0');
  	  	return (
            <View style={styles.container}>
                <View style={styles.subcontainer.content}>
                    <View style={styles.subcontainer.price}>
                        <StaticText
                            style={styles.text.title}
                            property={'checkout.content.subTotal'}
                        />
                        <Text style={styles.text.price}>
                            <StaticText
                                style={styles.text.price}
                                property={'checkout.content.price'}
                            />
                            {subTotal}
                        </Text>
                    </View>
                    <View style={styles.subcontainer.price}>
                        <StaticText
                            style={styles.text.title}
                            property={'checkout.content.delivery'}
                        />
                        <Text style={styles.text.price}>
                            <StaticText
                                style={styles.text.price}
                                property={'checkout.content.price'}
                            />
                            {deliveryPrice}
                        </Text>
                    </View>
                    <View style={styles.subcontainer.price}>
                        <StaticText
                            style={styles.text.total}
                            property={'checkout.content.grandTotal'}
                        />
                        <Text style={styles.text.total}>
                            <StaticText
                                style={styles.text.total}
                                property={'checkout.content.price'}
                            />
                            {grandTotal}
                        </Text>
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
