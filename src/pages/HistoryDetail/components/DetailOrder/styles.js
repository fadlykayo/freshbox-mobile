import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    topComponent: {
        flex: 1,
        height: height * 0.58,
        backgroundColor: colour.veryLightGrey,
        padding: width * 0.05,
    },
    staticText: {
        fontFamily: 'Avenir-Heavy',
        fontWeight: '500',
        fontSize: scaling.moderateScale(14),
        color: colour.grey,
        marginBottom: scaling.moderateScale(4),
    },
    detailText: {
        fontFamily: 'Avenir-Book',
        fontWeight: '400',
        fontSize: scaling.moderateScale(14),
        color: colour.darkGrey,
        marginBottom: scaling.moderateScale(18),
    },
    userText: {
        fontFamily: 'Avenir-Book',
        fontWeight: '400',
        fontSize: scaling.moderateScale(14),
        color: colour.darkGrey,
    }
}

export default styles;