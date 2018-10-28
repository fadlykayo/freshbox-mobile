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
    },
    datePlace: (x,y) => ({
        height: scaling.moderateScale(50),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: colour.red,
        borderBottomWidth: (x == y) ? 0 : 1,
    }),
}

export default styles;