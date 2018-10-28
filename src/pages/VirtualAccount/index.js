import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { actNav, navConstant } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import TotalPrice from '@components/TotalPrice';
import Content from './components/Content';
import styles from './styles';
import images from '@assets';
import { connect } from 'react-redux';
import actions from '@actions';

class VirtualAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grandTotalPrice: 0,
            banks: 
            [
                {
                    name: "virtualAccount.content.bcaVA",
                    payment: "bca_virtual_account",
                    image: images.icon_logo_bca,
                },
                {
                    name: "virtualAccount.content.bniVA",
                    payment: "bni_virtual_account",
                    image: images.icon_logo_bni,
                },
                {
                    name: "virtualAccount.content.permataVA",
                    payment: "permata_virtual_account",
                    image: images.icon_logo_permata,
                },
            ],
            selectedBank: '',
        }
        this.selectBank = this.selectBank.bind(this);
        this.createOrderByVirtualAccount = this.createOrderByVirtualAccount.bind(this);
    }

    componentDidMount() {
        let grandTotalPrice = JSON.parse(JSON.stringify(this.state.grandTotalPrice));
		grandTotalPrice = this.props.delivery_price + this.props.totalPrice;
        this.setState({grandTotalPrice});
    }

    selectBank(payload) {
        let selectedBank = JSON.parse(JSON.stringify(this.state.selectedBank));
        selectedBank = payload;
        this.setState({selectedBank})
    }

    createOrderByVirtualAccount() {
        let transactionData = this.props.navigation.state.params.transaction;
        
        transactionData.payment_method = this.state.selectedBank;
        
        let payload = {
            header: {
                apiToken: this.props.user.authorization
            },
            body: transactionData,
            params: {}
        }

        this.props.create_order(payload,
            (res) => {
                this.props.clear_products();
                this.props.navigation.state.params.createOrderHandler(res.invoice);
            },
            (err) => {
                console.log(err)
            }
        )
    }

    render() {
        return (
            <Container 				
                bgColorBottom={'veryLightGrey'} 				
                bgColorTop={'red'} 			
            >
                <NavigationBar
			    	title={'virtualAccount.navigationTitle'}
			    />
                <ScrollView style={styles.container}>
                    { 
                        this.state.banks.map((bank,index) => (
                            <Content
                                key={index}
                                bank={bank}
                                selectBank={this.selectBank}
                                selectedBank={this.state.selectedBank}
                            />
                        )) 
                    }
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

const mapDispatchToProps = (dispatch) => ({
    create_order: (req,res,err) => dispatch(actions.transaction.api.create_order(req,res,err)),
    clear_products: () => dispatch(actions.product.reducer.clear_products()),
});

export default connect(mapStateToProps,mapDispatchToProps)(VirtualAccount);
