import { Dimensions, Platform } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { height } = Dimensions.get('window');

const styles = {
    container:{
        flex: -1,
        height: scaling.moderateScale(50),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Platform.OS == 'ios' ? colour.veryLightGreyTransparent : null,
		shadowOffset: Platform.OS == 'ios' ? {width: 0,height: 2}  : {width: 0,height: 0},
		shadowRadius: Platform.OS == 'ios' ? 15 : 0,
		shadowOpacity: Platform.OS == 'ios' ?  1.0 : 0,
		elevation: Platform.OS == 'android' ? 5 : 0,
        borderBottomWidth: 1,
        borderBottomColor: colour.white,
        backgroundColor: colour.white
    },
    button:{
        position: 'absolute',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        top: 0,
        bottom: 0,
        width: scaling.moderateScale(50),
        height: scaling.moderateScale(50),
    },
    icon:{
        width: scaling.moderateScale(14),
        height: scaling.moderateScale(14),
    },
    title:{
        fontFamily: 'Avenir-Black',
        fontSize: scaling.moderateScale(14),
        color: colour.darkGrey,
    }
}

export default styles;