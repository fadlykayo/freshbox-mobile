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
        backgroundColor: colour.red,
        borderRadius: 8,
        marginTop: scaling.moderateScale(10),
    },
    title:{
        fontFamily: 'Avenir-Black',
        fontSize: scaling.moderateScale(14),
        color: colour.white,
    }
}

export default styles;