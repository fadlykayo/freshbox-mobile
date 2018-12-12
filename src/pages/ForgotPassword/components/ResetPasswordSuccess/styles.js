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
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
        backgroundColor: colour.darkGreyTransparent,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.9,
        borderRadius: 8,
        backgroundColor: colour.white,
    },
    subcontainer:{
        left:{
            flex: -1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: scaling.moderateScale(20),
        },
        right:{
            flex: 1,
        }
    },
    logo: {
        height: scaling.moderateScale(40),
        width: scaling.moderateScale(40),
    },
    title:{
        fontFamily: 'Avenir-Heavy',
        fontSize: scaling.moderateScale(12),
        color: colour.darkGrey,
    },
    content:{
        fontFamily: 'Avenir-Book',
        fontSize: scaling.moderateScale(12),
        color: colour.darkGrey,
    },
}

export default styles;