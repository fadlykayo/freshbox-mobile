import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width, height } = Dimensions.get('window');

const styles = {
    container:{
        flex: -1,
        marginBottom: scaling.moderateScale(10),
        marginTop: scaling.moderateScale(10),
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
        right: 10,
        bottom: 10,
    },
    icon:{
        height: scaling.moderateScale(10),
        width: scaling.moderateScale(10),
    },
    dropdownPlace: {
        maxHeight: scaling.moderateScale(200),
        width: width * 0.9,
        backgroundColor: colour.white,
        borderColor: colour.lightGrey,
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: scaling.moderateScale(10),
    },
    dropdown: {
        height: scaling.moderateScale(50),
        width: width * 0.9,
        borderColor: colour.lightGrey,
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export default styles;