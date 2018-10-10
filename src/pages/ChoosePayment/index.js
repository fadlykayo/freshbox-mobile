import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import StaticText from '@components/StaticText';
import TotalPrice from './components/TotalPrice';
import styles from './styles';
import images from '@assets';
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
                'choosePayment.content.transferBank',
                'choosePayment.content.virtualAccount',
            ]
        }
        this.navigateToOtherPage = this.navigateToOtherPage.bind(this);
    }

    navigateToOtherPage(payload) {
        switch(payload) {
            case 'choosePayment.content.transferBank': return actNav.navigate(navConstant.TransferBank)
            case 'choosePayment.content.virtualAccount': return actNav.navigate(navConstant.VirtualAccount)
            default: return actNav.navigate(navConstant.CreditCard)
        }
    } 

    render() {
        return (
            <Container>
                <NavigationBar
			    	title={'choosePayment.navigationTitle'}
			    	onPress={actNav.goBack}
			    />
                <View style={styles.container}>
                    <View style={styles.content}>
                        { this.state.contents.map((content, index) => {
                            return (
                                <TouchableOpacity key={index} style={styles.component} onPress={() => this.navigateToOtherPage(content)}>
                                    <StaticText
                                        style={styles.staticText}
                                        property={content}
                                    />
                                    <View style={styles.imagePlace}>
                                        <Image
                                            source={images.icon_arrow_right_red}
                                            style={styles.logo}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )
                        }) }                        
                    </View>
                </View>
                <TotalPrice
                    subTotal={this.props.totalPrice}
                    grandTotal={this.state.grandTotalPrice}
                    data={this.state.user}
                />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
	return {
		totalPrice: state.product.total.price,
	}
}

export default connect(
	mapStateToProps,
	null)(ChoosePayment);
