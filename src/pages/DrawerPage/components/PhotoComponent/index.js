import React, { PureComponent } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

class PhotoComponent extends PureComponent {
  	constructor() {
    	super()
    }

  	render () {
  	  	return (
            <TouchableOpacity 
                onPress={() => this.props.navigateToProfilePage()}    
                style={styles.topComponent}
            >
				<Image
  	  	            resizeMode={'contain'} 
  	  	            source={this.props.user.photo}
  	  	            style={styles.photo}
  	  	        />
				<View>
  	  	    	    <Text style={styles.userName}>{this.props.user.name}</Text>
					<Text style={styles.userEmail}>{this.props.user.email}</Text>
				</View>
  	  	    </TouchableOpacity>
  	  	);
  	}
}

export default PhotoComponent;