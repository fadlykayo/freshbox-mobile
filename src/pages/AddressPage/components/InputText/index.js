import React, { Component } from 'react';
import { View, Text } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';

class InputText extends Component {
  	constructor() {
  		super()
	}

  	render() {
  	  	return (
			<View style={styles.formContainer}>
				<StaticText 
            	    style={styles.label}
            	    property={this.props.label}
            	/>
                <Text style={styles.input}>{this.props.input}</Text>
				<View style={styles.underline}/>
            </View>
  	  	);
  	}
}

export default InputText;
