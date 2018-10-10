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
    }

    render() {
        return (
            <Container>
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

export default connect(
	mapStateToProps,
	null)(CreditCard);
