import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width, height } = Dimensions.get('window');

const styles = {
    container: (i,length) => ({
        flexDirection: 'row',
        height: scaling.moderateScale(50),
        alignItems: 'center',
        borderColor: colour.mediumLightGrey,
        borderBottomWidth: i < length ? 1 : 0,
        paddingHorizontal: scaling.moderateScale(5),
    }),
    subcontainer:{
        check:{
            height: scaling.moderateScale(15),
            width: scaling.moderateScale(15),
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            marginRight: width * 0.03,
        }
    },
    icon:{
        check:{
            height: scaling.moderateScale(10),
            width: scaling.moderateScale(10),
        },
        product:{
            height: scaling.moderateScale(30),
            width: scaling.moderateScale(30),
            marginRight: scaling.moderateScale(15)
        }
    },
    text:{
        category:{
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(14),
            color: colour.darkGrey
        }
    }
}

export default styles;