import React, { Component } from 'react';
import FormDataPage from './components/FormDataPage';
import StaticData from './components/StaticData';

class Content extends Component {
  	constructor(props) {
  		super(props)
	}

  	render() {
        switch(this.props.action) {
            case 'addAddress' :
                return (
                    <FormDataPage
                        province={this.props.province}
                        city={this.props.city}
                        subdistrict={this.props.subdistrict}
                        zip_code={this.props.zip_code}
                        address={this.props.address}
                        validateStatus={this.props.validateStatus}
                        onChangeText={this.props.onChangeText}
                        onSpecificChangeText={this.props.onSpecificChangeText}
                        onPress={this.props.addressValidation}
						submitNameAddress={this.props.submitNameAddress}
						submitReceiverName={this.props.submitReceiverName}
						submitPhone={this.props.submitPhone}
						submitZipCode={this.props.submitZipCode}
						submitAddress={this.props.submitAddress}
						submitAddressDetails={this.props.submitAddressDetails}
                    />
                )
            case 'editAddress':
                if (this.props.isEdit) {
                    return (
                        <FormDataPage
                            province={this.props.province}
						    city={this.props.city}
						    subdistrict={this.props.subdistrict}
						    zip_code={this.props.zip_code}
                            address={this.props.address}
                            validateStatus={this.props.validateStatus}
                            onChangeText={this.props.onChangeText}
                            onSpecificChangeText={this.props.onSpecificChangeText}
                            onPress={this.props.addressValidation}
                            submitNameAddress={this.props.submitNameAddress}
						    submitReceiverName={this.props.submitReceiverName}
						    submitPhone={this.props.submitPhone}
						    submitZipCode={this.props.submitZipCode}
						    submitAddress={this.props.submitAddress}
						    submitAddressDetails={this.props.submitAddressDetails}
                        />
                    )
                }
                else {
                    return (
                        <StaticData
                            type={this.props.type}
                            address={this.props.address}
                            isEdit={this.props.isEdit}
                            editPress={this.props.editAddressPage}
                            deletePress={this.props.deleteAddress}
                            setModalVisible={this.props.setModalVisible}
                            edit={'addressPage.button.edit'}
                            delete={'addressPage.button.delete'}
                        />
                    )
                }
            default: return null;
        }
  	}
}

export default Content;
