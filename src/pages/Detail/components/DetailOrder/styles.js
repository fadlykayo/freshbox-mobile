import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
        flex: -1,
        backgroundColor: colour.veryLightGrey,
        padding: width * 0.05,
    },
    text: {
        static: {
            fontFamily: 'Avenir-Black',
            fontSize: scaling.moderateScale(14),
            color: colour.grey,
            marginBottom: scaling.moderateScale(4),
        },
        detail: {
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(14),
            color: colour.darkGrey,
            marginBottom: scaling.moderateScale(18),
        },
        user: {
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(14),
            color: colour.darkGrey,
        }
    },
}

export default styles;