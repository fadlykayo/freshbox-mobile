import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colour.white,
        marginTop: width * 0.02,
    },
    scrollView: {
        backgroundColor: colour.white,
    },
    subcontainer: {
        bottom: {
            flex: -1,
            width: width,
            paddingHorizontal: scaling.moderateScale(30),
            marginVertical: width * 0.035,
            backgroundColor: colour.white,
            justifyContent: 'center',
        }
    },
}

export default styles