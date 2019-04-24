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
		const address = this.props.addresses.filter(e => e.primary == 1)[0];
        return (
            <View style={styles.container}>
				<View style={styles.subcontainer.top}>
					{ this.props.addresses.length == 0 || address == undefined
						? (<View style={styles.subcontainer.static}></View>)
						: 	(<View style={styles.subcontainer.top}>
								<StaticText
									style={styles.text.static}
									property={'checkout.label.deliveryAddress'}
								/>
								<Text style={styles.text.address}>{address.receiver_name} <Text style={styles.text.nameAddress}>({address.name})</Text></Text>
								{ address.detail.length == 0 ? (
									<Text style={styles.text.address}>{address.address}, {address.zip_code.place_name}, {address.subdistrict.name}, {address.city.name}, {address.province.name}, {address.zip_code.zip_code}</Text>
								) : (
									<Text style={styles.text.address}>{address.address}, {address.zip_code.place_name}, {address.subdistrict.name}, {address.city.name}, {address.province.name}, {address.zip_code.zip_code}, {address.detail}</Text>
								)}
								<Text style={styles.text.address}>{address.phone_number}</Text>
							</View>
						)
					}
				</View>
				<View style={styles.subcontainer.bottom}>
					<Button
						type={this.props.type}
						onPress={this.onPress}
						title={this.props.addresses.length == 0 ? this.props.addAddress : this.props.address}
					/>
				</View>
		    </View>
		)
		// return null;
    }
}

export default DeliveryPlace;
