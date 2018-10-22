import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles'

const { height, width } = Dimensions.get('window')

const styles = {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingHorizontal: width * 0.05,
        height: scaling.moderateScale(50),
        borderBottomColor: colour.lightGrey,
        backgroundColor: colour.white,
    },
    subcontainer:{
        content:{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        check:{
            flex: -1,
        }
    },
    text:{
        bankName: {
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(12),
            color: colour.darkGrey
        }
    },
    icon:{
        bank:{
            width: scaling.moderateScale(80),
            height: scaling.moderateScale(50),
            marginRight: scaling.moderateScale(10),
        },
        check:{
            width: scaling.moderateScale(14),
            height: scaling.moderateScale(14),
        }
    },

}

export default styles;