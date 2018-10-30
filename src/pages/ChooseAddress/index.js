import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import Container from '@components/Container';
import { actNav, navConstant } from '@navigations';
import StaticText from '@components/StaticText';
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
			(success) => {},
			(err) => {
				console.log(err)
			})
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
            (err) => {
                console.log(err)
            })
    }

    navigateToEditAddress(data) {
        this.props.get_address_detail(data);
        actNav.navigate(navConstant.AddressPage, {action: 'editAddress', key: this.props.navigation.state.key})
    }

    navigateToAddAddress() {
        actNav.navigate(navConstant.AddressPage, {action: 'addAddress', key: this.props.navigation.state.key})
    }

    render() {
        return (
            <Container 				
                bgColorBottom={'veryLightGrey'} 				
                bgColorTop={'red'} 			
            >
                <NavigationBar
                    title={'chooseAddress.navigationTitle'}
					onPress={actNav.goBack}
                />
                <View style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        { this.props.addresses.map((address, index) => {
                            return (
                                <View key={index}>
                                    <AddressData
                                        address={address}
                                        index={index}
                                        updatePrimaryAddress={this.updatePrimaryAddress}
                                        navigateToEditAddress={this.navigateToEditAddress}
                                    />
                                </View>
                            )
                        }) }
                    </ScrollView>
                    <View style={styles.bottomComponent}>
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
