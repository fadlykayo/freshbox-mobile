import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { actNav } from '@navigations';
import Container from '@components/Container';
import NavigationBar from '@components/NavigationBar';
import StaticText from '@components/StaticText';
import images from '@assets';
import styles from './styles';

class Content extends Component {
  	constructor() {
        super()
        this.openInfo = this.openInfo.bind(this);
	}

	openInfo(index) {
        this.props.openInfo(index);
    }

  	render() {
  	  	return (
			<View key={index} style={styles.info.content}>
				{ content.title == 'termsConditions.content.info.others.title' || content.title == 'termsConditions.content.info.update.title' 
				? (
					<View style={styles.subinfo.place}>
						<StaticText
							property={datum}
							style={styles.text.content} 
						/>
					</View>
				)
				: (
					<View style={styles.subinfo.place}>
            			<View style={styles.subinfo.circle}>
            			    <Text style={styles.subinfo.index}>{index+1}</Text>
            			</View>
						<View style={styles.subinfo.right}>
							<StaticText 
								property={datum}
								style={styles.text.content} 
							/>
						</View>
					</View>
				)
				}
			</View>
  	  	);
  	}
}

export default Content;
