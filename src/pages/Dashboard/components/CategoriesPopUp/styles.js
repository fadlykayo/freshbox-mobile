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
        backgroundColor: colour.blackTranslucent,
    },
    touchable: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    container: (isArea = false) => {
       return {
            flex: -1,
            position: 'absolute',
            bottom: -1 * (0.1 * width),
            left: 0,
            right: 0,
            borderRadius: 20,
            backgroundColor: colour.white,
            paddingBottom: width * 0.1,
            height: isArea ? height / 2.5 : height,
        }
    }  ,
    subcontainer:{
        title: (isArea = false) => {
            return {
                flex: -1,
                marginHorizontal: 5,
                paddingBottom: isArea ? 0 : scaling.moderateScale(10),
            }
        },
        button: (isArea = false) => {
            return {
                alignItems: 'center',
                paddingBottom: isArea ? 0 : scaling.moderateScale(10),
            }
        }
    },
    text:{
        title:{
            fontFamily: 'Avenir-Heavy',
            fontSize: scaling.moderateScale(20),
            color: colour.darkGrey,
            paddingLeft: scaling.moderateScale(30),
        }
    },
    icon:{
        height: scaling.moderateScale(36),
        width: scaling.moderateScale(36),
    }
}

export default styles;