import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const styles = {
    text: {
        title: {
            fontSize: scaling.moderateScale(12),
            fontFamily: 'Avenir-Heavy',
            color: colour.black,
            marginBottom: scaling.moderateScale(5),
        },
        expDate: {
            width: width * 0.15,
            textAlign: 'center',
            fontSize: scaling.moderateScale(14),
            fontFamily: 'Avenir-Book',
            color: colour.darkGrey,
        },
    },
    expiredDate: {
        main: {
            flex: -1,
        },
        place: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        left: (x) => ({
            width: width * 0.15,
            borderBottomColor: x ? colour.red : colour.grey,
            borderBottomWidth: 1,
            alignItems: 'center',
            marginRight: scaling.moderateScale(5),
        }),
        middle: {
            width: width * 0.05,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: scaling.moderateScale(5),
        },
        right: (x) => ({
            width: width * 0.15,
            borderBottomColor: x ? colour.red : colour.grey,
            borderBottomWidth: 1,
            alignItems: 'center',
        }),
        cvv: (x) => ({
            width: width * 0.2,
            borderBottomColor: x ? colour.red : colour.grey,
            borderBottomWidth: 1,
            alignItems: 'center',
        }),
    },
}

export default styles;