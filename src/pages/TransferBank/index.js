import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import StaticText from '@components/StaticText';
import TotalPrice from './components/TotalPrice';
import MainContent from './components/MainContent';
import styles from './styles';
import images from '@assets';
import { connect } from 'react-redux';

class TransferBank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                deliveryPrice: 0
            },
            grandTotalPrice: 0,
            banks: 
            [
                {
                    name: "transferBank.content.bca.name",
                    payment: "bca_virtual_account",
                    isOpen: false,
                    image: images.icon_logo_bca,
                    types: [
                        {
                            name: "transferBank.content.bca.atm",
                            isOpen: false,
                            step: 
                            [
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
                            name: "transferBank.content.bca.mBanking",
                            isOpen: false,
                            step: 
                            [
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
                            name: "transferBank.content.bca.iBanking",
                            isOpen: false,
                            step: 
                            [
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
                },
                {
                    name: "transferBank.content.mandiri.name",
                    payment: "mandiri_virtual_account",
                    isOpen: false,
                    image: images.icon_logo_mandiri,
                    types: [
                        {
                            name: "transferBank.content.mandiri.atm",
                            isOpen: false,
                            step: 
                            [
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
                            name: "transferBank.content.mandiri.mBanking",
                            isOpen: false,
                            step: 
                            [
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
                            name: "transferBank.content.mandiri.iBanking",
                            isOpen: false,
                            step: 
                            [
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
                },
                {
                    name: "transferBank.content.bri.name",
                    payment: "bri_virtual_account",
                    isOpen: false,
                    image: images.icon_logo_bri,
                    types: [
                        {
                            name: "transferBank.content.bri.atm",
                            isOpen: false,
                            step: 
                            [
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
                            name: "transferBank.content.mandiri.mBanking",
                            isOpen: false,
                            step: 
                            [
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
                            name: "transferBank.content.bri.iBanking",
                            isOpen: false,
                            step: 
                            [
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
                },
            ]
        }
        this.openData = this.openData.bind(this);
        this.openSpecificData = this.openSpecificData.bind(this);
    }

    openData(index) {
        let banks = this.state.banks.slice();
        banks[index].isOpen = !banks[index].isOpen;

        this.setState({ banks })
    }

    openSpecificData(indexBank, indexType) {
        // console.log("index bank: ", indexBank, "index type: ",indexType)
        let banks = this.state.banks.slice();
        banks[indexBank].types[indexType].isOpen = !banks[indexBank].types[indexType].isOpen;
        // console.log(banks)
        this.setState({ banks })
    }

    render() {
        return (
            <Container>
                <NavigationBar
			    	title={'transferBank.navigationTitle'}
			    	onPress={actNav.goBack}
			    />
                <ScrollView style={styles.container}>
                    <View style={styles.content}>
                        { this.state.banks.map((bank, indexBank) => {
                            return (
                                <View key={indexBank}>
                                    <MainContent
                                        bank={bank}
                                        indexBank={indexBank}
                                        openData={this.openData}
                                        openSpecificData={this.openSpecificData}
                                    />
                                </View>
                            )
                        }) }                        
                    </View>
                </ScrollView>
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
	null)(TransferBank);