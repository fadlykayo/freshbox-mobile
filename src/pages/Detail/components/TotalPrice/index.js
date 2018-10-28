import React, { Component } from 'react';
import { View, Text } from 'react-native';
import StaticText from '@components/StaticText';
import Button from '@components/Button';
import numeral from 'numeral';
import styles from './styles';

class TotalPrice extends Component {
  	constructor() {
        super();
        this._renderButton = this._renderButton.bind(this);
        this.navigateToCart = this.navigateToCart.bind(this);
        this.navigateToChoosePayment = this.navigateToChoosePayment.bind(this);
        this.navigateToTransferInstruction = this.navigateToTransferInstruction.bind(this);
    }

    navigateToCart(){
        this.props.navigateToCart();
    }

    navigateToTransferInstruction(){
        this.props.navigateToTransferInstruction();
    }

    navigateToChoosePayment(){
        this.props.navigateToChoosePayment();
    }

    _renderButton() {
        if(this.props.action == 'history'){
            switch(this.props.status) {
                case 'pending_payment': 
                    return (
                        <Button
                            type={this.props.type}
                            onPress={this.navigateToTransferInstruction}
                            title={'historyDetail.content.pay'}
                        />
                    )
                case 'finish': 
                    return (
                        <Button
                            type={this.props.type}
                            onPress={this.navigateToCart}
                            title={'historyDetail.content.reOrder'}
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
                {this._renderButton()}
            </View>
  	  	);
  	}
}

export default TotalPrice;
