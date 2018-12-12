import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    background:{
        width: width,
        height: height * 0.37,
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchableBackButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        marginTop: width * 0.05,
        marginLeft: width * 0.05,
    },
    button: {
        back: {
            height: scaling.moderateScale(18),
            width: scaling.moderateScale(18),
        }
    },
    photo: {
        real: {
            height: width * 0.26,
            width: width * 0.26,
            borderRadius: Platform.OS == 'android' ? 200 : 60,
            borderColor: colour.white,
            marginBottom: width * 0.02,
        },
        dummy: {
            height: width * 0.2,
            width: width * 0.2,
            marginBottom: width* 0.05,
        }
    },
    user: {
        name: {
            fontSize: scaling.moderateScale(16),
            fontFamily: 'Avenir-Heavy',
            color: colour.white,
            marginBottom: scaling.moderateScale(4),
        },
        phone: {
            fontSize: scaling.moderateScale(12),
            fontFamily: 'Avenir-Roman',
            color: colour.white,
        }
    },
}

export default styles;