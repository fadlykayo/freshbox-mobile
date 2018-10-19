import React, { Component } from 'react';
import { View, Text } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class DetailOrder extends Component {
  	constructor() {
  		super()
	}

  	render() {
        let address = this.props.addresses.filter(address => address.primary == 1)[0]

        if (this.props.action == 'history') {
            return (
                <View style={styles.container}>
                    <StaticText
                        style={styles.staticText}
                        property={'historyDetail.detail.status'}
                    />
                    <Text style={styles.detailText}>{this.props.historyData.status}</Text>
                    <StaticText
                        style={styles.staticText}
                        property={'historyDetail.detail.nomorResi'}
                    />
                    <Text style={styles.detailText}>{this.props.historyData.nomor}</Text>
                    <StaticText
                        style={styles.staticText}
                        property={'historyDetail.detail.tanggal'}
                    />
                    <Text style={styles.detailText}>{this.props.historyData.date}</Text>
                    <StaticText
                        style={styles.staticText}
                        property={'historyDetail.detail.alamat'}
                    />
                    <View>
                        <Text style={styles.userText}>{this.props.historyData.user.name}</Text>
                        <Text style={styles.userText}>{this.props.historyData.user.phone}</Text>
                        <Text style={styles.userText}>{this.props.historyData.user.address}</Text>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <StaticText
                        style={styles.staticText}
                        property={'historyDetail.detail.tanggal'}
                    />
                    <Text style={styles.detailText}>{this.props.setDate.display}</Text>
                    <StaticText
                        style={styles.staticText}
                        property={'historyDetail.detail.alamat'}
                    />
                    <View>
                        <Text style={styles.userText}>{address.receiver_name}</Text>
                        <Text style={styles.userText}>{address.phone_number}</Text>
                        <Text style={styles.userText}>
                            {address.address}<StaticText property={'addressPage.label.comma'}/>
                            {address.city.name}<StaticText property={'addressPage.label.comma'}/>
                            {address.province.name}<StaticText property={'addressPage.label.kecamatan'}/>
                            {address.subdistrict.name}<StaticText property={'addressPage.label.kelurahan'}/>
                            {address.zip_code.place_name}
                            { address.detail.length == 0 
                                ? null 
                                : <View><StaticText property={'addressPage.label.comma'}/>{address.detail}</View>
                            }
                        </Text>
                    </View>
                </View>
            )
        }
  	  	// return (
        //     <View style={styles.container}>
        //         { this.props.action == 'history' ? (
        //             <View>
        //                 <StaticText
        //                     style={styles.staticText}
        //                     property={'historyDetail.detail.status'}
        //                 />
        //                 <Text style={styles.detailText}>{this.props.historyData.status}</Text>
        //                 <StaticText
        //                     style={styles.staticText}
        //                     property={'historyDetail.detail.nomorResi'}
        //                 />
        //                 <Text style={styles.detailText}>{this.props.historyData.nomor}</Text>
        //             </View>
        //         ) : null }
        //         <StaticText
        //             style={styles.staticText}
        //             property={'historyDetail.detail.tanggal'}
        //         />
        //         { this.props.action == 'history' ? (
        //             <Text style={styles.detailText}>{this.props.historyData.date}</Text>
        //         ) : (<Text style={styles.detailText}>{this.props.setDate.display}</Text>) }
        //         <StaticText
        //             style={styles.staticText}
        //             property={'historyDetail.detail.alamat'}
        //         />
        //         { this.props.action == 'history' ? (
        //             <View>
        //                 <Text style={styles.userText}>{this.props.historyData.user.name}</Text>
        //                 <Text style={styles.userText}>{this.props.historyData.user.phone}</Text>
        //                 <Text style={styles.userText}>{this.props.historyData.user.address}</Text>
        //             </View>
        //         ) : (
        //             <View>
        //                 <Text style={styles.userText}>{address.receiver_name}</Text>
        //                 <Text style={styles.userText}>{address.phone_number}</Text>
        //                 <Text style={styles.userText}>
        //                     {address.address}<StaticText property={'addressPage.label.comma'}/>
        //                     {address.city.name}<StaticText property={'addressPage.label.comma'}/>
        //                     {address.province.name}<StaticText property={'addressPage.label.kecamatan'}/>
        //                     {address.subdistrict.name}<StaticText property={'addressPage.label.kelurahan'}/>
        //                     {address.zip_code.place_name}
        //                     { address.detail.length == 0 
        //                         ? null 
        //                         : <View><StaticText property={'addressPage.label.comma'}/>{address.detail}</View>
        //                     }
        //                 </Text>
        //             </View>
        //         )}
        //     </View>
  	  	// );
  	}
}

export default DetailOrder;
