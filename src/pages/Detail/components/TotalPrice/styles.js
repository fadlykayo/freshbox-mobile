import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    bottomComponent: {
        flex: 1,
        height: height * 0.3,
        backgroundColor: colour.white,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderWidth: 1,
        borderColor: colour.lightGrey,
        padding: width * 0.05,
    },
    topTotalPrice: {
        flex: 1,
    },
    subTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: scaling.moderateScale(8),
    },
    grandTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    staticText: {
        fontFamily: 'Avenir-Heavy',
        fontSize: scaling.moderateScale(14),
        fontWeight: '500',
        color: colour.darkGrey
    },
    price: {
        fontFamily: 'Avenir-Heavy',
        fontSize: scaling.moderateScale(14),
        fontWeight: '500',
        color: colour.grey
    },
    grandPrice: {
        fontFamily: 'Avenir-Heavy',
        fontSize: scaling.moderateScale(14),
        fontWeight: '500',
        color: colour.red
    },
    reOrderButton: {
        flex: -1,
        height: height * 0.1,
        backgroundColor: colour.red,
        borderColor: colour.white,
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    processButton: {
        flex: -1,
        height: height * 0.1,
        backgroundColor: colour.white,
        borderColor: colour.orange,
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reOrderText: {
        fontFamily: 'Avenir-Heavy',
        fontSize: scaling.moderateScale(14),
        fontWeight: '500',
        color: colour.white
    },
    processText: {
        fontFamily: 'Avenir-Heavy',
        fontSize: scaling.moderateScale(14),
        fontWeight: '500',
        color: colour.orange
    },
}

export default styles;