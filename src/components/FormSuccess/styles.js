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
        backgroundColor: colour.darkGreyTransparent,
    },
    container: {
        flexDirection: 'row',
        width: width * 0.9,
        borderRadius: 8,
        backgroundColor: colour.white,
    },
    subcontainer:{
        left:{
            flex: -1,
            alignItems: 'center',
            padding: scaling.moderateScale(15),
        },
        right:{
            flex: 1,
            paddingTop: scaling.moderateScale(15),
            paddingBottom: scaling.moderateScale(15),
        }
    },
    logo: {
        height: scaling.moderateScale(36),
        width: scaling.moderateScale(36),
    },
    title:{
        fontFamily: 'Avenir-Black',
        fontSize: scaling.moderateScale(12),
        color: colour.darkGrey,
    },
    content:{
        fontFamily: 'Avenir-Light',
        fontSize: scaling.moderateScale(12),
        color: colour.darkGrey,
    },
}

export default styles;