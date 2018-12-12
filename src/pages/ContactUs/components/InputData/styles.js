import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    message: {
        place: {
            height: width * 0.15,
            borderBottomWidth: 1,
            borderBottomColor: colour.mediumGrey,
            justifyContent: 'center'
        },
        text: {
            fontFamily: 'Avenir-Roman',
            fontSize: scaling.moderateScale(14),
            color: colour.grey
        }
    },
}

export default styles;