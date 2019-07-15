import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { actNav, navConstant } from '@navigations';
import StaticText from '@components/StaticText';
import Button from '@components/Button';
import numeral from 'numeral';
import styles from './styles';
import actions from '@actions';

class TotalPrice extends Component {
  	constructor() {
        super();
        this._renderButton = this._renderButton.bind(this);
        this.navigateToCart = this.navigateToCart.bind(this);
        this.navigateToChoosePayment = this.navigateToChoosePayment.bind(this);
        this.navigateToTransferInstruction = this.navigateToTransferInstruction.bind(this);
        this.cancelInvoice = this.cancelInvoice.bind(this);
    }
    

    cancelInvoice() {
       let payload = {
			header: {
				apiToken: this.props.user.authorization
			},
			body: {
				invoice: this.props.detailTransaction.invoice
			}
		};
        this.props.cancel_invoice(payload, () => actNav.goBack(), () => console.log())
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
                    if(this.props.paymentMethod == 'cash_on_delivery') {
                        return null
                    } else {
                        return (
                            <>
                            <Button
                                type={this.props.type}
                                onPress={this.navigateToTransferInstruction}
                                title={'historyDetail.content.pay'}
                            />
                            <View style={{marginVertical: 5}}></View>
                            <Button
                                type={'white'}
                                onPress={this.cancelInvoice}
                                title={'historyDetail.content.cancel'}
                            />
                            </>
                        )
                    }
                case 'finish': 
                    return (
                        <Button
                            type={this.props.type}
                            onPress={this.navigateToCart}
                            title={'historyDetail.content.reOrder'}
                        />
                    )
                case 'failed': 
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
                    title={'historyDetail.content.checkout'}
                />
            )
        }
    }

  	render(){
        // const subTotal = numeral(this.props.subTotal).format('0,0');
        // const deliveryPrice = numeral(this.props.delivery_price).format('0,0');
        // const grandTotal = numeral(this.props.grandTotal).format('0,0');
        // const additional = numeral(this.props.additional).format('0,0');
        // const discount = numeral(this.props.additional).format('0,0');
        
        let subTotal = numeral(this.props.subTotal).format('0,0');
        let deliveryPrice = numeral(this.props.delivery_price).format('0,0');
        let additional = numeral(this.props.additional).format('0,0');
        let discount = numeral(this.props.additional).format('0,0');
        let grandTotal = numeral(this.props.grandTotal).format('0,0');


        if(this.props.discount) {
            
            let totalDiscount = Number(this.props.additional) + Number(this.props.discount);
            discount = numeral(totalDiscount).format('0,0');

        } else {
            discount = numeral(this.props.additional).format('0,0');
        };
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
                    { 
                        this.props.action == undefined
                        ? null
                        : (
                            <View>
                                <View style={styles.subcontainer.price}>
                                    <StaticText
                                        style={styles.text.title}
                                        property={'checkout.content.adminCharge'}
                                    />
                                    <Text style={styles.text.price}>
                                        <StaticText
                                            style={styles.text.price}
                                            property={'checkout.content.price'}
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
                        )
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
                {this._renderButton()}
            </View>
  	  	);
  	}
}

const mapStateToProps = (state) => ({
    user: state.user.data,
    detailTransaction: state.transaction.detail,
})

const mapDispatchToProps = (dispatch) => ({
    cancel_invoice: (req,res,err) => dispatch(actions.transaction.api.cancel_invoice(req,res,err)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TotalPrice);
