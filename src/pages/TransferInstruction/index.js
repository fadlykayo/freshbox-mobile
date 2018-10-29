import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { actNav } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import TotalPrice from './components/TotalPrice';
import Content from './components/Content';
import styles from './styles';
import images from '@assets';
import { connect } from 'react-redux';

class TransferInstruction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grandTotalPrice: 0,
            banks:{
                bca_virtual_account: {
                    name: "virtualAccount.content.bcaVA",
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
                bni_virtual_account: {
                    name: "virtualAccount.content.bniVA",
                    image: images.icon_logo_bni,
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
                permata_virtual_account: {
                    name: "virtualAccount.content.permataVA",
                    image: images.icon_logo_permata,
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
            }
        }
    }

    componentDidMount() {
        let state = this.state;
		state.grandTotalPrice = this.props.delivery_price + this.props.totalPrice;
        this.setState(state);
    }

    render(){
        const bank = this.state.banks[this.props.detailTransaction.payment_method] ? this.state.banks[this.props.detailTransaction.payment_method] : this.state.banks.bni_virtual_account;
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
                    <Content bank={bank}/>  
                </ScrollView>
                <TotalPrice
                    type={'red'}
					title={'virtualAccount.content.checkout'}
					subTotal={this.props.detailTransaction.sub_total}
					grandTotal={this.props.detailTransaction.grand_total}
					delivery_price={this.props.detailTransaction.shipping_cost}
                />
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    detailTransaction: state.transaction.detail
});

export default connect(mapStateToProps,null)(TransferInstruction);
