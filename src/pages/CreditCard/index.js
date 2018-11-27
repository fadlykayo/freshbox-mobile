import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableWithoutFeedback, Image, Keyboard } from 'react-native';
import { actNav } from '@navigations';
import { language, validation } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import StaticText from '@components/StaticText';
import VerificationText from '@components/VerificationText';
import TotalPrice from './components/TotalPrice';
// import CreditCardNumber from './components/CreditCardNumber';
// import ExpiredDate from './components/ExpiredDate';
import styles from './styles';
import images from '@assets';
import { connect } from 'react-redux';
import actions from '@actions';

class CreditCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                creditNumber: '',
                expiredMonth: '',
                expiredYear: '',
                cvv: '',
            },
            focused: {
                creditNumber: true,
                expiredMonth: false,
                expiredYear: false,
                cvv: false,
            },
            validateStatus:{
                creditNumberLength: true,
                creditNumber: true,
                expiredMonthLength: true,
                expiredMonthFormat: true,
                expiredYearLength: true,
                expiredYearFormat: true,
                cvvFormat: true,
            },
            grandTotalPrice: 0,
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeFocus = this.onChangeFocus.bind(this);
        this.submitCreditNumber = this.submitCreditNumber.bind(this);
        this.submitExpiredMonth = this.submitExpiredMonth.bind(this);
        this.submitExpiredYear = this.submitExpiredYear.bind(this);
        this.submitCVV = this.submitCVV.bind(this);
        this.displayED = this.displayED.bind(this);
        this.createOrder = this.createOrder.bind(this);
        this.clearFocused = this.clearFocused.bind(this);
        this.focusForm = this.focusForm.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onBlurMonth = this.onBlurMonth.bind(this);
        this.onBlurYear = this.onBlurYear.bind(this);
        this.countGrandTotal = this.countGrandTotal.bind(this);
        this._renderCardImage = this._renderCardImage.bind(this);
        this.validationData = this.validationData.bind(this);
        this.setValidation = this.setValidation.bind(this);
        this.clearValidation = this.clearValidation.bind(this);
    }

    componentDidMount() {
        this.countGrandTotal();
    }

    _renderCardImage() {
        switch(this.state.user.creditNumber[0]) {
            case '5':
                return (
                    <Image
                        source={images.icon_mastercard}
                        resizeMode={'contain'}
                        style={styles.image.cardLogo}
                    />
                )
            case '4':
                return (
                    <Image
                        source={images.icon_visa}
                        resizeMode={'contain'}
                        style={styles.image.cardLogo}
                    />
                )
            default: return null
        }
    }

    countGrandTotal() {
        let state = this.state;
		state.grandTotalPrice = this.props.delivery_price + this.props.totalPrice;
        this.setState(state)
    }

    onChangeText(type,value,length){
        let user = this.state.user;
        user[type] = value;
        if(user[type].length < length) {
            this.setState({user})
        }
        else {
            this.clearValidation();
            this.setState({user}, () => {
                if(type == 'creditNumber') {
                    this.submitCreditNumber();
                }
                else if (type == 'expiredMonth') {
                    this.submitExpiredMonth();
                }
                else if (type == 'expiredYear') {
                    this.formCVV.focus();
                    this.onBlur();
                    this.submitExpiredYear();
                }
                else {
                    this.submitCVV();
                }
            })
        }
    }
    
    onChangeFocus(type) {
        let focused = this.state.focused;
        focused[type] = true;
        this.setState({focused}, () => {
            if(type == 'creditNumber') {
                this.formCreditNumber.focus();
            }
            else if (type == 'expiredMonth') {
                this.formExpiredMonth.focus();
            }
            else if (type == 'expiredYear') {
                this.formExpiredYear.focus();
            }
            else {
                this.formCVV.focus();
            }
        })
    }

    focusForm(input) {
        this.onBlur();
        this.onChangeFocus(input);
    }

    onBlur() {
        let state = this.state;
        if(state.user.expiredMonth.length == 1 && state.user.expiredMonth != 0) {
            state.user.expiredMonth = `0${state.user.expiredMonth}`
        }
        state.focused.creditNumber = false;
        state.focused.expiredMonth = false;
        state.focused.expiredYear = false;
        state.focused.cvv = false;
        this.setState(state)
    }

    clearFocused(input) {
        let focused = this.state.focused;
        this.setState({ focused }, () => {
            if(input == 'creditNumber') {
                focused.creditNumber = false;
                this.formCreditNumber.blur();
            }
            else if (input == 'expiredMonth') {
                focused.expiredDate = false;
                this.formExpiredMonth.blur();
            }
            else if (input == 'expiredYear') {
                focused.cvv = false;
                this.formExpiredYear.blur();
            }
            else {
                this.formCVV.blur();
            }
        })
    }

    submitCreditNumber() {
        this.formExpiredMonth.focus();
    }

    onBlurMonth() {
        let expiredMonth = this.state.user.expiredMonth;
        if(expiredMonth.length > 0) {
            let user = this.state.user;
            if (expiredMonth > 12) {
                language.transformText('message.invalidMonth')
                .then(message => {
                    this.props.set_error_status({
                        status: true,
                        title: 'formError.title.default',
                        data: message,
                    });
                    setTimeout(() => {
                        expiredMonth = '';
                        user.expiredMonth = expiredMonth;
                        this.setState({user}, () => {
                            this.formExpiredMonth.focus();
                        })
                    },1000)
                });
            } else this.formExpiredYear.focus();
        }
    }

    submitExpiredMonth() {
        this.onBlur();
        this.onBlurMonth();
    }

    onBlurYear() {
        let expiredYear = this.state.user.expiredYear;
        if (expiredYear.length > 0) {
            let today = new Date().getFullYear().toString().slice(1,4);
            let user = this.state.user;
            if (Number(expiredYear) < Number(today)) {
                language.transformText('message.invalidYear')
                .then(message => {
                    this.props.set_error_status({
                        status: true,
                        title: 'formError.title.default',
                        data: message,
                    });
                    setTimeout(() => {
                        expiredYear = '';
                        user.expiredYear = expiredYear;
                        this.setState({user}, () => {
                            this.formExpiredYear.focus();
                        })
                    },1000)
                });
            } else this.formCVV.focus();
        }
    }

    submitExpiredYear() {
        this.onBlur();
        this.onBlurYear();
    }

    submitCVV() {
        let cvv = this.state.user.cvv.trim();
        let user = this.state.user;
        user.cvv = cvv;
        this.setState({user}, () => {
            Keyboard.dismiss();
        });
    }

    setValidation(type,value){
        let validateStatus = JSON.parse(JSON.stringify(this.state.validateStatus));
        validateStatus[type] = value;
        this.setState({validateStatus});
    }

    clearValidation(){
        let validateStatus = JSON.parse(JSON.stringify(this.state.validateStatus));
        validateStatus.creditNumberLength = true;
        validateStatus.creditNumber = true;
        validateStatus.expiredMonthLength = true;
        validateStatus.expiredMonthFormat = true;
        validateStatus.expiredYearLength = true;
        validateStatus.expiredYearFormat = true;
        validateStatus.cvvFormat = true;
        this.setState({validateStatus});
    }

    validationData() {
        validation.creditCard(this.state.user)
        .then(() => {
            this.createOrder();
        })
        .catch((err) => {
            this.setValidation(err,false)
        })
    }

    createOrder() {
        //validation credit card number
        //validation expired date
        let payloadData = this.props.navigation.state.params.transaction;
        payloadData.payment_method = "credit_card";
        payloadData.card_number = this.state.user.creditNumber.split('-').join('');
        payloadData.card_exp_month = this.state.user.expiredMonth;
        payloadData.card_exp_year = `20${this.state.user.expiredYear}`;
        payloadData.card_cvv = this.state.user.cvv;
        
        let payload = {
            header: {
                apiToken: this.props.user.authorization
            },
            body: payloadData,
            params: {}
        }

        this.props.create_order(payload,
        (res) => {
            this.props.clear_products();
            this.props.navigation.state.params.createOrderHandler(res.invoice, res.payment_method);
        },
        (err) => {
            language.transformText('message.invalidCreditCard')
			.then(message => {
				this.props.set_error_status({
					status: true,
					title: 'formError.title.default',
					data: message,
                });
            });
        })
    }

    displayED(input) {
        let newInput = input.split('-').join('');
        let cardNumber = '';

        for (let i = 0; i < newInput.length; i++) {
            if (i == newInput.length - 1) {
                cardNumber += newInput[i];
            }
            else if ((i+1)%4 == 0) {
                cardNumber += `${newInput[i]}-`;
            } 
            else {
                cardNumber += newInput[i];
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
                    <TouchableWithoutFeedback onPress={this.onBlur}>
                        <ScrollView
                            keyboardShouldPersistTaps={'handled'}
                            keyboardDismissMode={'on-drag'}
                            style={styles.container}
                        >
                            <View style={styles.content}>
                                <View style={styles.top.main}>
                                    <StaticText
                                        style={styles.text.title}
                                        property={'creditCard.content.creditCard'}
                                    />
                                    <View style={styles.top.content(this.state.focused.creditNumber)}>
                                        <TextInput
                                            ref={e => this.formCreditNumber = e}
                                            autoFocus={true}
                                            maxLength={this.state.focused.creditNumber ? 16 : 19}
                                            keyboardType={'number-pad'}
                                            returnKeyType={'done'}
                                            value={this.state.focused.creditNumber ? this.state.user.creditNumber : this.displayED(this.state.user.creditNumber)}
                                            placeholder={'5009-1234-5678-XXXX'}
                                            onFocus={() => this.focusForm('creditNumber')}
                                            onChangeText={(value) => this.onChangeText('creditNumber',value,16)}
                                            onSubmitEditing={this.submitCreditNumber}
                                            style={styles.text.creditCard}
                                        />
                                    </View>
                                    { this._renderCardImage() }
                                    <VerificationText
                                        validation={this.state.validateStatus.creditNumberLength}
                                        property={'creditCard.validation.creditNumberLength'}
                                    />
                                    <VerificationText
                                        validation={this.state.validateStatus.creditNumber}
                                        property={'creditCard.validation.creditNumber'}
                                    />
                                </View>
                                <View style={styles.middle.place}>
                                    <View style={styles.middle.part}>
                                        <View style={styles.expiredDate.main}>
                                            <StaticText
                                                style={styles.text.title}
                                                property={'creditCard.content.expiredDate'}
                                            />
                                            <View style={styles.expiredDate.place}>
                                                <View style={styles.expiredDate.left(this.state.focused.expiredMonth)}>
                                                    <TextInput
                                                        ref={e => this.formExpiredMonth = e}
                                                        selectTextOnFocus={true}
                                                        keyboardType={'number-pad'}
                                                        maxLength={2}
                                                        returnKeyType={'done'}
                                                        onBlur={this.onBlurMonth}
                                                        value={this.state.user.expiredMonth}
                                                        onFocus={() => this.focusForm('expiredMonth')}
                                                        placeholder={'MM'}
                                                        onChangeText={(value) => this.onChangeText('expiredMonth',value,2)}
                                                        onSubmitEditing={this.submitExpiredMonth}
                                                        style={styles.text.expMonth}
                                                    />
                                                </View>
                                                <View style={styles.expiredDate.middle}>
                                                    <Text>/</Text>
                                                </View>
                                                <View style={styles.expiredDate.right(this.state.focused.expiredYear)}>
                                                    <TextInput
                                                        ref={e => this.formExpiredYear = e}
                                                        keyboardType={'number-pad'}
                                                        maxLength={2}
                                                        returnKeyType={'done'}
                                                        onBlur={this.onBlurYear}
                                                        value={this.state.user.expiredYear}
                                                        placeholder={'YY'}
                                                        onFocus={() => this.focusForm('expiredYear')}
                                                        onChangeText={(value) => this.onChangeText('expiredYear',value,2)}
                                                        onSubmitEditing={this.submitExpiredYear}
                                                        style={styles.text.expYear}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.middle.part}>
                                        <View style={styles.top.content}>
                                            <StaticText
                                                style={styles.text.title}
                                                property={'creditCard.content.cvv'}
                                            />
                                            <View style={styles.expiredDate.cvv(this.state.focused.cvv)}>
                                                <TextInput
                                                    ref={e => this.formCVV = e}
                                                    keyboardType={'number-pad'}
                                                    maxLength={3}
                                                    returnKeyType={'done'}
                                                    secureTextEntry={true}
                                                    onFocus={() => this.focusForm('cvv')}
                                                    value={this.state.user.cvv}
                                                    onChangeText={(value) => this.onChangeText('cvv',value,3)}
                                                    onSubmitEditing={this.submitCVV}
                                                    style={styles.text.cvv}
                                                />
                                            </View>
                                            <StaticText
                                                style={styles.text.example}
                                                property={'creditCard.content.examplecvv'}
                                            />
                                        </View>
                                        <Image
                                            source={images.icon_credit_card}
                                            resizeMode={'contain'}
                                            style={styles.image.icon}
                                        />
                                    </View>
                                </View>
                                    <VerificationText
                                        validation={this.state.validateStatus.expiredMonthLength}
                                        property={'creditCard.validation.expiredMonthLength'}
                                    />
                                    <VerificationText
                                        validation={this.state.validateStatus.expiredMonthFormat}
                                        property={'creditCard.validation.expiredMonthLength'}
                                    />
                                    <VerificationText
                                        validation={this.state.validateStatus.expiredYearFormat}
                                        property={'creditCard.validation.expiredYearFormat'}
                                    />
                                    <VerificationText
                                        validation={this.state.validateStatus.expiredYearLength}
                                        property={'creditCard.validation.expiredYearLength'}
                                    />
                                    <VerificationText
                                        validation={this.state.validateStatus.cvvFormat}
                                        property={'creditCard.validation.cvvFormat'}
                                    />
                            </View>
                        </ScrollView>
                    </TouchableWithoutFeedback>
                    <TotalPrice
                        type={'red'}
                        action={'creditCard'}
                        additional={this.props.additional}
                        title={'creditCard.content.checkout'}
                        subTotal={this.props.totalPrice}
                        grandTotal={this.state.grandTotalPrice}
                        delivery_price={this.props.delivery_price}
                        onPress={this.validationData}
                    />
                </View>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
        user: state.user.data,
        additional: state.product.additional.credit_card,
        totalPrice: state.product.total.price,
        delivery_price: state.product.delivery_price
})

const mapDispatchToProps = (dispatch) => ({
    clear_products: () => dispatch(actions.product.reducer.clear_products()),
    create_order: (req, res, err) => dispatch(actions.transaction.api.create_order(req, res, err)),
    set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
})

export default connect(mapStateToProps,mapDispatchToProps)(CreditCard);
