import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const styles = {
    button: {
        position: 'absolute',
        right: -(width * 0.05),
        top: height * 0.425,
        justifyContent: 'center',
        backgroundColor: colour.white,
        width: width * 0.15,
        height: width * 0.15,
        borderRadius: 100,
        paddingLeft: width * 0.025,
    },
    logo: {
        height: scaling.moderateScale(15),
        width: scaling.moderateScale(20),
    }
}

export default styles;