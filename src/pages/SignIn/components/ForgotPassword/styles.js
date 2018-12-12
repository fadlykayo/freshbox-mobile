import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width } = Dimensions.get('window');

const styles = {
    container:{
        height: scaling.moderateScale(50),
        width: width * 0.9,
        flexDirection: 'row',
    },
    title:{
        fontFamily: 'Avenir-Roman',
        fontSize: scaling.moderateScale(14),
        color: colour.red,
    }
}

export default styles;