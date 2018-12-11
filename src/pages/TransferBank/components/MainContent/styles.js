import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles'

const { width } = Dimensions.get('window')

const styles = {
    component: {
        flex: 1,
        flexDirection: 'row',
        height: width * 0.14,
        alignItems: 'center',
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
    },
    bankLogo: {
        height: scaling.moderateScale(28),
        width: scaling.moderateScale(79),
        marginRight: scaling.moderateScale(10),
    },
    staticText: {
        fontFamily: 'Avenir-Medium',
        fontSize: scaling.moderateScale(12),
        color: colour.darkGrey
    },
    imagePlace: {
        position: 'absolute',
        right: 0,
        marginRight: width * 0.05,
    },
    logo: {
        height: scaling.moderateScale(10),
        width: scaling.moderateScale(10)
    },
    contentPlace: {
        marginTop: scaling.moderateScale(5),
    },
}

export default styles;