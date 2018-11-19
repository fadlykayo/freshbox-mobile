import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const styles = {
    otp: {
        box: {
            height: height * 0.15,
            width: width * 0.18,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: colour.grey,
        },
        text: {
            fontSize: scaling.moderateScale(20),
            fontFamily: 'Avenir-Black',
            color: colour.red,

        },
        empty: {
            borderBottomWidth: 1,
            borderBottomColor: colour.lightGrey,
        }
    },
}

export default styles;