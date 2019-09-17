import React,{ PureComponent } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import images from '@assets';
import styles from './styles';

class ButtonFav extends PureComponent {
    constructor(){
        super();
		this.toggleFavorite = this.toggleFavorite.bind(this);
        this.onShare = this.onShare.bind(this);
    }

    toggleFavorite(){
		this.props.toggleFavorite(this.props.data);
	}

    onShare(){
        this.props.onShare(this.props.data);
    }

    render(){
        if(this.props.user){
            return(
                <View style = {{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={this.onShare}
                    style={styles.container(this.props.dashboard)}
                >
                <Image
                    style={styles.icon(this.props.dashboard)}
                    resizeMode={'contain'}
                    source={
                        images.ic_share
                    }
                />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.toggleFavorite}
                    style={styles.container(this.props.dashboard)}
                >
                    
                    <Image
                        style={styles.icon(this.props.dashboard)}
                        resizeMode={'contain'} 
                        source={
                            this.props.data.wishlisted == 1
                            ? 	images.icon_favorited
                            : 	images.icon_favorite
                        }
                    />
                </TouchableOpacity>
                </View>
            )
        }
        else{
            return null;
        }
    }
}

export default ButtonFav;