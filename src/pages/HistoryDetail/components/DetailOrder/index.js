import React, { Component } from 'react';
import { View, Text } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class HistoryDetail extends Component {
  	constructor(props) {
  		super(props)
	}

  	render() {
  	  	return (
            <View style={styles.topComponent}>
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
                <Text style={styles.userText}>{this.props.historyData.user.name}</Text>
                <Text style={styles.userText}>{this.props.historyData.user.phone}</Text>
                <Text style={styles.userText}>{this.props.historyData.user.address}</Text>
            </View>
  	  	);
  	}
}

export default HistoryDetail;
