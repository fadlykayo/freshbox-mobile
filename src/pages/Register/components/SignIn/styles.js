import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width } = Dimensions.get('window');

const styles = {
    container:{
        height: scaling.moderateScale(50),
        width: width * 0.9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content:{
        fontFamily: 'Avenir-Light',
        fontSize: scaling.moderateScale(12),
        color: colour.darkGrey,
    },
    signIn:{
        fontFamily: 'Avenir-Light',
        fontSize: scaling.moderateScale(12),
        color: colour.red,
    }
}

export default styles;