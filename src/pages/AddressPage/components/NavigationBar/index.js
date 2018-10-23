import React,{ PureComponent } from 'react';
import { View, Image, TouchableOpacity, Keyboard } from 'react-native';
import StaticText from '@components/StaticText';
import styles from './styles';
import images from '@assets';

class NavigationBar extends PureComponent {
    constructor(){
        super();
        this.setAction = this.setAction.bind(this);
    }
    
    setAction(action) {
        Keyboard.dismiss()
		this.props.setAction(this.props.type, action)
	}

    render(){
        return(
            <View style={styles.container}>
                <StaticText 
                    style={styles.title}
                    property={this.props.title}
                />
                <TouchableOpacity style={styles.button} onPress={this.props.isEdit ? () => this.setAction('edit') : this.props.backPress}>
                    <Image
                        resizeMode={'contain'} 
                        source={images.icon_back}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                { this.props.action == 'editAddress' ? (
                    <TouchableOpacity style={styles.trashButton} onPress={() => this.setAction('delete')}>
                        <Image
                            resizeMode={'contain'} 
                            source={images.icon_trash}
                            style={styles.trashIcon}
                        />
                    </TouchableOpacity>
                ) : null }
            </View>
        )
    }
}

export default NavigationBar;