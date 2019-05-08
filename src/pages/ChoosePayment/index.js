import React, { Component } from 'react';
import { View, WebView, NativeModules } from 'react-native';
import { actNav } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import styles from './styles';
import { connect } from 'react-redux';

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
    }

    navigationStateChangeHandler(event){
        if(event.loading == false && event.url.search(`transaction_status`) != -1){
            actNav.goBack();
        }
    }

    componentDidMount() {
        let params = this.props.navigation.state.params;
        const Gopay = NativeModules.GoPay
        console.log(this.props.totalPrice)
        console.log(this.props.navigation.state.params.invoice)
        console.log(this.props.user)
        console.log(this.props.addresses, 'address')

        let cartItem = [];

        this.props.cart.map((cart, index) => {
            let items = {
                'item_id'        : cart.code,
                'item_name'      : cart.name,
                'item_price'     : Number(cart.price),
                'item_quantity'  : Number(cart.count),
            }
            cartItem.push(items);
            items = {}
        });

        // console.log(userInfo)
        
        Gopay.payWithGoPay(cartItem, this.props.user.user, this.props.addresses, (res)=> {
            console.warn(res)
        })
    }
    

    render() {
        
        let params = this.props.navigation.state.params;
        console.warn(params, 'token')
        return (
            <View style={styles.container}>
                <NavigationBar
			    	title={'choosePayment.navigationTitle'}
			    />
                {/* <View style={styles.container}>
                    {
                        params.redirect_url.length == 0 
                        ?   null
                        :   <WebView
                                onNavigationStateChange={this.navigationStateChangeHandler}
                                source={{uri: params.redirect_url}}
                                style={{flex: 1}}
                            />
                    }
                </View> */}
                {/* <Button
                    // onPress     =   {}
                    title       =   {'GoPay'}
                /> */}
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
