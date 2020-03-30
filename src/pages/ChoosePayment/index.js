import React, { Component, useEffect } from 'react';
import { View, Text, WebView, Platform, Image, BackHandler, ActivityIndicator } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import Button from '@components/Button';
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
            warningModal: false,
            refreshStatus: false,
        }
        this.navigationStateChangeHandler = this.navigationStateChangeHandler.bind(this);
        
    }

    

    componentDidMount() {

        if(Platform.OS !== 'ios') {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonAndroid);
        }
        
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
            gopay.removeResponseListener();
            
        } else {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonAndroid);
        }
        // this.checkPaymentGopay();

        
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

    handleBackButtonAndroid = () => {
        return true
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
                    // return false
                },
                (err) => {
                    this.showModalWarning();
                    // return true
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

    handleOnPressCheck = () => {
        this.setState({refreshStatus: true}, () => {
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
                    this.setState({refreshStatus: false}, () => actNav.goBack())
                    // return false
                },
                (err) => {
                    this.setState({refreshStatus: false}, () => console.log())
                    // return true
                }
            )
        })
    }

    

    goBack = () => {
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

                    
                    {
                        this.state.refreshStatus ? 
                        <View style={styles.gopay.pendingContainer}>
                            <ActivityIndicator/>
                        </View>
                        :
                        <View style={styles.gopay.buttonContainer}>
                            <View style={styles.gopay.textStatusContainer}>
                                <Text style={styles.gopay.text}>Status: Pending</Text>
                            </View>
                            <Button
                                type={'white'}
                                onPress={this.handleOnPressCheck}
                                title={'choosePayment.button'}
                            />
                        </View>

                    }
                    
                    <View style={styles.gopay.textContainer}>
                        <Text style={styles.gopay.text}>You will be redirected to GOJEK app. When you're done, please press the check button to check your transaction status</Text>
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
					requestHandler={this.goBack}
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
