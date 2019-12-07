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
            height: 600 / (1200/width),
            width: width,
            // backgroundColor: 'pink',
            alignItems: 'center',
            alignSelf: 'center',
            // borderRadius: 50,
        },
        image: {
           height: 600 / (1200/width),
           width: width,
        //    backgroundColor: 'pink', 
        }
    },
    mid: {
        outerContainer: {
            flex: -1,
            backgroundColor: colour.backgroundGrey,
        },
        container: {
            flex: -1,
            // borderWidth: 1,
            justifyContent: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: colour.white

        },
        hori: {
            width: 3,
            height: 20,
            backgroundColor: colour.red,
            marginRight: 5,
        },
        titleContainer: {
            // paddingVertical: 10,
            justifyContent: 'space-between'
        },
        subtitleContainer: {
            flexDirection: 'row',
            marginTop: 2,
        },
        calendar: {
            height: 15,
            width: 15,
            marginRight: 8,
        },
        titleText: {
            fontFamily: 'Avenir-Heavy',
			fontSize: scaling.moderateScale(18),
			color: colour.darkGrey,
            // textAlign: 'center',
        },
        date: {
            fontFamily: 'Avenir-Medium',
			fontSize: scaling.moderateScale(13),
			color: colour.grey,
            // textAlign: 'center',
        },
        contentContainer: {

        },
        contentText: {
            fontFamily: 'Avenir-Book',
			fontSize: scaling.moderateScale(14),
			color: colour.darkGrey,
        },
        content: {
            flex: -1,
            marginTop: 10,
            backgroundColor: colour.white,
            paddingHorizontal: 20,
            paddingVertical: 10,

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
            flex: 1,
            // width: width,
            // marginHorizontal: 5,
            paddingVertical: 20,
            // paddingHorizontal: 20,
            // borderWidth: 1,
        },
        card: {
            // marginVertical: 10
            // paddingHorizontal: 20,
        },
        cart: {
            // flex: 1,
            paddingTop: 10,
            // paddingRight: 20,
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
            // borderWidth: 1,
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginVertical: 10,
        },
        titleText: {
            fontFamily: 'Avenir-Heavy',
			fontSize: scaling.moderateScale(18),
			color: colour.darkGrey,
            // textAlign: 'center',
        },
        moreText: {
            fontFamily: 'Avenir-Heavy',
			fontSize: scaling.moderateScale(13),
			color: colour.red,
            marginTop: 5,
            marginRight: 5,
            // textAlign: 'center',
        },
    },
    voucher: {
        container: {
            // paddingHorizontal: 20
        },
        textContainer: {
            marginTop: 10,
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            paddingHorizontal: 20, 
            // borderWidth: 1, 
            borderRadius: 10, 
            height: 70,
            width: width * 0.9,
            marginHorizontal: 20,
            backgroundColor: colour.softPink,
        },
        text: {
            fontFamily: 'Avenir-Heavy',
            fontSize: scaling.moderateScale(18),
            color: colour.red,
            fontWeight: 'bold'
        },
        button: {
            marginTop: 10,
            paddingHorizontal: 20
        },
    }
}

export default styles;