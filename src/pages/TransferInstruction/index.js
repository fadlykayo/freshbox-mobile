import React, { Component } from 'react';
import { ScrollView, Clipboard, ToastAndroid, Platform } from 'react-native';
import { actNav } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import StaticText from '@components/StaticText';
import CountDown from './components/CountDown';
import Information from './components/Information';
import TotalPrice from './components/TotalPrice';
import Content from './components/Content';
import styles from './styles';
import images from '@assets';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'react-redux';

class TransferInstruction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grandTotalPrice: 0,
            countDown: moment(moment(this.props.detailTransaction.expired_date) - moment(new Date())).format('HH:mm:ss'),
            banks:{
                bca_virtual_account: {
                    name: "virtualAccount.content.bcaVA",
                    image: images.icon_logo_bca,
                    types: [
                        {
                            name: "transferInstruction.content.bca.atm.name",
                            isOpen: false,
                            step: 
                            [
                                {
                                    name: "transferInstruction.content.bca.atm.step.1"
                                },
                                {
                                    name: "transferInstruction.content.bca.atm.step.2",
                                },
                                {
                                    name: "transferInstruction.content.bca.atm.step.3",
                                },
                                {
                                    name: "transferInstruction.content.bca.atm.step.4",
                                },
                                {
                                    name: "transferInstruction.content.bca.atm.step.5",
                                },
                                {
                                    name: "transferInstruction.content.bca.atm.step.6",
                                },
                                {
                                    name: "transferInstruction.content.bca.atm.step.7",
                                }
                            ]
                        },
                        {
                            name: "transferBank.content.bca.mBanking",
                            isOpen: false,
                            step: 
                            [
                                {
                                    name: "transferInstruction.content.bca.mBanking.step.1"
                                },
                                {
                                    name: "transferInstruction.content.bca.mBanking.step.2"
                                },
                                {
                                    name: "transferInstruction.content.bca.mBanking.step.3"
                                },
                                {
                                    name: "transferInstruction.content.bca.mBanking.step.4"
                                },
                                {
                                    name: "transferInstruction.content.bca.mBanking.step.5"
                                },
                                {
                                    name: "transferInstruction.content.bca.mBanking.step.6"
                                },
                                {
                                    name: "transferInstruction.content.bca.mBanking.step.7"
                                },
                            ]
                        },
                        {
                            name: "transferBank.content.bca.iBanking",
                            isOpen: false,
                            step: 
                            [
                                {
                                    name: "transferInstruction.content.bca.iBanking.step.1"
                                },
                                {
                                    name: "transferInstruction.content.bca.iBanking.step.2"
                                },
                                {
                                    name: "transferInstruction.content.bca.iBanking.step.3"
                                },
                                {
                                    name: "transferInstruction.content.bca.iBanking.step.4"
                                },
                                {
                                    name: "transferInstruction.content.bca.iBanking.step.5"
                                },
                                {
                                    name: "transferInstruction.content.bca.iBanking.step.6"
                                },
                            ]
                        },
                    ]
                },
                bni_virtual_account: {
                    name: "virtualAccount.content.bniVA",
                    image: images.icon_logo_bni,
                    types: [
                        {
                            name: "transferInstruction.content.bca.atm.name",
                            isOpen: false,
                            step: 
                            [
                                {
                                    name: "transferInstruction.content.bca.atm.step.1"
                                },
                                {
                                    name: "transferInstruction.content.bca.atm.step.2",
                                },
                                {
                                    name: "transferInstruction.content.bca.atm.step.3",
                                },
                                {
                                    name: "transferInstruction.content.bca.atm.step.4",
                                },
                                {
                                    name: "transferInstruction.content.bca.atm.step.5",
                                },
                                {
                                    name: "transferInstruction.content.bca.atm.step.6",
                                },
                                {
                                    name: "transferInstruction.content.bca.atm.step.7",
                                }
                            ]
                        },
                        {
                            name: "transferBank.content.bca.mBanking",
                            isOpen: false,
                            step: 
                            [
                                {
                                    name: "transferInstruction.content.bca.mBanking.step.1"
                                },
                                {
                                    name: "transferInstruction.content.bca.mBanking.step.2"
                                },
                                {
                                    name: "transferInstruction.content.bca.mBanking.step.3"
                                },
                                {
                                    name: "transferInstruction.content.bca.mBanking.step.4"
                                },
                                {
                                    name: "transferInstruction.content.bca.mBanking.step.5"
                                },
                                {
                                    name: "transferInstruction.content.bca.mBanking.step.6"
                                },
                                {
                                    name: "transferInstruction.content.bca.mBanking.step.7"
                                },
                            ]
                        },
                        {
                            name: "transferBank.content.bca.iBanking",
                            isOpen: false,
                            step: 
                            [
                                {
                                    name: "transferInstruction.content.bca.iBanking.step.1"
                                },
                                {
                                    name: "transferInstruction.content.bca.iBanking.step.2"
                                },
                                {
                                    name: "transferInstruction.content.bca.iBanking.step.3"
                                },
                                {
                                    name: "transferInstruction.content.bca.iBanking.step.4"
                                },
                                {
                                    name: "transferInstruction.content.bca.iBanking.step.5"
                                },
                                {
                                    name: "transferInstruction.content.bca.iBanking.step.6"
                                },
                            ]
                        },
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
            },
            copyData: '',
        }
        this.updateCountDown = this.updateCountDown.bind(this);
        this.getGrandTotalPrice = this.getGrandTotalPrice.bind(this);
        this.getClipboardData = this.getClipboardData.bind(this);
        this.openSpecificData = this.openSpecificData.bind(this);
    }

    // componentDidUpdate() {
    //     this.updateCountDown();
    // }

    componentDidMount() {
        this.getGrandTotalPrice();
    }

    getGrandTotalPrice() {
        let state = this.state;
		state.grandTotalPrice = this.props.delivery_price + this.props.totalPrice;
        this.setState(state);
    }

    updateCountDown() {
        let state = this.state;
        let expDate = moment(this.props.detailTransaction.expired_date);
        let nowDate = moment(new Date());

        let date = moment.duration(expDate.diff(nowDate))
        let hours = date.asHours()
        let rhours = Math.floor(hours);
        let minutes = ((hours-rhours)*60);
        let rminutes = Math.floor(minutes);
        let countTime = `${rhours} jam ${rminutes < 10 ? `0${rminutes}`: rminutes} menit`;

        if(moment(this.props.detailTransaction.expired_date) - moment(new Date()) > 0) {
            setTimeout(() => {
                state.countDown = countTime;
                this.setState(state);
            }, 1000)

        }
    }

    async getClipboardData(input) {
        await Clipboard.setString(String(input));
        if(Platform.OS == 'android') {
            ToastAndroid.show('Successfully copied data', ToastAndroid.SHORT)
        }
    }

    openSpecificData(bank, indexType) {
        let banks = this.state.banks;
        let getBank = ''
        for(x in banks) {
            if (banks[x].name == bank.name) {
                getBank = x
            }
        }

        banks[getBank].types[indexType].isOpen = !banks[getBank].types[indexType].isOpen
        this.setState({banks})
    }

    render(){
        const dateDisplay = moment(this.props.detailTransaction.expired_date).format('dddd, Do MMMM YYYY, HH:mm');
        const bank = this.state.banks[this.props.detailTransaction.payment_method] ? this.state.banks[this.props.detailTransaction.payment_method] : this.state.banks.bni_virtual_account;
        return (
            <Container
                bgColorBottom={'veryLightGrey'} 				
                bgColorTop={'red'} 			
            >
                <NavigationBar
			    	title={'transferInstruction.navigationTitle'}
			    	onPress={actNav.goBack}
			    />
                <ScrollView style={styles.container}>
                    <CountDown
                        countDown={this.state.countDown}
                        params={{ date: dateDisplay }}
                    />
                    <Information
                        bank={bank}
                        getClipboardData={this.getClipboardData}
                        detailTransaction={this.props.detailTransaction}
                    />
                    <Content 
                        bank={bank}
                        openSpecificData={this.openSpecificData}
                    />  
                </ScrollView>
                <TotalPrice
                    type={'red'}
					title={'transferInstruction.content.checkout'}
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
