import React, { Component } from 'react';
import { ScrollView, Clipboard, ToastAndroid, Platform } from 'react-native';
import { actNav } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import CountDown from './components/CountDown';
import Information from './components/Information';
import TotalPrice from '@components/TotalPrice';
import Content from './components/Content';
import styles from './styles';
import images from '@assets';
import moment from 'moment';
import { language } from '@helpers';
import { connect } from 'react-redux';
import actions from '@actions';

class TransferInstruction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grandTotalPrice: 0,
            countDown: moment(moment(this.props.detailTransaction.expired_date) - moment(new Date())).format('HH:mm:ss'),
            banks:{
                bca: {
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
                            name: "transferInstruction.content.bca.mBanking.name",
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
                            name: "transferInstruction.content.bca.iBanking.name",
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
                bni: {
                    name: "virtualAccount.content.bniVA",
                    image: images.icon_logo_bni,
                    types: [
                        {
                            name: "transferInstruction.content.bni.atm.name",
                            isOpen: false,
                            step: 
                            [
                                {
                                    name: "transferInstruction.content.bni.atm.step.1"
                                },
                                {
                                    name: "transferInstruction.content.bni.atm.step.2",
                                },
                                {
                                    name: "transferInstruction.content.bni.atm.step.3",
                                },
                                {
                                    name: "transferInstruction.content.bni.atm.step.4",
                                },
                                {
                                    name: "transferInstruction.content.bni.atm.step.5",
                                },
                                {
                                    name: "transferInstruction.content.bni.atm.step.6",
                                },
                                {
                                    name: "transferInstruction.content.bni.atm.step.7",
                                },
                                {
                                    name: "transferInstruction.content.bni.atm.step.8",
                                },
                                {
                                    name: "transferInstruction.content.bni.atm.step.9",
                                },
                                {
                                    name: "transferInstruction.content.bni.atm.step.10",
                                },
                                {
                                    name: "transferInstruction.content.bni.atm.step.11",
                                }
                            ]
                        },
                        {
                            name: "transferInstruction.content.bni.mBanking.name",
                            isOpen: false,
                            step: 
                            [
                                {
                                    name: "transferInstruction.content.bni.mBanking.step.1"
                                },
                                {
                                    name: "transferInstruction.content.bni.mBanking.step.2"
                                },
                                {
                                    name: "transferInstruction.content.bni.mBanking.step.3"
                                },
                                {
                                    name: "transferInstruction.content.bni.mBanking.step.4"
                                },
                                {
                                    name: "transferInstruction.content.bni.mBanking.step.5"
                                },
                                {
                                    name: "transferInstruction.content.bni.mBanking.step.6"
                                },
                                {
                                    name: "transferInstruction.content.bni.mBanking.step.7"
                                },
                            ]
                        },
                    ]
                },
                permata: {
                    name: "virtualAccount.content.permataVA",
                    image: images.icon_logo_permata,
                    types: [
                        {
                            name: "transferInstruction.content.permata.atm.name",
                            isOpen: false,
                            step: 
                            [
                                {
                                    name: "transferInstruction.content.permata.atm.step.1"
                                },
                                {
                                    name: "transferInstruction.content.permata.atm.step.2",
                                },
                                {
                                    name: "transferInstruction.content.permata.atm.step.3",
                                },
                                {
                                    name: "transferInstruction.content.permata.atm.step.4",
                                },
                                {
                                    name: "transferInstruction.content.permata.atm.step.5",
                                },
                                {
                                    name: "transferInstruction.content.permata.atm.step.6",
                                },
                                {
                                    name: "transferInstruction.content.permata.atm.step.7",
                                },
                            ]
                        },
                    ]
                },   
            },
            copyData: '',
        }
        this.updateCountDown = this.updateCountDown.bind(this);
        this.getGrandTotalPrice = this.getGrandTotalPrice.bind(this);
        this.getClipboardData = this.getClipboardData.bind(this);
        this.openSpecificData = this.openSpecificData.bind(this);
        this.navigateBack = this.navigateBack.bind(this);
    }

    componentDidMount() {
        this.getGrandTotalPrice();
    }

    componentWillUnmount() {
        if(this.props.navigation.state.params.refreshHandler) {
            this.props.navigation.state.params.refreshHandler();
        }
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
            language.transformText('formSuccess.title.copyData')
            .then(message => {
                ToastAndroid.show(message, ToastAndroid.SHORT)
            })
        } else {
            language.transformText('formSuccess.title.copyData')
			.then(message => {

				this.props.set_success_status({
					status: true,
					data: message,
					title: 'formSuccess.title.default'
				});
			});
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

    navigateBack() {
        actNav.goBack()
    }

    render(){
        const dateDisplay = moment(this.props.detailTransaction.expired_date).format('dddd, Do MMMM YYYY, HH:mm');
        const bank = this.state.banks[this.props.detailTransaction.va_bank] ? this.state.banks[this.props.detailTransaction.va_bank] : this.state.banks.bni;
        return (
            <Container
                bgColorBottom={'veryLightGrey'} 				
                bgColorTop={'red'} 			
            >
                <NavigationBar
			    	title={'transferInstruction.navigationTitle'}
			    	onPress={this.navigateBack}
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
                    onPress={this.navigateBack}
					subTotal={this.props.detailTransaction.sub_total}
					grandTotal={this.props.detailTransaction.grand_total}
                    discount={(this.props.detailTransaction.discount_ammount !== null && this.props.detailTransaction.discount_ammount > 0) ? this.props.detailTransaction.discount_ammount : this.props.discount}
					delivery_price={this.props.detailTransaction.shipping_cost}
                    discount={this.props.detailTransaction.discount_ammount}
                />
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    detailTransaction: state.transaction.detail,
    discount: state.product.discount,
});

const mapDispatchToProps = (dispatch) => ({
    set_success_status: (payload) => dispatch(actions.network.reducer.set_success_status(payload)),
})

export default connect(mapStateToProps,mapDispatchToProps)(TransferInstruction);
