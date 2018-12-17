import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window')

const styles = {
    container: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colour.blackTranslucent,
        width: width,
        height: height
    },
    subcontainer: {
        box: {
            width: width * 0.8,
            backgroundColor: colour.white,
            borderRadius: 8,
        },
        text: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: width * 0.05,
            paddingHorizontal: width * 0.05,
        },
        answer: {
            height: scaling.moderateScale(50),
            backgroundColor: colour.grey,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
        }
    },
    button: {
        red: {
            width: width * 0.4,
            height: scaling.moderateScale(50),
            backgroundColor: colour.red,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomLeftRadius: 8,
        },
        white: {
            width: width * 0.4,
            height: scaling.moderateScale(50),
            backgroundColor: colour.lightGrey,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomRightRadius: 8,
        }
    },
    text: {
        red: {
            fontFamily: 'Avenir-Heavy',
            fontSize: scaling.moderateScale(14),
            color: colour.white
        },
        white: {
            fontFamily: 'Avenir-Heavy',
            fontSize: scaling.moderateScale(14),
            color: colour.white
        }
    },
    staticText: {
        fontFamily: 'Avenir-Roman',
        fontSize: scaling.moderateScale(14),
        color: colour.darkGrey,
        lineHeight: 20
    }
}

export default styles;