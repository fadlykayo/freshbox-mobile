import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';
import images from '@assets';

class AddressData extends PureComponent {
    constructor(props) {
        super(props)
        this.updatePrimaryAddress = this.updatePrimaryAddress.bind(this);
        this.navigateToEditAddress = this.navigateToEditAddress.bind(this);
    }

    updatePrimaryAddress(addressId) {
        this.props.updatePrimaryAddress(addressId)
    }

    navigateToEditAddress(address) {
        this.props.navigateToEditAddress(address)
    }

    render() {
        return (
            <TouchableOpacity style={styles.addressPlace} key={this.props.index} onPress={() => this.updatePrimaryAddress(this.props.address.id)}>
                <View style={styles.leftPart}>
                    { this.props.address.primary == 1 ? (
                        <Text style={[styles.addressText, styles.nameAddressText]}>({this.props.address.name}) <StaticText
                        style={styles.priority}
                        property={'chooseAddress.content.primary'}
                    /></Text>
                    ) : (
                        <Text style={[styles.addressText, styles.nameAddressText]}>({this.props.address.name})</Text>
                    )}
				    <Text style={styles.receiverText}>{this.props.address.receiver_name}</Text>
				    { this.props.address.detail.length == 0 ? (
                        <Text style={styles.addressText}>{this.props.address.address}, {this.props.address.zip_code.place_name}, {this.props.address.subdistrict.name}, {this.props.address.city.name}, {this.props.address.province.name}, {this.props.address.zip_code.zip_code}</Text>
				    ) : (
                        <Text style={styles.addressText}>{this.props.address.detail}, {this.props.address.address}, {this.props.address.zip_code.place_name}, {this.props.address.subdistrict.name}, {this.props.address.city.name}, {this.props.address.province.name}, {this.props.address.zip_code.zip_code}</Text>
				    )}
				    <Text style={styles.addressText}>{this.props.address.phone_number}</Text>
                </View>
                <View style={styles.rightPart}>
                    <View style={styles.buttonSelected}>
                    { this.props.address.primary == 1 ? ( <View style={styles.innerButton}></View> ) : null }
                    </View>
                </View>
                <TouchableOpacity style={styles.iconPen} onPress={() => this.navigateToEditAddress(this.props.address)}>
                    <Image
                        style={styles.logoPen}
                        source={images.icon_pen}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }
}

export default AddressData;
