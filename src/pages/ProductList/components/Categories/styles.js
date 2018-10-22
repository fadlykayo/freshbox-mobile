import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width, height } = Dimensions.get('window');

const styles = {
    background: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: colour.darkGreyTransparent,
    },
    container: {
        width: width,
        height: height * 0.5,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        backgroundColor: colour.white,
    },
    subcontainer:{
        title:{
            flex: -1,
            marginHorizontal: width* 0.05,
            paddingBottom: scaling.moderateScale(5),
            borderColor: colour.grey,
            borderBottomWidth: 1,
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
            fontWeight: '800',
            color: colour.darkGrey,
        }
    },
    icon:{
        height: scaling.moderateScale(36),
        width: scaling.moderateScale(36),
    }
}

export default styles;