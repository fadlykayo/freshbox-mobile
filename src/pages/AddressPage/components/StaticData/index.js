import React, { PureComponent } from 'react';
import { View } from 'react-native';
import InputText from '../InputText';
import Button from '@components/Button';
import styles from './styles';

class StaticData extends PureComponent {
    constructor() {
		super()
		this.onPress = this.onPress.bind(this);
    }

	onPress() {
		this.props.onPress()
	}

    render() {
        return (
            <View style={styles.container}>
				<InputText
					label={'addressPage.label.nameAddress'}
					input={this.props.address.name}
				/>
				<InputText
					label={'addressPage.label.name'}
					input={this.props.address.receiver_name}
				/>
				<InputText
					label={'addressPage.label.phone'}
					input={this.props.address.phone}
				/>
				<InputText
					label={'addressPage.label.province'}
					input={this.props.address.province}
				/>
				<InputText
					label={'addressPage.label.city'}
					input={this.props.address.city}
				/>
				<InputText
					label={'addressPage.label.zipCode'}
					input={this.props.address.zipCode}
				/>
				<InputText
					label={'addressPage.label.kecamatan'}
					input={this.props.address.kecamatan}
				/>
				<InputText
					label={'addressPage.label.kelurahan'}
					input={this.props.address.kelurahan}
				/>
				<InputText
					label={'addressPage.label.address'}
					input={this.props.address.address}
				/>
				<InputText
					label={'addressPage.label.addressDetails'}
					input={this.props.address.addressDetail}
				/>
				<Button
					type={'white'}
					onPress={this.onPress}
					title={this.props.title}
				/>	
			</View>
        );
    }
}

export default StaticData;
