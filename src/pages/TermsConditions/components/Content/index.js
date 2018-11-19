import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import StaticText from '@components/StaticText';
import InnerContent from './components/InnerContent';
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
			<View style={styles.info.place}>
				<TouchableOpacity style={styles.info.title} onPress={() => this.openInfo(this.props.index)}>
					<StaticText 
						property={this.props.content.title}
						style={styles.text.title} 
					/>
					<View style={styles.info.arrow.place}>
            		    <Image
            		        source={this.props.content.isOpen ? images.icon_arrow_up_red : images.icon_arrow_right_red}
            		        style={styles.info.arrow.logo}
            		    />
            		</View>
				</TouchableOpacity>
				{ this.props.content.isOpen 
					? (this.props.content.data.map((datum, index) => {
						return (
							<InnerContent
								key={index}
								datum={datum}
								index={index}
								content={this.props.content}
							/>
						)
					})
				): null}
			</View>
  	  	);
  	}
}

export default Content;
