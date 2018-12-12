import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width } = Dimensions.get('window');

const styles = {
    button:{
        height: scaling.moderateScale(50),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colour.red,
        borderRadius: 8,
    },
    title:{
        fontFamily: 'Avenir-Heavy',
        fontSize: scaling.moderateScale(14),
        color: colour.white,
    }
}

export default styles;