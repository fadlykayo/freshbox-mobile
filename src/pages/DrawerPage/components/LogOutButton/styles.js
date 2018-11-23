import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { height, width } = Dimensions.get('window');

const styles = {
    container: {
        flex: -1,
        height: height * 0.12,
        padding: width * 0.05,
        justifyContent: 'center',
    },
    text: {
        logout: {
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(16),
            color: colour.darkGrey
        },
    },
}

export default styles;