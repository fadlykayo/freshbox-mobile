import React, { Component } from 'react';
import { View, Text } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';
import moment from 'moment';

class DetailOrder extends Component {
  	constructor() {
        super()
        this.getStatusText = this.getStatusText.bind(this);
    }
    
    getStatusText(payload) {
		switch(payload) {
			case 'pending_payment': return 'historyPage.static.pending_payment'
			case 'paid': return 'historyPage.static.paid'
			case 'on_process': return 'historyPage.static.on_process'
			case 'on_shipping': return 'historyPage.static.on_shipping'
			case 'failed': return 'historyPage.static.failed'
		}
	}

  	render() {
        let address = this.props.addresses.filter(address => address.primary == 1)[0];
        if (this.props.action == 'history') {
            let transactionStatus = this.getStatusText(this.props.transaction.status);
            const dateDisplay = moment(this.props.transaction.request_shipping_date).format('dddd, Do MMMM YYYY');
            return (
                <View style={styles.container}>
                    <StaticText
                        style={styles.staticText}
                        property={'historyDetail.detail.status'}
                    />
                    <StaticText
                        style={styles.detailText}
                        property={transactionStatus}
                    />
                    <StaticText
                        style={styles.staticText}
                        property={'historyDetail.detail.transactionNumber'}
                    />
                    <Text style={styles.detailText}>{this.props.transaction.invoice}</Text>
                    <StaticText
                        style={styles.staticText}
                        property={'historyDetail.detail.deliveryDate'}
                    />
                    <Text style={styles.detailText}>{dateDisplay}</Text>
                    <StaticText
                        style={styles.staticText}
                        property={'historyDetail.detail.address'}
                    />
                    <View>
                        <Text style={styles.userText}>{this.props.transaction.receiver_name}</Text>
                        {/* <Text style={styles.userText}>{this.props.transaction.phone_number}</Text> */}
                        <Text style={styles.userText}>
                            {this.props.transaction.address} <StaticText property={'historyDetail.content.kelurahan'}/>{this.props.transaction.zip_code.place_name}<StaticText property={'historyDetail.content.kecamatan'}/>{this.props.transaction.subdistrict.name}, {this.props.transaction.city.name}, {this.props.transaction.province.name}, {this.props.transaction.zip_code.zip_code}                                            
                            {this.props.transaction.address_detail.length == 0 
                                ? null 
                                : <Text><StaticText property={'addressPage.label.comma'}/>{this.props.transaction.address_detail}</Text>
                            }
                        </Text>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <StaticText
                        style={styles.staticText}
                        property={'historyDetail.detail.deliveryDate'}
                    />
                    <Text style={styles.detailText}>{this.props.setDate.display}</Text>
                    <StaticText
                        style={styles.staticText}
                        property={'historyDetail.detail.address'}
                    />
                    <View>
                        <Text style={styles.userText}>{address.receiver_name}</Text>
                        <Text style={styles.userText}>{address.phone_number}</Text>
                        <Text style={styles.userText}>
                            {address.address}<StaticText property={'historyDetail.content.kelurahan'}/>{address.zip_code.place_name}<StaticText property={'historyDetail.content.kecamatan'}/>{address.subdistrict.name}, {address.city.name}, {address.province.name}, {address.zip_code.zip_code}
                            { address.detail.length == 0 
                                ? null 
                                : <Text><StaticText property={'addressPage.label.comma'}/>{address.detail}</Text>
                            }
                        </Text>
                    </View>
                </View>
            )
        }
  	}
}

export default DetailOrder;
