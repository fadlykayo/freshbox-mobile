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
        flexDirection: 'row',
        alignItems: 'center',
        height: height * 0.23,
        width: width,
        borderRadius: 20,
        backgroundColor: colour.white,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        paddingBottom: width* 0.05,
    },
    subcontainer:{
        left:{
            flex: -1,
            width: width * 0.25,
            alignItems: 'center',
            justifyContent: 'center',
        },
        right:{
            flex: 1,
        }
    },
    logo: {
        height: scaling.moderateScale(50),
        width: scaling.moderateScale(50),
    },
    title:{
        fontFamily: 'Avenir-Heavy',
        fontSize: scaling.moderateScale(15),
        color: colour.darkGrey,
    },
}

export default styles;