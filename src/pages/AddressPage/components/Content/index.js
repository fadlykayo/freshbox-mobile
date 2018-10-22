import React, { Component } from 'react';
import FormDataPage from '../FormDataPage';
import StaticData from '../StaticData';

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
                if (this.props.isEdit == true) {
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
                            address={this.props.address}
                            isEdit={this.props.isEdit}
                            editPress={this.props.editAddressPage}
                            deletePress={this.props.deleteAddress}
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
