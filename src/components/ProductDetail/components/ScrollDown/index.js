import React,{ Component } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import styles from './styles';
import images from '@assets';

class ScrollDown extends Component {
	constructor(){
        super();
        this.closeDetailProduct = this.closeDetailProduct.bind(this);
	}

    closeDetailProduct(){
		this.props.closeDetailProduct();
	}

	render(){
		return(
			<TouchableOpacity 
				style={styles.subcontainer.top}
				onPress={this.closeDetailProduct}
			>
				<View style={styles.button.dropdown}>
					<Image
						resizeMode={'contain'} 
						source={images.icon_scroll_down}
						style={styles.icon.dropdown}
					/>
				</View>
			</TouchableOpacity>
		)
	}
}

export default ScrollDown;