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

    updatePrimaryAddress(codeAddress) {
        this.props.updatePrimaryAddress(codeAddress)
    }

    navigateToEditAddress(address) {
        this.props.navigateToEditAddress(address)
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.updatePrimaryAddress(this.props.address.code)}>
                <View style={styles.subcontainer.left}>
                    { this.props.address.primary == 1 ? (
                        <Text style={[styles.text.address, styles.text.nameAddress]}>({this.props.address.name}) <StaticText
                        style={styles.text.priority}
                        property={'chooseAddress.content.primary'}
                    /></Text>
                    ) : (
                        <Text style={[styles.text.address, styles.text.nameAddress]}>({this.props.address.name})</Text>
                    )}
				    <Text style={styles.text.receiver}>{this.props.address.receiver_name}</Text>
				    { this.props.address.detail.length == 0 ? (
                        <Text style={styles.text.address}>{this.props.address.address}, {this.props.address.zip_code.place_name}, {this.props.address.subdistrict.name}, {this.props.address.city.name}, {this.props.address.province.name}, {this.props.address.zip_code.zip_code}</Text>
				    ) : (
                        <Text style={styles.text.address}>{this.props.address.detail}, {this.props.address.address}, {this.props.address.zip_code.place_name}, {this.props.address.subdistrict.name}, {this.props.address.city.name}, {this.props.address.province.name}, {this.props.address.zip_code.zip_code}</Text>
				    )}
				    <Text style={styles.text.address}>{this.props.address.phone_number}</Text>
                </View>
                <View style={styles.subcontainer.right}>
                    <View style={styles.circle.outer}>
                    { this.props.address.primary == 1 ? ( <View style={styles.circle.inner}></View> ) : null }
                    </View>
                </View>
                <TouchableOpacity style={styles.place.pen} onPress={() => this.navigateToEditAddress(this.props.address)}>
                    <Image
                        style={styles.logo.pen}
                        source={images.icon_pen}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }
}

export default AddressData;
