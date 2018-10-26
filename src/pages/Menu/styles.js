import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width } = Dimensions.get('window');

const styles = {
    container:{
        flex: 1,
        backgroundColor: colour.red,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background:{
        flex: 1,
        width: width,
    },
    termsAndConditionPlace: {
        position: 'absolute',
        bottom: 0,
        paddingBottom: scaling.moderateScale(9),
        paddingTop: scaling.moderateScale(9),
        width: width,
        backgroundColor: colour.whiteTransparent,
    },
    termsAndCondition:{
        fontFamily: 'Avenir-Light',
        fontSize: scaling.moderateScale(12),
        color: colour.darkGrey,
        textAlign: 'center',
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
    },
    underline: {
        fontFamily: 'Avenir-Light',
        fontSize: scaling.moderateScale(12),
        color: colour.darkGrey,
        textDecorationLine: 'underline',
        textAlign: 'center'
    }
}

export default styles;