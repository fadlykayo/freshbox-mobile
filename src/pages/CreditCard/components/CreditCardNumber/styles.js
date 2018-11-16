import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const styles = {
    top: {
        main: {
            flex: -1,
        },
    },
    text: {
        title: {
            fontSize: scaling.moderateScale(12),
            fontFamily: 'Avenir-Black',
            color: colour.black,
            marginBottom: scaling.moderateScale(5),
        },
        content: {
            fontSize: scaling.moderateScale(14),
            fontFamily: 'Avenir-Light',
            color: colour.darkGrey,
        },
    },
    creditCard: {
        place: {
            width: width * 0.7,
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
        part: (x) => ({
            width: width * 0.15,
            alignItems: 'center',
            paddingVertical: width * 0.03,
            borderBottomColor: x ? colour.red : colour.lightGrey,
            borderBottomWidth: 1,
        })
    },
}

export default styles;