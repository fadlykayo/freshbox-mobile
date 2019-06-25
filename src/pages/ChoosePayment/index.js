import React, { Component } from 'react';
import { View, WebView, Platform } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import styles from './styles';
import { connect } from 'react-redux';
import { gopay } from '@helpers';


class ChoosePayment extends Component {
    constructor() {
        super();
        this.state = {
            redirect_url: '',
            token: '',
            invoice: '',
            paymentType: '',
        }
        this.navigationStateChangeHandler = this.navigationStateChangeHandler.bind(this);
        this.handleBackButtonGopay = this.handleBackButtonGopay.bind(this);
        
    }

    componentDidMount() {
        if(this.props.navigation.state.params.gopay && this.props.navigation.state.params.midtrans) {
            this.GoPay();
        }
    }
    
    componentWillUnmount(){
        if(this.props.navigation.state.params.validateTransactionStatus) this.props.navigation.state.params.validateTransactionStatus(this.state.paymentType);
        if(Platform.OS == 'ios') gopay.removeResponseListener();
    }

    navigationStateChangeHandler(event){
        if(event.loading == false && event.url.search(`transaction_status`) != -1){
            actNav.goBack();
        }
    }

    handleBackButtonGopay () {
        let params = this.props.navigation.state.params;
        console.log(this.state.paymentStatus);
        if(Platform.OS == 'ios') {
            if(params.gopay && this.state.paymentStatus == 'pending') {
                actNav.navigate(navConstant.Product);
            } else {
                actNav.goBack();
            }
        } else {
            actNav.goBack();
        }
    }

    GoPay () {
        const params = this.props.navigation.state.params;
        if(Platform.OS !== 'ios') {
            gopay.payment(params.token, params.midtrans, this.handleGoPayResponse);
        } else {
            gopay.responseListener(this.handleGoPayResponse);
            gopay.payment(params.token, params.midtrans, this.handleGoPayResponse);
        }
    }


    handleGoPayResponse = (result) => {
        this.setState({paymentType: 'gopay'})
        switch (result) {
            case 'success'  : return actNav.goBack();
            case 'failed'   : return actNav.navigate(navConstant.Product)
            case 'pending'  : return actNav.navigate(navConstant.Product)
            default         : break;
        }

    };

    render() {
        
        let params = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <NavigationBar
			    	title={'choosePayment.navigationTitle'}
                    // onPress={this.handleBackButtonGopay}
			    />
                <View style={styles.container}>
                    {
                        params.gopay
                        ?   null
                        :   <WebView
                                onNavigationStateChange={this.navigationStateChangeHandler}
                                source={{uri: params.redirect_url}}
                                style={{flex: 1}}
                            />
                    }
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.data,
    totalPrice: state.product.total.price,
    delivery_price: state.product.delivery_price,
    additional: state.product.additional.credit_card,
    cart: state.product.cart.products,
    addresses: state.user.address,
    detailTransaction: state.transaction.detail,
});

export default connect(mapStateToProps,null)(ChoosePayment);
