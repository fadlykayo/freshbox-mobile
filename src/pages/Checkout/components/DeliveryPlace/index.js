import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
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
        console.log(this.props)
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
		    	<TouchableOpacity 
		    		style={styles.buttonOtherAddress}
		    		onPress={this.onPress}	
		    	>
		    		<StaticText
		    			style={[styles.staticText,styles.otherAddressText]}
		    			property={'checkout.content.otherAddress'}
		    		/>
		    	</TouchableOpacity>
		    </View>
        )
    }
}

export default DeliveryPlace;
