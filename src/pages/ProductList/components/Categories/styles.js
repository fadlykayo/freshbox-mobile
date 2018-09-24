import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width, height } = Dimensions.get('window');

const styles = {
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: width,
        height: height,
        backgroundColor: colour.darkGreyTransparent,
    },
    container: {
        width: width,
        height: height * 0.55,
        borderRadius: 8,
        backgroundColor: colour.white,
    },
    topComponent: {
        flex: -1,
        justifyContent: 'space-between',
        height: height * 0.11,
        paddingLeft: width* 0.05,
        paddingRight: width* 0.05,
    },
    scrollDownButton: {
        alignItems: 'center',
    },
    staticText: {
        fontFamily: 'Avenir-Heavy',
        fontSize: scaling.moderateScale(20),
        fontWeight: '800',
        color: colour.darkGrey,
    },
    scrollView: {
        marginTop: scaling.moderateScale(9),
    },
    logo: {
        height: scaling.moderateScale(45),
        width: scaling.moderateScale(45),
        marginBottom: scaling.moderateScale(5),
    },
}

export default styles;