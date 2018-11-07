import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        width: width
    },
    subContainer: {
        white: {
            flex: -1,
            width: scaling.moderateScale(20),
            backgroundColor: colour.white
        }
    },
}

export default styles;