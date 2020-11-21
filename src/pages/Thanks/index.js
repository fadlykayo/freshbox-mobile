import React, { Component } from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, BackHandler } from 'react-native'
import { connect } from 'react-redux';
import Container from '@components/Container';
import NavigationBar from "./component/navigationBar"
import { actNav, navConstant } from '@navigations';
import styles from "./styles"
import images from '@assets';
import moment from 'moment';
import id from 'moment/locale/id';

moment.locale('id', id);


class Thanks extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isNavigateBack: false,
        }
        this.navigateBack = this.navigateBack.bind(this);
        this.navigateToOrderHistory = this.navigateToOrderHistory.bind(this);
        // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillUnmount() {
        if (this.state.isNavigateBack == true) {
            if (this.props.navigation.state.params.refreshHandler) {
                this.props.navigation.state.params.refreshHandler();
            }
        }
    }

    // handleBackButtonClick() {
    //     this.setState({
    //         isNavigateBack: true
    //     }, () => {
    //         this.props.navigation.state.params.refreshHandler();
    //     })
    // }

    navigateBack(key) {
        console.log(key)
        this.setState({
            isNavigateBack: true
        }, () => {
            if (key) actNav.goBack(key)
            else actNav.goBack();
        });
    }

    navigateToOrderHistory() {
        actNav.navigate(navConstant.Detail, {
            action: 'history',
            createOrderSuccess: true,
            invoice: this.props.navigation.state.params.invoice,
            refreshHandler: this.props.navigation.state.params.refreshHandler,
            fromDashboard: true,
            fromThanksPage: true
        });
    }

    render() {
        const { transactionDetail } = this.props
        const { invoice, checkout_date } = transactionDetail
        const date = moment(checkout_date).format('dddd, Do MMMM YYYY')
        const time = moment(checkout_date).format('LTS')
        return (
            <Container
                bgColorBottom={'veryLightGrey'}
                bgColorTop={'red'}
            >
                <NavigationBar
                    press={this.navigateBack}
                />
                <View style={styles.container}>
                    <View style={styles.circleContainer}>
                        <View style={styles.circleBlue}>
                            <View style={styles.circleBlueDark} />
                        </View>
                        <Image source={images.ic_checklist_combine} style={styles.imageInCircle}
                            resizeMode="stretch"
                        />
                    </View>
                    <View style={styles.text.center}>
                        <Text style={styles.text.thanks}> THANK YOU! </Text>
                        <Text>We are processing your order.</Text>
                    </View>
                    <View style={styles.cardContainer}>
                        <View style={styles.orderWrapper}>
                            <View>
                                <Text style={[styles.text.order, {
                                    marginBottom: 5
                                }]}>Order ID</Text>
                                <Text style={styles.text.thanks}>{invoice}</Text>
                            </View>
                            <TouchableOpacity style={styles.buttonOrder} onPress={this.navigateToOrderHistory}>
                                <Text style={styles.button.order}>Order History</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.lineWrapper}>
                            <View style={styles.line} />
                        </View>
                        <View style={[styles.dateWrapper]}>
                            <Text style={[styles.alignText, styles.text.order]}>Delivery Date & Time</Text>
                            <View>
                                <View style={[styles.iconWrapper, styles.alignText]}>
                                    <Image source={images.icon_calendar} style={styles.icon} />
                                    <Text style={styles.text.date}>{date}</Text>
                                </View>
                                <View style={styles.iconWrapper}>
                                    <Image source={images.ic_time} style={styles.icon} />
                                    <Text style={styles.text.date}>{time} WIB</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buttonToHome} onPress={() => {
                        this.navigateBack()
                    }}>
                        <Text style={styles.button.home}>Kembali Ke Beranda</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user.data,
    transactionDetail: state.transaction.detail,
});
const mapDispatchToProps = (dispatch) => ({
    cancel_invoice: (req, res, err) => dispatch(actions.transaction.api.cancel_invoice(req, res, err)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Thanks)