import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import { actNav, navConstant } from '@navigations';
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

    navigationStateChangeHandler(e){
        console.log(e);
    }

    render() {
        let params = this.props.navigation.state.params;
        return (
            <Container
                bgColorTop={'red'}
                bgColorBottom={'veryLightGrey'}
            >
                <NavigationBar
			    	title={'choosePayment.navigationTitle'}
			    />
                <View style={styles.container}>
                    {
                        params.redirect_url.length == 0 
                        ?   null
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
});

export default connect(mapStateToProps,null)(ChoosePayment);
