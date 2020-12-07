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
        borderRadius: 20,
        height: 260,
        backgroundColor: colour.white,
        paddingHorizontal: width * 0.05,
        paddingTop: 30,
        paddingBottom: 30,
        borderWidth: 1,
        borderColor: colour.softGrey,
    },
    touchable: {
        flex: 1,
        backgroundColor: 'transparent',
    },
};

export default styles;