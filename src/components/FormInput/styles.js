import { Dimensions, Platform } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width } = Dimensions.get('window');

const styles = {
    container: (multiline, voucher) => {
        if(!multiline) {
            return {
                flex: -1,
                marginVertical: scaling.moderateScale(10), 
            }
        } else {
            return {
                flex: -1,
                marginVertical: scaling.moderateScale(10),
                height: 150,
                borderWidth: 1,
                borderColor: colour.mediumGrey,
                paddingHorizontal: 10, 
            }
        }
    },
    label: {
        fontFamily: 'Avenir-Heavy',
        fontSize: scaling.moderateScale(12),
        color: colour.darkGrey,
    },
    formInput: {
        fontFamily: 'Avenir-Book',
        fontSize: scaling.moderateScale(14),
        color: colour.darkGrey,
        paddingHorizontal: 0,
        paddingTop: scaling.moderateScale(10),
        paddingBottom: scaling.moderateScale(5)
    },
    underline: (type) => ({
        height: 1,
        borderTopWidth: type == 'voucher' ? 0 : 1,
        borderColor: colour.mediumGrey,
    }),
    showPasswordButton: {
        position: 'absolute',
        right: 0,
        bottom: 10,
    },
    icon:{
        height: scaling.moderateScale(20),
        width: scaling.moderateScale(20),

    },
    showVoucherButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: colour.red, 
        height: 35, 
        width: 90,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scaling.moderateScale(8),
        borderColor: colour.red,
        shadowColor: Platform.OS == 'ios' ? colour.redTransparent : null,
        shadowOffset: Platform.OS == 'ios' ? {width: 0,height: 2}  : {width: 0,height: 0},
        shadowRadius: Platform.OS == 'ios' ? 5 : 0,
        shadowOpacity: Platform.OS == 'ios' ?  1.0 : 0,
        elevation: Platform.OS == 'android' ? 3 : 0,
        fontFamily: 'Avenir-Heavy',
    },
    showCancelVoucher: {
        position: 'absolute',
        right: 0,
        bottom: 10,
    },
    textCancel: {
        fontFamily: 'Avenir-Book',
        fontSize: scaling.moderateScale(12),
        color: colour.grey,
    },
    textVoucher: {
        fontFamily: 'Avenir-Heavy',
        fontSize: scaling.moderateScale(14),
        color: colour.white,
    },
    successVoucher: {
        flexDirection: 'row',
        marginVertical: scaling.moderateScale(5),
        // height: 35,
        borderBottomWidth: 1,
        borderBottomColor: colour.mediumGrey,
    },
    successText: {
        fontFamily: 'Avenir-Book',
        fontSize: scaling.moderateScale(14),
        color: colour.darkGrey,
        marginRight: scaling.moderateScale(5),
        paddingTop: scaling.moderateScale(2)
    }
}

export default styles;