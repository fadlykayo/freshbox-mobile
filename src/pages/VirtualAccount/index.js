import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import StaticText from '@components/StaticText';
import TotalPrice from './components/TotalPrice';
import styles from './styles';
import images from '@assets';
import { connect } from 'react-redux';

class VirtualAccount extends Component {
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
    }

    openData(index) {
        let banks = this.state.banks.slice();
        banks[index].isOpen = !banks[index].isOpen;

        this.setState({ banks })
    }

    render() {
        return (
            <Container>
                <NavigationBar
			    	title={'virtualAccount.navigationTitle'}
			    	onPress={actNav.goBack}
			    />
                <ScrollView style={styles.container}>
                    <View style={styles.content}>
                        { this.state.banks.map((bank, index) => {
                            if( bank.isOpen == true) {
                                return (
                                    <View key={index}>
                                        <TouchableOpacity style={styles.component} onPress={() => this.openData(index)}>
                                            <View>
                                                <Image
                                                    source={bank.image}
                                                    style={styles.bankLogo}
                                                />
                                            </View>
                                            <View>
                                                <StaticText
                                                    style={styles.staticText}
                                                    property={bank.name}
                                                />
                                            </View>
                                            <View style={styles.imagePlace}>
                                                <Image
                                                    source={images.icon_arrow_up_red}
                                                    style={styles.logo}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.contentPlace}>
                                        { bank.step.map((content, index) => {
                                            return (
                                                <View key={ index } style={styles.contentData}>
                                                    <View style={styles.leftPart}>
                                                        <View style={styles.circlePart}>
                                                            <Text style={styles.indexContent}>{index+1}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.rightPart}>
                                                        <Text style={styles.contentText}>{content.name}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }) }       
                                        </View>
                                    </View>
                                )
                            }
                            else {
                                return (
                                    <TouchableOpacity key={index} style={styles.component} onPress={() => this.openData(index)}>
                                        <View>
                                            <Image
                                                source={bank.image}
                                                style={styles.bankLogo}
                                            />
                                        </View>
                                        <View>
                                            <StaticText
                                                style={styles.staticText}
                                                property={bank.name}
                                            />
                                        </View>
                                        <View style={styles.imagePlace}>
                                            <Image
                                                source={images.icon_arrow_right_red}
                                                style={styles.logo}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
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
	null)(VirtualAccount);
