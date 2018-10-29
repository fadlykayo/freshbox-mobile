import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import TotalPrice from '@components/TotalPrice';
import Content from './components/Content';
import styles from './styles';
import images from '@assets';
import { connect } from 'react-redux';
import actions from '@actions';

class TransferInstruction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grandTotalPrice: 0,
            banks: 
            [
                {
                    name: "virtualAccount.content.bcaVA",
                    payment: "bca_virtual_account",
                    isOpen: false,
                    image: images.icon_logo_bca,
                    step: [
                        {
                            name: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        },
                        {
                            name: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        },
                        {
                            name: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        },
                        {
                            name: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        }
                    ]
                },
                {
                    name: "virtualAccount.content.mandiriVA",
                    payment: "mandiri_virtual_account",
                    isOpen: false,
                    image: images.icon_logo_mandiri,
                    step: [
                        {
                            name: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        },
                        {
                            name: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        },
                        {
                            name: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        },
                        {
                            name: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        }
                    ]
                },
                {
                    name: "virtualAccount.content.briVA",
                    payment: "bri_virtual_account",
                    isOpen: false,
                    image: images.icon_logo_bri,
                    step: [
                        {
                            name: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        },
                        {
                            name: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        },
                        {
                            name: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        },
                        {
                            name: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        }
                    ]
                },
            ]
        }
        this.openData = this.openData.bind(this);
        this.createOrderByVirtualAccount = this.createOrderByVirtualAccount.bind(this);
    }

    componentDidMount() {
        let state = this.state;
		state.grandTotalPrice = this.props.delivery_price + this.props.totalPrice;
        this.setState(state);
    }

    openData(index) {
        let banks = this.state.banks.slice();
        banks[index].isOpen = !banks[index].isOpen;
        this.setState({banks});
    }

    render() {
        return (
            <Container 				
                bgColorBottom={'veryLightGrey'} 				
                bgColorTop={'red'} 			
            >
                <NavigationBar
			    	title={'virtualAccount.navigationTitle'}
			    	onPress={actNav.goBack}
			    />
                <ScrollView style={styles.container}>
                    <View style={styles.content}>
                        { this.state.banks.map((bank, index) => {
                            return(
                                <View key={index}>
                                    <Content
                                        index={index}
                                        bank={bank}
                                        openData={this.openData}
                                    />
                                </View>
                            )
                        }) }                        
                    </View>
                </ScrollView>
                <TotalPrice
                    type={'red'}
					title={'virtualAccount.content.checkout'}
                    subTotal={this.props.totalPrice}
                    grandTotal={this.state.grandTotalPrice}
					delivery_price={this.props.delivery_price}
					onPress={this.createOrderByVirtualAccount}
                />
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.data,
    totalPrice: state.product.total.price,
    delivery_price: state.product.delivery_price
});

export default connect(mapStateToProps,null)(TransferInstruction);
