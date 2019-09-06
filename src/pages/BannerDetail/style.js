import { Dimensions, Platform } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles'

const { height, width } = Dimensions.get('window')

const styles = {
    container: {
        flex: 1,
        // paddingTop: 40,
        backgroundColor: colour.white,
        
    },
    content: {
        flex: 1
        
    },
    webview:{
        
    },
    gopay:{
        container: {
            flex: 1,
            width: width * 0.8,
            height: height * 0.5,
            // borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        imageContainer: {
            flex: -1,
            // borderWidth: 1

        },
        image: {
            height: height * 0.1,
            width: width * 0.5,
        },
        textContainer: {
            flex: -1,
            // borderWidth: 1
        },
        text: {
            fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(16),
			color: colour.darkGrey,
            textAlign: 'center',
        }
    },
}

export default styles;