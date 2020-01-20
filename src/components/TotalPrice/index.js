import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import Button from '@components/Button';
import numeral from 'numeral';
import styles from './styles';
import images from '@assets';

class TotalPrice extends Component {
  	constructor() {
        super();
    }

    openDiscountDetail = () => {
        this.props.openDiscountDetail();
    }

  	render() {
        
        let subTotal        = numeral(this.props.subTotal).format('0,0');
        let deliveryPrice   = numeral(this.props.delivery_price).format('0,0');
        let additional      = numeral(this.props.additional).format('0,0');
        let discount        = numeral(this.props.additional).format('0,0');
        let grandTotal      = numeral(this.props.grandTotal).format('0,0');


        
       

        if(this.props.freeShipping && this.props.freeShipping !== null && this.props.freeShipping > 0) {
            
            if(this.props.subTotal >= this.props.freeShipping) {
                let discountFormated    = numeral(discount).format('0');
                let grandTotalFormated  = numeral(grandTotal).format('0');
                let discountAdd         = parseInt(discountFormated) + this.props.delivery_price;
                let adjustedGrandTotal  = parseInt(grandTotalFormated) - this.props.delivery_price;

                discount        = numeral(discountAdd).format('0,0');
                grandTotal      = numeral(adjustedGrandTotal).format('0,0');
            }
            
        }
        
        if(this.props.discount) {
            
            let totalDiscount   = parseInt(numeral(discount).format('0')) + parseInt(this.props.discount);
            
            discount            = numeral(totalDiscount).format('0,0')
            grandTotalFormated  = numeral(grandTotal).format('0')
            grandTotalAdjusted  = parseInt(grandTotalFormated) + this.props.delivery_price - this.props.discount
            grandTotal          = numeral(grandTotalAdjusted).format('0,0')

            if(!this.props.action) {
                let adjustedGrandTotal      = numeral(grandTotal).format('0');
                let grandTotalMinDiscount   = parseInt(adjustedGrandTotal) - this.props.delivery_price;
                grandTotal                  = numeral(grandTotalMinDiscount).format('0,0')
            }
            
        };
        
        

        if (!this.props.checkout) {

            return (
                <View style={styles.container}>
                    <View style={styles.subcontainer.content(this.props.checkout)}>
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
                                    property={'checkout.content.addAmount'}
                                />
                                {deliveryPrice}
                            </Text>
                        </View>
                        { this.props.action
                            ?   <View>
                                    <View style={styles.subcontainer.price}>
                                        <StaticText
                                            style={styles.text.title}
                                            property={'checkout.content.adminCharge'}
                                        />
                                        <Text style={styles.text.price}>
                                            <StaticText
                                                style={styles.text.price}
                                                property={'checkout.content.addAmount'}
                                            />
                                            {additional}
                                        </Text>
                                    </View>
                                    <View style={styles.subcontainer.price}>
                                
                                        <StaticText
                                            style={styles.text.title}
                                            property={'checkout.content.discount'}
                                        />
                                        
                                        <Text style={styles.text.price}>
                                            - <StaticText
                                                style={styles.text.price}
                                                property={'checkout.content.price'}
                                            />
                                            {discount}
                                        </Text>
                                    </View>
                                </View>
                            : null
                        }
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
        } else {
            return (
                <View style={styles.subcontainer.content(this.props.checkout)}>
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
                                    property={'checkout.content.addAmount'}
                                />
                                {deliveryPrice}
                            </Text>
                        </View>
                        { this.props.action
                            ?   <View>
                                    <View style={styles.subcontainer.price}>
                                        <StaticText
                                            style={styles.text.title}
                                            property={'checkout.content.adminCharge'}
                                        />
                                        <Text style={styles.text.price}>
                                            <StaticText
                                                style={styles.text.price}
                                                property={'checkout.content.addAmount'}
                                            />
                                            {additional}
                                        </Text>
                                    </View>
                                    <TouchableOpacity onPress={this.openDiscountDetail}>
                                        <View style={styles.subcontainer.price}>
                                            <View style={styles.subcontainer.left}>
                                            <StaticText
                                                style={styles.text.title}
                                                property={'checkout.content.discount'}
                                            />
                                            <Image
                                                style={styles.text.icon}
                                                source={images.ic_info_grey}
                                            />

                                            </View>
                                            
                                            <Text style={styles.text.price}>
                                                - <StaticText
                                                    style={styles.text.price}
                                                    property={'checkout.content.price'}
                                                />
                                                {discount}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            : null
                        }
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
            )
        }
        
  	}
}

export default TotalPrice;
