import React, { Component } from 'react';
import { View, WebView, NativeModules, NativeEventEmitter } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import styles from './styles';
import { connect } from 'react-redux';

const Gopay = NativeModules.GoPay;
const GoPayEventEmitter = new NativeEventEmitter(Gopay);




class ChoosePayment extends Component {
    constructor() {
        super();
        this.state = {
            redirect_url: '',
            token: '',
            invoice: '',
        }
        this.navigationStateChangeHandler = this.navigationStateChangeHandler.bind(this);
        
    }

    componentWillUnmount(){
        if(this.props.navigation.state.params.validateTransactionStatus) this.props.navigation.state.params.validateTransactionStatus();
        // this.GoPaySubscription.remove();
        GoPayEventEmitter.removeListener();
    }

    navigationStateChangeHandler(event){
        if(event.loading == false && event.url.search(`transaction_status`) != -1){
            actNav.goBack();
        }
    }

    componentDidMount() {
        let params = this.props.navigation.state.params;
        this.GoPaySubscription();
        Gopay.payWithGoPay(params.midtrans.item_details, params.midtrans.customer_details, params.midtrans.transaction_details, params.token,  (res)=> {
            console.warn(res, 'ini res gopay')
        });
    }

    GoPaySubscription = () => {
        // handle gopay response here

        // console.log(GoPayEventEmitter, 'emiter')

        GoPayEventEmitter.addListener(
            'onPaymentResult',
            (result) => this.handleGoPayResponse(result)
        );

    };

    handleGoPayResponse = (result) => {
        switch (result) {
            case 'success'  : return actNav.reset(navConstant.Product, {createOrderSuccess: 'gopay'});
            case 'failed'   : return actNav.reset(navConstant.Product);
            case 'pending'  : break;
            default         : break;
        }
        // actNav.reset(navConstant.Product)

    };
    
    

    render() {
        
        let params = this.props.navigation.state.params;
        // console.warn(params, 'token')
        return (
            <View style={styles.container}>
                <NavigationBar
			    	title={'choosePayment.navigationTitle'}
			    />
                <View style={styles.container}>
                    {/* {
                        params.redirect_url.length == 0 
                        ?   null
                        :   <WebView
                                onNavigationStateChange={this.navigationStateChangeHandler}
                                source={{uri: params.redirect_url}}
                                style={{flex: 1}}
                            />
                    } */}
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
