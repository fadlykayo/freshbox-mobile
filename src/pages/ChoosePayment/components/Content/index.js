import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import StaticText from '@components/StaticText';
import images from '@assets';
import styles from './styles';

class Content extends Component {
  	constructor() {
        super()
        this.navigateToOtherPage = this.navigateToOtherPage.bind(this);  
    }

    navigateToOtherPage(){
        this.props.navigateToOtherPage(this.props.content);
    }

  	render() {
  	  	return (
            <TouchableOpacity 
                style={styles.container} 
                onPress={this.navigateToOtherPage}
            >
                <View style={styles.subcontainer.desc}>
                    <StaticText
                        style={styles.text}
                        property={this.props.content}
                    />
                </View>
                <View style={styles.subcontainer.image}>
                    <Image
                        style={styles.icon}
                        source={images.icon_arrow_right_red}
                    />
                </View>
            </TouchableOpacity>
  	  	);
  	}
}

export default Content;
