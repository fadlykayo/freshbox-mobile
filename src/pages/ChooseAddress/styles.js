import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colour.veryLightGrey,
        paddingTop: width * 0.01,
    },
    scrollView: {
        backgroundColor: colour.white,
    },
    subcontainer: {
        bottom: {
            flex: -1,
            width: width,
            marginBottom: width * 0.04,
            backgroundColor: colour.white,
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
}

export default styles