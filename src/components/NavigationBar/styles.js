import { Dimensions, Platform } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { height } = Dimensions.get('window');

const styles = {
    container:{
        flex: 1,
        height: scaling.moderateScale(50),
        maxHeight: scaling.moderateScale(50),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colour.lightGrey,
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