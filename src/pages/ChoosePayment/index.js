import React, { Component } from 'react';
import { View, WebView, NativeModules, NativeEventEmitter, Platform } from 'react-native';
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

    componentDidMount() {
        this.androidGoPay();
    }
    
    

    componentWillUnmount(){
        if(this.props.navigation.state.params.validateTransactionStatus) this.props.navigation.state.params.validateTransactionStatus();
        // this.GoPaySubscription.remove();
        // if(Platform.OS) {
        //     GoPayEventEmitter.removeListener();
        // }
    }

    navigationStateChangeHandler(event){
        if(event.loading == false && event.url.search(`transaction_status`) != -1){
            actNav.goBack();
        }
    }

    androidGoPay () {

        // console.warn('masuk sini')
        let params = this.props.navigation.state.params;

        const optionConnect = {
            clientKey:"SB-Mid-server-VMgZBx6-OicLLIOpUyv02NHg",
            urlMerchant:"http://ec2-18-236-134-251.us-west-2.compute.amazonaws.com",
        };

        const transRequest = params.midtrans.transaction_details;
        
        var itemDetails = params.midtrans.item_details;

        var creditCardOptions = {
            saveCard:false,
            saveToken:false,
            paymentMode:"Normal",
            secure:false
        };

        // const userDetail = params.midtrans.customer_details;
        let userDetail = {
            fullName: params.midtrans.customer_details.first_name + params.midtrans.customer_details.last_name,
            email: params.midtrans.customer_details.email,
            phoneNumber:params.midtrans.customer_details.phone,
            userId:"U01", 
            address:"kudus", 
            city:"kudus", 
            country:"IDN", 
            zipCode:"59382"
        }

        var optionColorTheme = {
            primary:'#c51f1f',
            primaryDark:'#1a4794',
            secondary:'#1fce38'
        };

        var font = {
            defaultText:"open_sans_regular.ttf", 
            semiBoldText:"open_sans_semibold.ttf",
            boldText:"open_sans_bold.ttf"
        };

        // var callback = (res)=>{console.warn(res)};

        Gopay.pay(params.token, (res) => console.warn(res));

        // console.log(optionConnect, transRequest, itemDetails, userDetail);

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
