import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width } = Dimensions.get('window');

const styles = {
    container:{
        paddingTop: scaling.moderateScale(30),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content:{
        fontFamily: 'Avenir-Book',
        fontSize: scaling.moderateScale(12),
        color: colour.darkGrey,
    },
    register:{
        color: colour.red,
    }
}

export default styles;