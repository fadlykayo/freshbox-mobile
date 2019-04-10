import { Dimensions, Platform } from 'react-native';
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
        height: height * 0.55,
        borderRadius: 20,
        backgroundColor: colour.white,
        paddingBottom: width * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        place: {
            flex: -1,
            height: width * 0.8,
            width: width * 0.8,
            backgroundColor: colour.white,
            borderColor: colour.white,
            borderWidth: 1,
            borderRadius: 20,
            shadowColor: Platform.OS == 'ios' ? colour.veryLightGreyTransparent : null,
		    shadowOffset: Platform.OS == 'ios' ? {width: 0,height: 12}  : {width: 0,height: 0},
		    shadowRadius: Platform.OS == 'ios' ? 20 : 0,
		    shadowOpacity: Platform.OS == 'ios' ?  1.0 : 0,
            elevation: Platform.OS == 'android' ? 8 : 0,
            justifyContent: 'center',
            alignItems: 'center',
        },
        content: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        style: {
            flex: -1,
            width: width * 0.8,
            height: width * 0.8,
        },
        data: {
            width: width * 0.8,
            height: width * 0.8,
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