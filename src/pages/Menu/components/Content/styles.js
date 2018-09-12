import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width } = Dimensions.get('window');

const styles = {
    container:{
        flex: 2,
        alignItems: 'center',
    },
    termsAndCondition:{
        fontFamily: 'Avenir-Light',
        fontSize: scaling.moderateScale(12),
        color: colour.white,
        textAlign: 'center',
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
    }
}

export default styles;