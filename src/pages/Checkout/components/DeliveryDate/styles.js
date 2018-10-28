import { Dimensions } from 'react-native';
import { colour } from '@styles';

const { width } = Dimensions.get('window');

const styles = {
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: colour.darkGreyTransparent,
    },
    container: {
        marginHorizontal: width * 0.05,
        marginBottom: width* 0.05,
        width: width* 0.9,
        borderRadius: 10,
        backgroundColor: colour.white,
    }
}

export default styles;