import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import Container from '@components/Container';
import { actNav, navConstant } from '@navigations';
import StaticText from '@components/StaticText';
import NavigationBar from '@components/NavigationBar';
import styles from './styles';
import images from '@assets';
import { connect } from 'react-redux';
import actions from '@actions';

class ChooseAddress extends PureComponent {
    constructor(props) {
        super(props)
        this.updatePrimaryAddress = this.updatePrimaryAddress.bind(this);
        this.navigateToEditAddress = this.navigateToEditAddress.bind(this);
    }

    updatePrimaryAddress(idAddress) {
        let payload ={
            header: {
                apiToken: this.props.user.authorization
            },
            body: {
                id: idAddress
            },
            params: {}
        }
        this.props.set_primary_address(payload, null, 
            (err) => {
                console.log(err)
            })
    }

    navigateToEditAddress(data) {
        this.props.get_address_detail(data);
        actNav.navigate(navConstant.EditAddressPage)
    }

    render() {
        return (
            <Container>
                <NavigationBar
                    title={'chooseAddress.navigationTitle'}
					onPress={actNav.goBack}
                />
                <View style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        { this.props.addresses.map((address, index) => {
                            if (address.primary == 1) {
                                return (
                                    <TouchableOpacity style={styles.addressPlace} key={index} onPress={() => this.updatePrimaryAddress(address.id)}>
                                        <View style={styles.leftPart}>
                                            <Text style={[styles.addressText, styles.nameAddressText]}>({address.name}) <StaticText
                                                style={styles.priority}
                                                property={'chooseAddress.content.primary'}
                                            /></Text>
						            	    <Text style={styles.receiverText}>{address.receiver_name}</Text>
						            	    { address.detail.length == 0 ? (
                                                <Text style={styles.addressText}>{address.address}, {address.zip_code.place_name}, {address.subdistrict.name}, {address.city.name}, {address.province.name}, {address.zip_code.zip_code}</Text>
                                                
						            	    ) : (
                                                <Text style={styles.addressText}>{address.detail}, {address.address}, {address.zip_code.place_name}, {address.subdistrict.name}, {address.city.name}, {address.province.name}, {address.zip_code.zip_code}</Text>
						            	    )}
						            	    <Text style={styles.addressText}>{address.phone_number}</Text>
                                        </View>
                                        <View style={styles.rightPart}>
                                            <View style={styles.buttonSelected}>
                                                <View style={styles.innerButton}>
                                                </View>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={styles.iconPen} onPress={() => this.navigateToEditAddress(address)}>
                                            <Image
                                                style={styles.logoPen}
                                                source={images.icon_pen}
                                            />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                )
                            }
                            else {
                                return(
                                    <TouchableOpacity style={styles.addressPlace} key={index} onPress={() => this.updatePrimaryAddress(address.id)}>
                                        <View style={styles.leftPart}>
                                            <Text style={[styles.addressText, styles.nameAddressText]}>({address.name})</Text>
						            	    <Text style={styles.receiverText}>{address.receiver_name}</Text>
						            	    { address.detail.length == 0 ? (
                                                <Text style={styles.addressText}>{address.address}, {address.zip_code.place_name}, {address.subdistrict.name}, {address.city.name}, {address.province.name}, {address.zip_code.zip_code}</Text>
                                                
						            	    ) : (
                                                <Text style={styles.addressText}>{address.detail}, {address.address}, {address.zip_code.place_name}, {address.subdistrict.name}, {address.city.name}, {address.province.name}, {address.zip_code.zip_code}</Text>
						            	    )}
						            	    <Text style={styles.addressText}>{address.phone_number}</Text>
                                        </View>
                                        <View style={styles.rightPart}>
                                            <View style={styles.buttonSelected}>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={styles.iconPen} onPress={() => this.navigateToEditAddress(address)}>
                                            <Image
                                                style={styles.logoPen}
                                                source={images.icon_pen}
                                            />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                )
                            }
                        }) }
                    </ScrollView>
                    <View style={styles.bottomComponent}>
                        <TouchableOpacity style={styles.addAddress}>
                            <StaticText
                                style={styles.addAddressText}
                                property={'chooseAddress.label.addAddress'}
                            />
                        </TouchableOpacity>
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
        set_primary_address: (req, success, failure) => dispatch(actions.user.api.set_primary_address(req, success, failure)),
        get_address_detail: (data) => dispatch(actions.user.reducer.get_address_detail(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(ChooseAddress);
