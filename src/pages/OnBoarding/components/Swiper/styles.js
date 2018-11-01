import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    fullScreen: {
        width: width,
        height: height
    },
    container: {
        backgroundColor: 'transparent',
        position: 'relative'
    },
    slide: {
        backgroundColor: 'transparent'
    },
    pagination: {
        position: 'absolute',
        bottom: 110,
        left: 0,
        right: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'transparent'
    },
    dot: {
        backgroundColor: colour.blackTransparent,
        width: scaling.moderateScale(8),
        height: scaling.moderateScale(8),
        borderRadius: scaling.moderateScale(4),
        marginLeft: scaling.moderateScale(3),
        marginRight: scaling.moderateScale(3),
        marginTop: scaling.moderateScale(3),
        marginBottom: scaling.moderateScale(3),
    },
    activeDot: {
        backgroundColor: colour.white,
    },
    buttonWrapper: {
        backgroundColor: 'transparent',
        flexDirection: 'column',
        position: 'absolute',
        bottom: 0,
        left: 0,
        flex: 1,
        paddingHorizontal: scaling.moderateScale(10),
        paddingVertical: scaling.moderateScale(40),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
};

export default styles