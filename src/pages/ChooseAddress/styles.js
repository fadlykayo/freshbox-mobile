import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colour.veryLightGrey,
        paddingTop: width * 0.015,
    },
    scrollView: {
        backgroundColor: colour.white,
    },
    bottomComponent: {
        flex: -1,
        height: height * 0.15,
        width: width,
        backgroundColor: colour.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addAddress: {
        width: width * 0.9,
        height: width * 0.14,
        borderColor: colour.red,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addAddressText: {
        fontFamily: 'Avenir-Heavy',
        fontSize: scaling.moderateScale(12),
        fontWeight: '500',
        color: colour.red
    }
}

export default styles