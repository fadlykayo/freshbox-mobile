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
        height: height * 0.5,
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
    categories: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: width* 0.05,
        paddingBottom: width* 0.05,
        paddingRight: width* 0.04,
        paddingLeft: width* 0.06,
    },
    eachCategory: {
        height: width * 0.27,
        width: width * 0.27,
        borderColor: colour.lightGrey,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: colour.white,
        marginRight: width* 0.03,
        marginBottom: width* 0.03,
    },
    logo: {
        height: scaling.moderateScale(40),
        width: scaling.moderateScale(40),
    },
}

export default styles;