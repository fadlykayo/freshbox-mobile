import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width, height } = Dimensions.get('window');

const styles = {
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
        backgroundColor: colour.darkGreyTransparent,
    },
    container: {
        flex: -1,

        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        paddingBottom: width* 0.05,
    },
    datePlace: {
        width: width* 0.9,
        height: width* 0.15,
        backgroundColor: colour.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: colour.grey,
        borderBottomWidth: 1,
    }
}

export default styles;