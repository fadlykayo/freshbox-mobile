import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const styles = {
    background: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
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
        height: height * 0.6,
        borderRadius: 20,
        backgroundColor: colour.white,
        paddingBottom: width * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        place: {
            flex: -1,
            height: width * 0.5,
            width: width * 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: colour.darkGrey,
            borderWidth: 1,
            borderRadius: 20,
        },
        content: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        style: {
            flex: -1,
            width: width * 0.4,
            height: width * 0.4,
        },
        data: {
            width: width * 0.4,
            height: width * 0.4,
        }
    },
    icon: {
        place: {
            position: 'absolute',
            top: 0,
            right: 0,
            marginTop: width * 0.04,
            marginRight: width * 0.04,
        },
		clear:{
			height: scaling.moderateScale(25),
			width: scaling.moderateScale(25)
		}
	}
}

export default styles;