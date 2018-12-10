import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { language } from '@helpers';
import StaticText from '@components/StaticText';
import InnerContent from './components/InnerContent';
import images from '@assets';
import styles from './styles';

class Content extends Component {
  	constructor() {
		super();
		this.state = {
			outputText: ''
		}
		this.openInfo = this.openInfo.bind(this);
		this.getClipboardData = this.getClipboardData.bind(this);
	}

	openInfo(index) {
        this.props.openInfo(index);
	}

	getClipboardData(property = 'no_props',lang = 'id',params = {}) {
		language.transformText(property,lang,params)
        .then((res) => {
            this.setState({outputText: res}, () => {
				this.props.getClipboardData(this.state.outputText)
			});
        });
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
						? 	(<View>
								{ this.props.content.preInfo == undefined
									? 	null
									:	(<View style={styles.subinfo.preInfo}>
											<Text style={styles.text.content}>
												<StaticText property={this.props.content.preInfo[0]} />
												<StaticText property={this.props.content.preInfo[1]} style={styles.text.link} onPress={() => this.getClipboardData(this.props.content.preInfo[1])}/>
												<StaticText property={this.props.content.preInfo[2]} />
											</Text>
										</View>) 	
									
								}
								{this.props.content.data.map((datum, index) => {
									return(
										<InnerContent
											key={index}
											datum={datum}
											index={index}
											length={this.props.content.data.length}
											content={this.props.content}
										/>
									)})}
							</View>
							)
					: null}
			</View>
  	  	);
  	}
}

export default Content;
