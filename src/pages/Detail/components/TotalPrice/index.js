import React, { Component } from 'react';
import { View, Text } from 'react-native';
import StaticText from '@components/StaticText';
import Button from '@components/Button';
import numeral from 'numeral';
import styles from './styles';

class TotalPrice extends Component {
  	constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
        this.getStatusText = this.getStatusText.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.navigateToCart = this.navigateToCart.bind(this);
        this.navigateToTransferInstruction = this.navigateToTransferInstruction.bind(this);
    }

    navigateToCart() {
        this.props.navigateToCart()
    }

    navigateToTransferInstruction() {
        this.props.navigateToTransferInstruction()
    }

    onPress() {
        if(this.props.action == 'history') {
            switch(this.props.status) {
                case 'pending_payment': return this.props.navigateToTransferInstruction();
                case 'finish': return this.props.navigateToCart();
                default: return null;
            }
        } 
    }

    getStatusText(input) {
        switch(input) {
            case 'pending_payment': return 'historyDetail.content.pay'
            case 'finish': return 'historyDetail.content.reOrder'
            default: return null;
        }
    }

    renderButton() {
        if(this.props.action == 'history') {
            switch(this.props.status) {
                case 'pending_payment': 
                return (
                    <Button
                    type={this.props.type}
                    onPress={this.navigateToTransferInstruction}
                    title={this.getStatusText(this.props.status)}
                />
                )
                case 'finish': 
                return (
                    <Button
                    type={this.props.type}
                    onPress={this.navigateToCart}
                    title={this.getStatusText(this.props.status)}
                />
                )
                default: return null
            } 
        }
        else {
            return (
                <Button
                    type={this.props.type}
                    onPress={this.props.navigateToChoosePayment}
                    title={this.props.status}
                />
            )
        }
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
                { this.renderButton() }
            </View>
  	  	);
  	}
}

export default TotalPrice;
