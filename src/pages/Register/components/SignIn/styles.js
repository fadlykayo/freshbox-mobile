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
        fontFamily: 'Avenir-Book',
        fontSize: scaling.moderateScale(12),
        color: colour.darkGrey,
    },
    signIn:{
        color: colour.red,
    }
}

export default styles;