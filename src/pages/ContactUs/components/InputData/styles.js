import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    message: {
        height: width * 0.15,
        borderBottomWidth: 1,
        borderBottomColor: colour.mediumGrey,
        justifyContent: 'center'
    },
    messageText: {
        fontFamily: 'Avenir-Book',
        fontWeight: '400',
        fontSize: scaling.moderateScale(14),
        color: colour.lightGrey
    },
}

export default styles;