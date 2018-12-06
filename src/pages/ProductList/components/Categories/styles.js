import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width, height } = Dimensions.get('window');

const styles = {
    background: {
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colour.darkGreyTransparent,
    },
    touchable: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    container: {
        flex: -1,
        width: width,
        height: height * 0.4,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        backgroundColor: colour.white,
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
            fontFamily: 'Avenir-Black',
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