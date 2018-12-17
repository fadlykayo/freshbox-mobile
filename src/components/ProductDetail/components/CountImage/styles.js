import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const styles = {
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: width * 0.03,
        width: width * 0.07,
        backgroundColor: colour.lightGrey,
        borderRadius: 100,
        marginTop: width * 0.01,
        marginRight: width * 0.01,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'Avenir-Heavy',
        fontSize: scaling.moderateScale(7),
        color: colour.white
    },
}

export default styles;