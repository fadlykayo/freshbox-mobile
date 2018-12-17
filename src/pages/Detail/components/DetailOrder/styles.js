import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
        flex: -1,
        backgroundColor: colour.veryLightGrey,
        padding: scaling.moderateScale(20),
    },
    text: {
        static: {
            fontFamily: 'Avenir-Heavy',
            fontSize: scaling.moderateScale(14),
            color: colour.grey,
            marginBottom: scaling.moderateScale(4),
        },
        detail: {
            fontFamily: 'Avenir-Roman',
            fontSize: scaling.moderateScale(14),
            color: colour.darkGrey,
            marginBottom: scaling.moderateScale(18),
        },
        user: {
            fontFamily: 'Avenir-Roman',
            fontSize: scaling.moderateScale(14),
            color: colour.darkGrey,
            marginBottom: scaling.moderateScale(4),
        }
    },
}

export default styles;