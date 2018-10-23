import React, { PureComponent } from 'react';
import { View } from 'react-native';
import InputText from '../InputText';
import Button from '@components/Button';
import styles from './styles';

class StaticData extends PureComponent {
    constructor() {
		super()
		this.editPress = this.editPress.bind(this);
		this.deletePress = this.deletePress.bind(this);
    }

	editPress() {
		this.props.editPress()
	}

	deletePress() {
		this.props.deletePress()
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
					input={this.props.address.province.name}
				/>
				<InputText
					label={'addressPage.label.city'}
					input={this.props.address.city.name}
				/>
				<InputText
					label={'addressPage.label.kecamatan'}
					input={this.props.address.subdistrict.name}
				/>
				<InputText
					label={'addressPage.label.kelurahan'}
					input={this.props.address.zip_code.place_name}
				/>
				<InputText
					label={'addressPage.label.zipCode'}
					input={this.props.address.zip_code.zip_code}
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
					onPress={this.editPress}
					title={this.props.edit}
				/>
				<Button
					type={'red'}
					onPress={this.deletePress}
					title={this.props.delete}
				/>		
			</View>
        );
    }
}

export default StaticData;
