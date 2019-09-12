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
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
        
    },
    webview:{
        
    },
    banner: {
        container: {
            height: height * 0.25,
            width: width,
            // backgroundColor: 'pink',
            alignItems: 'center',
            alignSelf: 'center',
            // borderRadius: 50,
        },
        image: {
           height: height * 0.25,
           width: width, 
        }
    },
    mid: {
        container: {
            flex: -1,
            paddingHorizontal: 20,
            paddingVertical: 10,
            // borderWidth: 1,

        },
        hori: {
            width: 3,
            height: 20,
            backgroundColor: colour.red,
            marginRight: 5,
        },
        titleContainer: {
            paddingVertical: 20,
            // paddingHorizontal: 5,
            flexDirection: 'row',
        },
        titleText: {
            fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(16),
			color: colour.darkGrey,
            // textAlign: 'center',
        },
        contentContainer: {

        },
        contentText: {
            fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(13),
			color: colour.black,
        },
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
    promo: {
        container: {
            flex: -1,
            paddingLeft: 15,
            marginHorizontal: 5,
            paddingVertical: 20,
            // borderWidth: 1,
        },
        card: {
            marginVertical: 10
        },
        hori: {
            width: 3,
            height: 20,
            backgroundColor: colour.red,
            marginRight: 5,
        },
        titleContainer: {
            // paddingVertical: 20,
            // paddingHorizontal: 5,
            flexDirection: 'row',
        },
        titleText: {
            fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(16),
			color: colour.darkGrey,
            // textAlign: 'center',
        },
    },
}

export default styles;