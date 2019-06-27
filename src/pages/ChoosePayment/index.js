import React, { Component } from 'react';
import { View, Text, WebView, Platform, Image } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import styles from './styles';
import { connect } from 'react-redux';
import { gopay } from '@helpers';
import images from '@assets';


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
        
    }

    componentDidMount() {
        if(this.props.navigation.state.params.gopay && this.props.navigation.state.params.midtrans) {
            this.GoPay();
        }
    }
    
    componentWillUnmount(){
        if(this.props.navigation.state.params.validateTransactionStatus) this.props.navigation.state.params.validateTransactionStatus(this.state.paymentType, this.props.navigation.state.params.midtrans);
        if(Platform.OS == 'ios') gopay.removeResponseListener();
    }

    navigationStateChangeHandler(event){
        if(event.loading == false && event.url.search(`transaction_status`) != -1){
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

    renderGoPay () {
        return (
            <View style={styles.gopay.container}>

                <View style={styles.gopay.imageContainer}>
                    <Image source={images.gopay} style={styles.gopay.image} resizeMode={'contain'}/>
                </View>

                <View style={styles.gopay.textContainer}>
                    <Text style={styles.gopay.text}>You will be redirected to GOJEK app. When you're done, please press the back button.</Text>
                </View>

            </View>
        )
    }

    render() {
        
        let params = this.props.navigation.state.params;
        return (
            <Container style={styles.container}>
                <NavigationBar
			    	title={'choosePayment.navigationTitle'}
			    />
                <View style={styles.content(params.gopay)}>
                    {
                        params.gopay
                        ?   this.renderGoPay()
                        :   <WebView
                                onNavigationStateChange={this.navigationStateChangeHandler}
                                source={{uri: params.redirect_url}}
                                style={{flex: 1}}
                            />
                    }
                </View>
            </Container>
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
