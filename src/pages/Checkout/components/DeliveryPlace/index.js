import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import Button from '@components/Button';
import styles from './styles';

class DeliveryPlace extends Component {
    constructor(props) {
        super(props)
        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        this.props.onPress()
    }

    render() {
        return (
            <View style={styles.container}>
		    	{ this.props.addresses.map((address, index) => {
		    		if (address.primary == 1) {
		    			return (
		    				<View key={index}>
		    					<StaticText
		    						style={styles.staticText}
		    						property={'checkout.label.deliveryAddress'}
		    					/>
		    		            <Text style={styles.addressText}>{address.receiver_name} <Text style={styles.nameAddressText}>({address.name})</Text></Text>
		    		            { address.detail.length == 0 ? (
            	                    <Text style={styles.addressText}>{address.address}, {address.zip_code.place_name}, {address.subdistrict.name}, {address.city.name}, {address.province.name}, {address.zip_code.zip_code}</Text>
		    		            ) : (
            	                    <Text style={styles.addressText}>{address.detail}, {address.address}, {address.zip_code.place_name}, {address.subdistrict.name}, {address.city.name}, {address.province.name}, {address.zip_code.zip_code}</Text>
		    		            )}
		    		            <Text style={styles.addressText}>{address.phone_number}</Text>
		    				</View>
		    			)
		    		}
				}) }
				<Button
					type={this.props.type}
					onPress={this.onPress}
					title={this.props.title}
				/>
		    </View>
        )
    }
}

export default DeliveryPlace;
