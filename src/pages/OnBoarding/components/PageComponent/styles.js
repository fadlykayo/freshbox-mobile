import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const styles = {
    scrollview: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        width: width
    },
    subContainer: {
        red: {
            flex: 1,
            backgroundColor: colour.red
        },
        white: {
            flex: -1,
            width: scaling.moderateScale(20),
            backgroundColor: colour.white
        }
    },
    topComponent: {
        flex: -1,
        height: height * 0.43,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        outer: {
            height: width * 0.42,
            width: width * 0.42,
            borderRadius: 100,
            borderWidth: 20,
            borderColor: colour.hotPink,
            justifyContent: 'center',
            alignItems: 'center',
        },
        inner: {
            height: width * 0.33,
            width: width * 0.33,
            borderRadius: 100,
            backgroundColor: colour.pink,
        },
    },
    info: {
        flex: 1,
        paddingHorizontal: width * 0.05,
    },
    title: {
        place: {

        },
        text: {
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(20),
            color: colour.white,
            lineHeight: scaling.moderateScale(24),
            marginBottom: scaling.moderateScale(10),
        }
    },
    contentText: {
        place: {
            width: width * 0.7
        }, 
        text: {
            fontFamily: 'Avenir-Light',
            fontSize: scaling.moderateScale(13),
            color: colour.white,
            lineHeight: scaling.moderateScale(21),
        }
    },
    page: {
        place: {
            marginTop: width * 0.05,
            flexDirection: 'row',
        },
        unselected: {
            width: scaling.moderateScale(12),
            height: scaling.moderateScale(12),
            backgroundColor: colour.lightGrey,
            borderRadius: 100,
            marginRight: width * 0.02,
        },
        selected : {
            width: scaling.moderateScale(30),
            height: scaling.moderateScale(12),
            backgroundColor: colour.white,
            borderRadius: 100,
            marginRight: width * 0.02,
        }
    },
    skip: {
        place: {
            flex: -1,
            height: height * 0.1,
            paddingHorizontal: width * 0.05,
            marginBottom: width * 0.03,
            justifyContent: 'center'
        },
        text: {
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(20),
            color: colour.white,
        }
    },
    button: {
        position: 'absolute',
        right: -(width * 0.05),
        top: height * 0.425,
        justifyContent: 'center',
        backgroundColor: colour.white,
        width: width * 0.15,
        height: width * 0.15,
        borderRadius: 100,
        paddingLeft: width * 0.025,
    },
    logo: {
        height: scaling.moderateScale(15),
        width: scaling.moderateScale(20),
    }
}

export default styles;