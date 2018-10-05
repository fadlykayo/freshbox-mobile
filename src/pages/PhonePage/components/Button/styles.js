import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width } = Dimensions.get('window');

const styles = {
    buttonEdit:{
        height: scaling.moderateScale(50),
        width: width * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colour.white,
        borderColor: colour.red,
        borderWidth: 1,
        borderRadius: 8,
    },
    titleEdit:{
        fontFamily: 'Avenir-Heavy',
        fontWeight: '500',
        fontSize: scaling.moderateScale(12),
        color: colour.red,
    },
    buttonSave:{
        height: scaling.moderateScale(50),
        width: width * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colour.red,
        borderColor: colour.white,
        borderWidth: 1,
        borderRadius: 8,
    },
    titleSave:{
        fontFamily: 'Avenir-Heavy',
        fontWeight: '500',
        fontSize: scaling.moderateScale(12),
        color: colour.white,
    }
}

export default styles;