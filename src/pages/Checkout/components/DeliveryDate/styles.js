import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    background: {
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colour.blackTranslucent,
    },
    touchable: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    container: {
        flex: -1,
        position: 'absolute',
        bottom: -1 * (0.1 * width),
        left: 0,
        right: 0,
        height: height * 0.4,
        borderRadius: 20,
        backgroundColor: colour.white,
        paddingHorizontal: width * 0.05,
        paddingBottom: width * 0.1,
    },
    subcontainer:{
        title:{
            flex: -1,
            marginHorizontal: width* 0.05,
            paddingBottom: scaling.moderateScale(5),
        },
        button:{
            alignItems: 'center',
            paddingBottom: scaling.moderateScale(5),
        }
    },
    text:{
        title:{
            fontFamily: 'Avenir-Heavy',
            fontSize: scaling.moderateScale(20),
            color: colour.darkGrey,
        }
    },
    icon:{
        height: scaling.moderateScale(36),
        width: scaling.moderateScale(36),
    }
}

export default styles;