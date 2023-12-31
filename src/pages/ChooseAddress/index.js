import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import Container from '@components/Container';
import { actNav, navConstant } from '@navigations';
import Button from '@components/Button';
import NavigationBar from '@components/NavigationBar';
import AddressData from './components/AddressData';
import styles from './styles';
import { connect } from 'react-redux';
import actions from '@actions';

class ChooseAddress extends Component {
    constructor(props) {
        super(props)
        this.updatePrimaryAddress = this.updatePrimaryAddress.bind(this);
        this.navigateBack = this.navigateBack.bind(this);
        this.navigateToEditAddress = this.navigateToEditAddress.bind(this);
        this.navigateToAddAddress = this.navigateToAddAddress.bind(this);
        this.getAddress = this.getAddress.bind(this);
    }

    componentDidMount() {
		this.getAddress()
    }

    getAddress() {
		let payload = {
			header: {
				apiToken: this.props.user.authorization
			},
			body: {},
			params: {}
		}
		this.props.get_address(payload, 
			(res) => {},
			(err) => {})
	}

    updatePrimaryAddress(codeAddress) {
        let payload ={
            header: {
                apiToken: this.props.user.authorization
            },
            code: codeAddress
        }
        this.props.set_primary_address(payload, 
            (success) => {
                actNav.goBack()
            }, 
            (err) => {})
    }

    navigateToEditAddress(data) {
        this.props.get_address_detail(data);
        actNav.navigate(navConstant.AddressPage, {action: 'editAddress', key: this.props.navigation.state.key})
    }

    navigateToAddAddress() {
        actNav.navigate(navConstant.AddressPage, {action: 'addAddress', key: this.props.navigation.state.key})
    }

    navigateBack() {
        actNav.goBack();
    }

    render() {
        return (
            <Container 				
                bgColorBottom={'veryLightGrey'} 				
                bgColorTop={'red'} 			
            >
                <NavigationBar
                    title={'chooseAddress.navigationTitle'}
					onPress={this.navigateBack}
                />
                <View style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        { this.props.addresses.map((address, index) => {
                            return (
                                <AddressData
                                    key={index}
                                    address={address}
                                    index={index}
                                    length={this.props.addresses.length-1}
                                    updatePrimaryAddress={this.updatePrimaryAddress}
                                    navigateToEditAddress={this.navigateToEditAddress}
                                />
                            )
                        }) }
                    </ScrollView>
                    <View style={styles.subcontainer.bottom}>
                        <Button
                            type={'white'}
                            onPress={this.navigateToAddAddress}
                            title={'chooseAddress.label.addAddress'}
                        />
                    </View>
                </View>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        addresses: state.user.address,
        user: state.user.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_primary_address: (req,res,err) => dispatch(actions.user.api.set_primary_address(req,res,err)),
        get_address_detail: (data) => dispatch(actions.user.reducer.get_address_detail(data)),
        get_address: (req, success, failure) => dispatch(actions.user.api.get_address(req, success, failure))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(ChooseAddress);
