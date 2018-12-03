import React, { Component } from 'react';
import { View } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import TotalPrice from './components/TotalPrice';
import Content from './components/Content';
import styles from './styles';
import { connect } from 'react-redux';

class ChoosePayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                deliveryPrice: 0
            },
            grandTotalPrice: 0,
            contents: [
                'choosePayment.content.creditCard',
                'choosePayment.content.virtualAccount',
            ]
        }
        this.navigateToOtherPage = this.navigateToOtherPage.bind(this);
        this.countTotalPrice = this.countTotalPrice.bind(this);
    }

    componentDidMount() {
        this.countTotalPrice();
    }

    countTotalPrice() {
        let state = this.state;
		state.grandTotalPrice = this.props.delivery_price + this.props.totalPrice;
        this.setState(state);
    }

    navigateToOtherPage(payload) {
        switch(payload) {
            case 'choosePayment.content.virtualAccount': 
                return actNav.navigate(navConstant.VirtualAccount,this.props.navigation.state.params);
            default: 
                return actNav.navigate(navConstant.CreditCard,this.props.navigation.state.params);
        }
    } 

    render() {
        return (
            <Container
                bgColorBottom={'veryLightGrey'}
                bgColorTop={'red'}
            >
                <NavigationBar
			    	title={'choosePayment.navigationTitle'}
			    />
                <View style={styles.container}>
                    <View style={styles.content}>
                        { 
                            this.state.contents.map((content,index) => (
                                <Content 
                                    key={index}
                                    content={content}
                                    navigateToOtherPage={this.navigateToOtherPage}
                                />
                            )) 
                        }                        
                    </View>
                    <TotalPrice
                        action={'choosePayment'}
                        subTotal={this.props.totalPrice}
                        additional={this.props.additional}
                        grandTotal={this.state.grandTotalPrice}
                        delivery_price={this.props.delivery_price}
                    />
                </View>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    additional: state.product.additional.credit_card,
    user: state.user.data,
    totalPrice: state.product.total.price,
    delivery_price: state.product.delivery_price
});

export default connect(mapStateToProps,null)(ChoosePayment);
