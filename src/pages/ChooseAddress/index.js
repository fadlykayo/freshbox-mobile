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
import { hasObjectValue } from '@helpers';
import ChangesAreaPopUp from './components/ChangesAreaPopUp'

class ChooseAddress extends Component {
    constructor(props) {
        super(props)
        this.updatePrimaryAddress = this.updatePrimaryAddress.bind(this);
        this.navigateBack = this.navigateBack.bind(this);
        this.navigateToEditAddress = this.navigateToEditAddress.bind(this);
        this.navigateToAddAddress = this.navigateToAddAddress.bind(this);
        this.getAddress = this.getAddress.bind(this);
        this.state = {
            changesArea: false,
            codeAddress: '',
            selectedArea: {}
        }
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
        if(this.props.navigation.state.params.action === 'checkout') {
            const currentIndex = this.props.addresses.findIndex(list => list.code === codeAddress )
            const subdistrictID = this.props.addresses[currentIndex].subdistrict.id
            const branchID = this.props.selectedBranch.id
            let payload = {
                header: {
                    apiToken: this.props.user ? this.props.user.authorization : '',
                },
                params: {
                    branch_id: branchID,
                    subdistrict_id: subdistrictID
                }
		    }

            let payload2 ={
                header: {
                    apiToken: this.props.user.authorization
                },
                code: codeAddress
            }

            this.props.check_branch( payload,
            (res) => {
                if (res) {
                    if(hasObjectValue(res.data, 'branch_id')) {
                        const currentIndex = this.props.listBranch.findIndex(list => list.id === res.data.branch_id)
                        const selectedArea = this.props.listBranch[currentIndex]
                        this.props.change_branch(selectedArea)
                        this.props.set_primary_address(payload2, 
                            (success) => {
                                this.navigateBack()
                            }, 
                            (err) => {}
                        )
                    } else {
                        this.props.set_primary_address(payload2, 
                            (success) => {
                            }, 
                            (err) => {}
                        )
                    }
                }
            },
            (err) => {
                const currentIndex = this.props.listBranch.findIndex(list => list.id === err.branch_id)
                const selectedArea = this.props.listBranch[currentIndex]
                this.setState({
                    selectedArea: selectedArea,
                    codeAddress: codeAddress
                })
                this.openPopUpChangesArea()
            }
            )
        } else {
            // const { codeAddress } = this.state
            if(codeAddress !== '') {
                let payload2 ={
                    header: {
                        apiToken: this.props.user.authorization
                    },
                    code: codeAddress
                }
                this.props.set_primary_address(payload2, 
                    (success) => {
                        this.setState({
                            codeAddress: ''
                        })
                    }, 
                    (err) => {}
                )
            }
        }

    }

    openPopUpChangesArea() {
        this.setState({
            changesArea: true
        })
    }

    navigateToEditAddress(data) {
        this.props.get_address_detail(data);
        actNav.navigate(navConstant.AddressPage, {action: 'editAddress', key: this.props.navigation.state.key, checkout: true})
    }

    navigateToAddAddress() {
        actNav.navigate(navConstant.AddressPage, {action: 'addAddress', key: this.props.navigation.state.key, checkout: true})
    }

    navigateBack() {
        actNav.goBack();
    }

    onConfirmSelectedArea = () => {
        const { codeAddress } = this.state
        let payload ={
            header: {
                apiToken: this.props.user.authorization
            },
            code: codeAddress
        }
        this.props.set_primary_address(payload, 
            (success) => {
                this.props.change_branch(this.state.selectedArea)
                this.setState({
                    changesArea: false,
                    codeAddress: '',
                    selectedArea: {}
                }, () => {
                    actNav.reset(navConstant.Dashboard)
                })
            }, 
            (err) => {}
        )
    }

    onPressCancelChangesArea = () => {
        this.setState({
            changesArea: false,
            codeAddress: ''
        })
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
                <ChangesAreaPopUp
                    modalVisible={this.state.changesArea}
                    onCancelSelectedArea={this.onPressCancelChangesArea}
                    onConfirmSelectedArea={this.onConfirmSelectedArea}
                />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        addresses: state.user.address,
        user: state.user.data,
        selectedBranch: state.utility.selectedBranch,
        listBranch: state.utility.listBranch,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_primary_address: (req,res,err) => dispatch(actions.user.api.set_primary_address(req,res,err)),
        get_address_detail: (data) => dispatch(actions.user.reducer.get_address_detail(data)),
        get_address: (req, success, failure) => dispatch(actions.user.api.get_address(req, success, failure)),
        check_branch: (req,res,err) => dispatch(actions.utility.api.check_branch(req,res,err)),
        change_branch: (payload) => dispatch(actions.utility.reducer.change_branch(payload)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(ChooseAddress);
