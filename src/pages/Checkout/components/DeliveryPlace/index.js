import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import Button from '@components/Button';
import styles from './styles';

class DeliveryPlace extends PureComponent {
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
				{ this.props.addresses.length == 0 
					? (<View style={styles.staticPlace}></View>)
					:(
						<View>
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
            				                    <Text style={styles.addressText}>{address.address}, {address.zip_code.place_name}, {address.subdistrict.name}, {address.city.name}, {address.province.name}, {address.zip_code.zip_code}, {address.detail}</Text>
		    					            )}
		    					            <Text style={styles.addressText}>{address.phone_number}</Text>
		    							</View>
		    						)
		    					}
							}) }
						</View>
					)}
				<Button
					type={this.props.type}
					onPress={this.onPress}
					title={this.props.addresses.length == 0 ? this.props.addAddress : this.props.address}
				/>
		    </View>
        )
    }
}

export default DeliveryPlace;
