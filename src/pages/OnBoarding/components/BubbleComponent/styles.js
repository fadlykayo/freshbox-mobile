import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const styles = {
    page: {
        place: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            marginBottom: height * 0.18,
            marginLeft: width * 0.05,
            flexDirection: 'row',
        },
        unselected: {
            width: scaling.moderateScale(10),
            height: scaling.moderateScale(10),
            backgroundColor: colour.lightGrey,
            borderRadius: 100,
            marginRight: width * 0.02,
        },
        selected : {
            width: scaling.moderateScale(25),
            height: scaling.moderateScale(10),
            backgroundColor: colour.white,
            borderRadius: 100,
            marginRight: width * 0.02,
        }
    },
}

export default styles;