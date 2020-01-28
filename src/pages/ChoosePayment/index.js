import React, { Component } from 'react';
import { View, Text, WebView, Platform, Image } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import AlertDialog from '@components/AlertDialog';
import styles from './styles';
import { connect } from 'react-redux';
import { gopay } from '@helpers';
import actions from '@actions';
import images from '@assets';


class ChoosePayment extends Component {
    constructor() {
        super();
        this.state = {
            redirect_url: '',
            token: '',
            invoice: '',
            paymentType: '',
            warningModal: false
        }
        this.navigationStateChangeHandler = this.navigationStateChangeHandler.bind(this);
        
    }

    componentDidMount() {
        if(this.props.navigation.state.params.gopay && this.props.navigation.state.params.midtrans) {
            this.GoPay();
            // this.checkPaymentGopay();
        }
        this.setState({
            paymentType: this.props.navigation.state.params.method
        })
    }
    
    componentWillUnmount(){
        if(this.props.navigation.state.params.validateTransactionStatus) this.props.navigation.state.params.validateTransactionStatus(this.state.paymentType, this.props.navigation.state.params.midtrans);
        if(Platform.OS == 'ios'){
            // this.checkPaymentGopay(); 
            gopay.removeResponseListener();
        } 

    }

    navigationStateChangeHandler(event){
        if(event.loading == false && event.url.search(`transaction_status`) != -1){
            if(this.props.navigation.state.params.gopay && this.props.navigation.state.params.midtrans) {
                this.checkPaymentGopay();
            } else {
                actNav.goBack();
            }
        }
    }

    checkPaymentGopay = () => {
        if(this.props.navigation.state.params.gopay && this.props.navigation.state.params.midtrans) {
            let payload = {
                header: {
                    apiToken: this.props.user.authorization,
                },
                type: 'validation',
                invoice: this.props.navigation.state.params.midtrans.transaction_details.order_id
            }
            this.props.detail_transaction(
                payload,
                (res) => {
                    actNav.goBack();
                },
                (err) => {
                    this.showModalWarning();
                }
            )

        } else {
            actNav.goBack();
        }
    }

    GoPay () {
        const params = this.props.navigation.state.params;
        if(Platform.OS !== 'ios') {
            // gopay.payment(params.token, params.midtrans, this.handleGoPayResponse);
        } else {
            gopay.responseListener(this.handleGoPayResponse);
            gopay.payment(params.token, params.midtrans, this.handleGoPayResponse);
        }
    }

    setModalVisible = (value) => {
        let modalWarning = this.state.modalWarning;
        modalWarning = value;
        this.setState({modalWarning});
    }

    showModalWarning = () => {
        this.setModalVisible(true);
    }


    hideModalWarning = () => {
        this.setModalVisible(false);
    }

    validateGopayStatus = () => {
        if(this.props.navigation.state.params.gopay && this.props.navigation.state.params.midtrans) {
            this.props.navigation.state.params.validateTransactionStatus(this.state.paymentType, this.props.navigation.state.params.midtrans)
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

    

    backHandler = () => {
        actNav.goBack();
    }

    renderGoPay () {
        let params = this.props.navigation.state.params;
        
        if(Platform.OS == 'ios') {
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
        } else {
            return (
                <WebView
                    onNavigationStateChange={this.navigationStateChangeHandler}
                    source={{uri: params.redirect_url}}
                    style={{flex: 1}}
                />
            )
        }

    }

    render() {
        
        let params = this.props.navigation.state.params;
        return (
            <Container style={styles.container}>
                <NavigationBar
			    	title={'choosePayment.navigationTitle'}
                    onPress={this.checkPaymentGopay}
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
                <AlertDialog
					modalVisible={this.state.modalWarning} 
					content={'dialog.cancelInvoice'}
					requestHandler={this.backHandler}
					requestCancel={this.hideModalWarning}
				/>
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

const mapDispatchToProps = (dispatch) => ({
    detail_transaction: (req,res,err) => dispatch(actions.transaction.api.detail_transaction(req,res,err)),
})

export default connect(mapStateToProps,mapDispatchToProps)(ChoosePayment);
