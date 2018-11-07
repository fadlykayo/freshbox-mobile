import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const styles = {
    page: {
        place: {
            position: 'absolute',
            bottom: 0,
            marginBottom: width * 0.01,
            flexDirection: 'row',
            alignItems: 'center'
        },
        unselected: {
            width: scaling.moderateScale(3),
            height: scaling.moderateScale(3),
            backgroundColor: colour.lightGrey,
            borderRadius: 100,
            marginRight: width * 0.005,
        },
        selected : {
            width: scaling.moderateScale(4),
            height: scaling.moderateScale(4),
            backgroundColor: colour.red,
            borderRadius: 100,
            marginRight: width * 0.005,
        }
    },
}

export default styles;