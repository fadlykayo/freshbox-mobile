import React,{ PureComponent } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import images from '@assets';
import styles from './styles';

class ButtonFav extends PureComponent {
    constructor(){
        super();
		this.toggleFavorite = this.toggleFavorite.bind(this);
    }

    toggleFavorite(){
		this.props.toggleFavorite(this.props.data);
	}

    render(){
        if(this.props.user){
            return(
                <TouchableOpacity
                    onPress={this.toggleFavorite}
                    style={styles.container}
                >
                    <Image
                        style={styles.icon}
                        resizeMode={'contain'} 
                        source={
                            this.props.data.wishlisted == 1
                            ? 	images.icon_favorited
                            : 	images.icon_favorite
                        }
                    />
                </TouchableOpacity>
            )
        }
        else{
            return null;
        }
    }
}

export default ButtonFav;