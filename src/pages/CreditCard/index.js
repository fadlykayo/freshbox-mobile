import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableWithoutFeedback, Image } from 'react-native';
import { actNav } from '@navigations';
import { language } from '@helpers';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import StaticText from '@components/StaticText';
import TotalPrice from '@components/TotalPrice';
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
                deliveryPrice: 0
            },
            focused: {
                creditNumber: true,
                expiredMonth: false,
                expiredYear: false,
                cvv: false,
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
    }

    componentDidMount() {
        this.countGrandTotal();
    }

    countGrandTotal() {
        let state = this.state;
		state.grandTotalPrice = this.props.delivery_price + this.props.totalPrice;
        this.setState(state)
    }

    onChangeText(type,value){
        let user = this.state.user;
        user[type] = value;
        this.setState({user})
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

    submitCreditNumber() {
        let creditCard = this.state.user.creditNumber.trim();
        this.onChangeText('creditCard', creditCard);
        this.focusForm('expiredMonth')
    }

    onBlurMonth() {
        let expiredMonth = this.state.user.expiredMonth;
        if (expiredMonth > 12) {
            this.onChangeText('expiredMonth', '');
            language.transformText('message.invalidMonth')
			.then(message => {
				this.props.set_error_status({
					status: true,
					title: 'formError.title.default',
					data: message,
                });
            });
        }
    }

    submitExpiredMonth() {
        let expiredMonth = this.state.user.expiredMonth.trim();
        this.onChangeText('expiredMonth', expiredMonth);
        this.focusForm('expiredYear')
    }

    onBlurYear() {
        let expiredYear = this.state.user.expiredYear;
        let today = new Date().getFullYear().toString().slice(1,4);
        if (Number(expiredYear) < Number(today)) {
            this.onChangeText('expiredYear', '');
            language.transformText('message.invalidYear')
			.then(message => {
				this.props.set_error_status({
					status: true,
					title: 'formError.title.default',
					data: message,
                });
            });
        }
    }

    submitExpiredYear() {
        let expiredYear = this.state.user.expiredYear.trim();
        this.onChangeText('expiredYear', expiredYear);
        this.focusForm('cvv')
    }

    submitCVV() {
        let cvv = this.state.user.cvv.trim();
        this.onChangeText('cvv', cvv);
        this.createOrder();
    }

    createOrder() {
        //validation credit card number
        //validation expired date

        let payloadData = this.props.navigation.state.params.transaction;
        payloadData.payment_method = "credit_card";
        payloadData.card_number = this.state.user.creditNumber;
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
            this.props.navigation.state.params.createOrderHandler(res.invoice);
        },
        (err) => {
            language.transformText('message.invalidYear')
			.then(message => {
				this.props.set_error_status({
					status: true,
					title: 'formError.title.default',
					data: message,
                });
            });
        })

    }

    onBlur() {
        let focused = this.state.focused;
        focused.creditNumber = false;
        focused.expiredMonth = false;
        focused.expiredYear = false;
        focused.cvv = false;
        this.setState({ focused })
    }

    clearFocused(input) {
        let focused = this.state.focused;
        focused.creditNumber = false;
        focused.expiredDate = false;
        focused.cvv = false;
        this.setState({ focused }, () => {
            if(input == 'creditNumber') {
                this.formCreditNumber.blur();
            }
            else if (input == 'expiredMonth') {
                this.formExpiredMonth.blur();
            }
            else if (input == 'expiredYear') {
                this.formExpiredYear.blur();
            }
            else {
                this.formCVV.blur();
            }
        })
    }

    focusForm(input) {
        this.onBlur();
        this.onChangeFocus(input);
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
                    <ScrollView 
                        style={styles.container}
                        // contentContainerStyle={styles.container}
                    >
                    <TouchableWithoutFeedback onPress={this.onBlur}>
                        <View style={styles.content}>
                            <View style={styles.top.main}>
                                <TouchableWithoutFeedback onPress={() => this.focusForm('creditNumber')}>
                                    <View>
                                        <StaticText
                                            style={styles.text.title}
                                            property={'creditCard.content.creditCard'}
                                        />
                                        <View style={styles.creditCard.place}>
                                            <View style={styles.creditCard.part(this.state.focused.creditNumber, this.state.user.creditNumber.length)}>
                                                <Text style={styles.text.content}>{this.state.user.creditNumber.slice(0,4)}</Text>
                                            </View>
                                            <View style={styles.creditCard.part(this.state.focused.creditNumber, this.state.user.creditNumber.length)}>
                                                <Text style={styles.text.content}>{this.state.user.creditNumber.slice(4,8)}</Text>
                                            </View>
                                            <View style={styles.creditCard.part(this.state.focused.creditNumber, this.state.user.creditNumber.length)}>
                                                <Text style={styles.text.content}>{this.state.user.creditNumber.slice(8,12)}</Text>
                                            </View>
                                            <View style={styles.creditCard.part(this.state.focused.creditNumber, this.state.user.creditNumber.length)}>
                                                <Text style={styles.text.content}>{this.state.user.creditNumber.slice(12,16)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <TextInput
                                ref={e => this.formCreditNumber = e}
                                autoFocus={true}
                                keyboardType={'number-pad'}
                                maxLength={16}
                                returnKeyType={'done'}
                                contextMenuHidden={true}
                                caretHidden={true}
                                value={this.state.user.creditNumber}
                                onChangeText={(value) => this.onChangeText('creditNumber',value)}
                                onSubmitEditing={this.submitCreditNumber}
                                style={styles.text.form}
                            />
                            <View style={styles.middle.place}>
                                <View style={styles.middle.part}>
                                    <View style={styles.expiredDate.main}>
                                        <StaticText
                                            style={styles.text.title}
                                            property={'creditCard.content.expiredDate'}
                                        />
                                        <View style={styles.expiredDate.place}>
                                            <TouchableWithoutFeedback onPress={() => this.focusForm('expiredMonth')}>
                                                <View style={styles.expiredDate.left(this.state.focused.expiredMonth)}>
                                                    <TextInput
                                                        ref={e => this.formExpiredMonth = e}
                                                        keyboardType={'number-pad'}
                                                        maxLength={2}
                                                        returnKeyType={'done'}
                                                        onBlur={this.onBlurMonth}
                                                        value={this.state.user.expiredMonth}
                                                        placeholder={'MM'}
                                                        onChangeText={(value) => this.onChangeText('expiredMonth',value)}
                                                        onSubmitEditing={this.submitExpiredMonth}
                                                        style={styles.text.expMonth}
                                                    />
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <View style={styles.expiredDate.middle}>
                                                <Text>/</Text>
                                            </View>
                                            <TouchableWithoutFeedback onPress={() => this.focusForm('expiredYear')}>
                                                <View style={styles.expiredDate.right(this.state.focused.expiredYear)}>
                                                    <TextInput
                                                        ref={e => this.formExpiredYear = e}
                                                        keyboardType={'number-pad'}
                                                        maxLength={2}
                                                        returnKeyType={'done'}
                                                        onBlur={this.onBlurYear}
                                                        value={this.state.user.expiredYear}
                                                        placeholder={'YY'}
                                                        onChangeText={(value) => this.onChangeText('expiredYear',value)}
                                                        onSubmitEditing={this.submitExpiredYear}
                                                        style={styles.text.expYear}
                                                    />
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.middle.part}>
                                    <TouchableWithoutFeedback onPress={() => this.onChangeFocus('cvv')}>
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
                                                    value={this.state.user.cvv}
                                                    onChangeText={(value) => this.onChangeText('cvv',value)}
                                                    onSubmitEditing={this.submitCVV}
                                                    style={styles.text.cvv}
                                                />
                                            </View>
                                            <Text style={styles.text.example}>Contoh: 123</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Image
                                        source={images.icon_credit_card}
                                        resizeMode={'contain'}
                                        style={styles.image.icon}
                                    />
                                </View>
                            </View>
                        </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                    <TotalPrice
                        type={'red'}
                        action={'creditCard'}
                        additional={this.props.additional}
                        title={'creditCard.content.checkout'}
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

const mapStateToProps = (state) => ({
        user: state.user.data,
        additional: state.product.additional.credit_card,
        totalPrice: state.product.total.price,
        delivery_price: state.product.delivery_price
})

const mapDispatchToProps = (dispatch) => ({
        create_order: (req, res, err) => dispatch(actions.transaction.api.create_order(req, res, err)),
        set_error_status: (payload) => dispatch(actions.network.reducer.set_error_status(payload)),
        clear_products: () => dispatch(actions.product.reducer.clear_products()),
})

export default connect(mapStateToProps,mapDispatchToProps)(CreditCard);
