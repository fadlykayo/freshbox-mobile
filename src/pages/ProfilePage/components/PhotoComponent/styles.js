import { Dimensions } from 'react-native';
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
    backButton: {
        height: scaling.moderateScale(22),
        width: scaling.moderateScale(22),
    },
    dummyPhoto: {
        height: width * 0.2,
        width: width * 0.2,
        marginBottom: width* 0.05,
    },
    photo: {
        height: width * 0.26,
        width: width * 0.26,
        borderRadius: 200,
        borderColor: colour.white,
        marginBottom: width* 0.02,
    },
    userName: {
        fontSize: scaling.moderateScale(16),
        fontFamily: 'Avenir-Heavy',
        fontWeight: '500',
        color: colour.white,
        marginBottom: scaling.moderateScale(4),
    },
    userEmail: {
        fontSize: scaling.moderateScale(12),
        fontFamily: 'Avenir-Heavy',
        fontWeight: '400',
        color: colour.white,
    },
}

export default styles;