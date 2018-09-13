import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width } = Dimensions.get('window');

const styles = {
    container:{
        flex: -1,
        marginBottom: scaling.moderateScale(10),
    },
    label: {
        fontFamily: 'Avenir-Black',
        fontSize: scaling.moderateScale(12),
        color: colour.darkGrey,
    },
    formInput: {
        fontFamily: 'Avenir-Light',
        fontSize: scaling.moderateScale(14),
        color: colour.darkGrey,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: scaling.moderateScale(10),
        paddingBottom: scaling.moderateScale(5)
    },
    underline: {
        height: 1,
        borderTopWidth: 1,
        borderColor: colour.lightGrey,
    },
    showPasswordButton: {
        position: 'absolute',
        right: 0,
        bottom: 10,
    },
    icon:{
        height: scaling.moderateScale(20),
        width: scaling.moderateScale(20),
    },
}

export default styles;