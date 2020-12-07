import {Dimensions} from 'react-native';
import {colour} from '@styles';
import {scaling} from '@helpers';

const {width, height} = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
        backgroundColor: colour.white,
    },
    subcontainer: {
        bottom: {
            flex: -1,
            paddingHorizontal: width * 0.05,
            marginBottom: width * 0.05,
        }
    },
    modal: {
        flex: -1,
        position: 'absolute',
        bottom: -1 * (0.1 * width),
        left: 0,
        right: 0,
        height: height * 0.55,
        borderRadius: 20,
        backgroundColor: colour.white,
        paddingHorizontal: width * 0.05,
        paddingBottom: width * 0.1,
    },
    touchable: {
        flex: 1,
        backgroundColor: 'transparent',
    },
};

export default styles;