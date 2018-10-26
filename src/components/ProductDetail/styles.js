import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width, height } = Dimensions.get('window');

const styles = {
    background: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colour.darkGreyTransparent,
    },
    container: {
        flex: 1,
        position: 'absolute',
        bottom: -1 * (0.1 * width),
        left: 0,
        right: 0,
        height: height * 0.5,
        borderRadius: 8,
        backgroundColor: colour.white,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        paddingBottom: width * 0.1,
    },
    subcontainer:{
        top:{
            flex: -1,
            height: height * 0.05,
            alignItems: 'center',
            justifyContent: 'center'
        },
        mid:{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: scaling.moderateScale(5),
        },
        bottom:{
            flex: 1,
        },
        product:{
            height: width * 0.2,
            width: width * 0.2,
            backgroundColor: colour.white,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: colour.lightGrey,
            padding: scaling.moderateScale(2),
            marginRight: scaling.moderateScale(5),
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
    button:{
        dropdown:{
            alignItems: 'center',
        }
    },
    image: {
        content: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        style: {
            height: width * 0.19,
            width: width * 0.18,
        }
    },
    icon:{
        dropdown:{
            height: scaling.moderateScale(36),
            width: scaling.moderateScale(36),
        },
        product:{
            height: width * 0.18,
            width: width * 0.18,
        }
    },
    text:{
        description:{
            fontFamily: 'Avenir-Light',
            marginBottom: scaling.moderateScale(12),
            color: colour.grey,
            lineHeight: scaling.moderateScale(24),
        }
    },
    favoriteLogo: {
		height: scaling.moderateScale(20),
		width: scaling.moderateScale(20),
    },
    favoriteComponent: {
		alignItems: 'flex-end',
    },
}

export default styles;