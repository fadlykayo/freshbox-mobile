import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width } = Dimensions.get('window');

const styles = {
    container: {
        flex: -1,
        backgroundColor: colour.white,
        borderColor: colour.white,
        shadowColor: Platform.OS == 'ios' ? colour.veryLightGreyTransparent : null,
		shadowOffset: Platform.OS == 'ios' ? {width: 0,height: 0}  : {width: 0,height: 0},
		shadowRadius: Platform.OS == 'ios' ? 30 : 0,
		shadowOpacity: Platform.OS == 'ios' ?  1.0 : 0,
		elevation: Platform.OS == 'android' ? 10 : 0,
        borderTopRightRadius: scaling.moderateScale(15),
        borderTopLeftRadius: scaling.moderateScale(15),
        borderWidth: 1,
        paddingTop: width * 0.05,
        paddingHorizontal: width * 0.05,
        paddingBottom: width * 0.03,
    },
    subcontainer:{
        content:{
            flex: -1,
        },
        price:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: scaling.moderateScale(5),
        }
    },
    text:{
        title:{
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(14),
            color: colour.darkGrey
        },
        price:{
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(14),
            color: colour.grey
        },
        total:{
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(14),
            color: colour.red
        }
    }
}

export default styles;