import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
        height: width * 0.27,
        width: width * 0.27,
        borderColor: colour.lightGrey,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: colour.white,
        marginRight: width* 0.03,
        marginBottom: width* 0.03,
        padding: scaling.moderateScale(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    subcontainer:{
        check:{
            height: scaling.moderateScale(15),
            width: scaling.moderateScale(15),
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            top: 0,
        }
    },
    icon:{
        check:{
            height: scaling.moderateScale(10),
            width: scaling.moderateScale(10),
        },
        product:{
            height: width * 0.15,
            width: width * 0.15,
            marginBottom: scaling.moderateScale(5),
        }
    },
    text:{
        category:{
            fontFamily: 'Avenir-Light',
            fontSize: scaling.moderateScale(12)
        }
    }
}

export default styles;