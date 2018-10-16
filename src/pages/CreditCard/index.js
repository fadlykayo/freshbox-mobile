import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import FormInput from '@components/FormInput';
import TotalPrice from './components/TotalPrice';
import InputData from './components/InputData';
import StaticText from '@components/StaticText';
import styles from './styles';
import { connect } from 'react-redux';
import actions from '@actions';

class CreditCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                creditNumber: '',
                expiredDate: '',
                cvv: '',
                deliveryPrice: 0
            },
            grandTotalPrice: 0,
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.submitCreditNumber = this.submitCreditNumber.bind(this);
        this.submitExpiredDate = this.submitExpiredDate.bind(this);
        this.submitCVV = this.submitCVV.bind(this);
        this.displayED = this.displayED.bind(this);
        this.createOrder = this.createOrder.bind(this);
    }

    componentDidMount() {
        let state = this.state;
		state.grandTotalPrice = this.props.delivery_price + this.props.totalPrice
        
        this.setState(state)
    }

    onChangeText(type,value){
        let user = this.state.user;
        user[type] = value;
        this.setState({user})
    }

    submitCreditNumber() {
        let creditCard = this.state.user.creditNumber.trim();
        this.onChangeText('creditCard', creditCard);
        this.formExpiredDate.focus();
    }

    submitExpiredDate() {
        let expiredDate = this.state.user.expiredDate.trim();
        this.onChangeText('expiredDate', expiredDate);
        this.formCVV.focus();
    }

    submitCVV() {
        let cvv = this.state.user.cvv.trim();
        this.onChangeText('cvv', cvv);
        this.createOrder();
    }

    createOrder() {
        //validation credit card number
        //validation expired date

        // console.log(this.props.navigation.state)
        let payloadData = this.props.navigation.state.params.transaction;
        payloadData.payment_method = "credit_card";
        payloadData.card_number = this.state.user.creditNumber;
        payloadData.card_exp_month = this.state.user.expiredDate.slice(0,2);
        payloadData.card_exp_year = this.state.user.expiredDate.slice(2);
        
        let payload = {
            header: {
                apiToken: this.props.user.authorization
            },
            body: payloadData,
            params: {}
        }

        console.log("ready to order",payload)
        this.props.create_order(payload,
            (success) => {
                console.log("SUCCESS ORDER", success)
            },
            (err) => {
                console.log(err)
            })

    }

    displayED(input) {
        let cardNumber = '';

        for (let i = 0; i < input.length; i++) {
            if ((i+1)%4 == 0) {
                cardNumber += `${input[i]} `;
            } 
            else {
                cardNumber += input[i];
            }
        }

        return cardNumber;
    }

    render() {
        return (
            <Container 				
                bgColorBottom={'veryLightGrey'} 				
                bgColorTop={'red'} 			
            >
                <NavigationBar
			    	title={'creditCard.navigationTitle'}
			    	onPress={actNav.goBack}
			    />
                <View style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.content}>
                            <FormInput 
                                ref={c => {this.formCreditNumber = c}}
                                type={'creditNumber'}
                                autoFocus={true}
                                maxLength={16}
                                keyboardType={'number-pad'}
                                value={this.state.user.creditNumber}
                                onChangeText={this.onChangeText}
                                label={'creditCard.content.cardNumber'}
                                placeholder={'creditCard.content.cardNumber'}
                                onSubmitEditing={this.submitCreditNumber}
                            />
                            <View style={styles.middleComponent}>
                                <View style={styles.expiredDatePlace}>
                                    <FormInput 
                                        ref={c => {this.formExpiredDate = c}}
                                        type={'expiredDate'}
                                        maxLength={6}
                                        keyboardType={'number-pad'}
                                        value={this.state.user.expiredDate}
                                        onChangeText={this.onChangeText}
                                        label={'creditCard.content.expiredDate'}
                                        placeholder={'creditCard.content.expED'}
                                        onSubmitEditing={this.submitExpiredDate}
                                    />
                                </View>
                                <View style={styles.expiredDatePlace}>
                                    <FormInput 
                                        ref={c => {this.formCVV = c}}
                                        type={'cvv'}
                                        maxLength={3}
                                        isPassword={true}
                                        keyboardType={'number-pad'}
                                        value={this.state.user.cvv}
                                        onChangeText={this.onChangeText}
                                        label={'creditCard.content.cvv'}
                                        placeholder={'creditCard.content.cvv'}
                                        onSubmitEditing={this.submitCVV}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <TotalPrice
                        subTotal={this.props.totalPrice}
                        grandTotal={this.state.grandTotalPrice}
                        delivery_price={this.props.delivery_price}
                        onPress={this.createOrder}
                    />
                </View>
               
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        user: state.user.data,
        totalPrice: state.product.total.price,
        delivery_price: state.product.delivery_price
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        create_order: (req, res, err) => dispatch(actions.transaction.api.create_order(req, res, err))
    }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps)(CreditCard);
