import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import moment from 'moment';

import image from '@assets';
import StaticText from '@components/StaticText';
import styles from './styles';
class DetailOrder extends Component {
  constructor() {
    super();
    this.getStatusText = this.getStatusText.bind(this);
  }

  getStatusText(payload) {
    switch (payload) {
      case 'finish':
        return 'historyPage.static.success';
      case 'pending_payment':
        return 'historyPage.static.pending_payment';
      case 'paid':
        return 'historyPage.static.paid';
      case 'on_process':
        return 'historyPage.static.on_process';
      case 'on_shipping':
        return 'historyPage.static.on_shipping';
      case 'failed':
        return 'historyPage.static.failed';
      case 'expired':
        return 'historyPage.static.expired';
      case 'cancel':
        return 'historyPage.static.cancel';
    }
  }

  render() {
    let address = this.props.addresses.filter(
      (address) => address.primary == 1,
    )[0];
    if (this.props.action == 'history') {
      let transactionStatus = this.getStatusText(this.props.status);
      const dateDisplay = moment(
        this.props.transaction.request_shipping_date,
      ).format('dddd, Do MMMM YYYY');
      const dateDisplayOld = this.props.transaction.request_shipping_date_old && moment(this.props.transaction.request_shipping_date_old).format('dddd, Do MMMM YYYY') || moment(this.props.transaction.request_shipping_date).format('dddd, Do MMMM YYYY');
      const timePaid = moment(this.props.transaction.paid_date).format('HH:mm')
      const status = this.props.transaction.status
     
      return (
        <View style={styles.container}>
          <StaticText
            style={styles.text.static}
            property={'historyDetail.detail.status'}
          />
          <StaticText style={styles.text.detail} property={transactionStatus} />
          <StaticText
            style={styles.text.static}
            property={'historyDetail.detail.transactionNumber'}
          />
          <Text style={styles.text.detail}>
            {this.props.transaction.invoice}
          </Text>
          <StaticText
            style={styles.text.static}
            property={'historyDetail.detail.deliveryDate'}
          />
          <Text style={styles.text.detail}>{dateDisplay}</Text>
          {
            dateDisplay !== dateDisplayOld &&
            status === 'paid' &&
            <View style={styles.info.container}>
                <Image
                    style={styles.info.icon}
                    source={image.ic_info_grey}
                />
                <View>
                  <Text style={styles.info.textTitle}>
                      Pembayaran Berhasil
                  </Text>
                  <Text style={styles.info.text}>
                      Namun Pembayaran Anda, jam {timePaid}, melewati batas waktu untuk tanggal pengiriman {dateDisplayOld}
                  </Text>
                </View>
            </View>
          }

          <StaticText
            style={styles.text.static}
            property={'historyDetail.detail.address'}
          />
          <View>
            <Text style={styles.text.user}>
              {this.props.transaction.receiver_name}
            </Text>
            <Text style={styles.text.user}>
              {this.props.transaction.phone_number}
            </Text>
            <Text style={styles.text.user}>
              {this.props.transaction.address}{' '}
              <StaticText property={'historyDetail.content.kelurahan'} />
              {this.props.transaction.zip_code.place_name}
              <StaticText property={'historyDetail.content.kecamatan'} />
              {this.props.transaction.subdistrict.name},{' '}
              {this.props.transaction.city.name},{' '}
              {this.props.transaction.province.name},{' '}
              {this.props.transaction.zip_code.zip_code}
              {this.props.transaction.address_detail.length == 0 ? null : (
                <Text>
                  <StaticText property={'addressPage.label.comma'} />
                  {this.props.transaction.address_detail}
                </Text>
              )}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <StaticText
            style={styles.text.static}
            property={'historyDetail.detail.deliveryDate'}
          />
          <Text style={styles.text.detail}>{this.props.setDate.display}</Text>
          <StaticText
            style={styles.text.static}
            property={'historyDetail.detail.address'}
          />
          <View>
            <Text style={styles.text.user}>{address.receiver_name}</Text>
            <Text style={styles.text.user}>{address.phone_number}</Text>
            <Text style={styles.text.user}>
              {address.address}
              <StaticText property={'historyDetail.content.kelurahan'} />
              {address.zip_code.place_name}
              <StaticText property={'historyDetail.content.kecamatan'} />
              {address.subdistrict.name}, {address.city.name},{' '}
              {address.province.name}, {address.zip_code.zip_code}
              {address.detail.length == 0 ? null : (
                <Text>
                  <StaticText property={'addressPage.label.comma'} />
                  {address.detail}
                </Text>
              )}
            </Text>
          </View>
        </View>
      );
    }
  }
}

export default DetailOrder;
