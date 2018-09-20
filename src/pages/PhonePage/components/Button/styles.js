import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width } = Dimensions.get('window');

const styles = {
    button:{
        height: scaling.moderateScale(50),
        width: width * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colour.white,
        borderColor: colour.red,
        borderWidth: 1,
        borderRadius: 8,
    },
    title:{
        fontFamily: 'Avenir-Heavy',
        fontWeight: '500',
        fontSize: scaling.moderateScale(12),
        color: colour.red,
    }
}

export default styles;