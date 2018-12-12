import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles'

const { height, width } = Dimensions.get('window')

const styles = {
    component: {
        flex: 1,
        flexDirection: 'row',
        height: width * 0.115,
        backgroundColor: colour.veryLightGrey,
        alignItems: 'center',
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
    },
    staticText: {
        fontFamily: 'Avenir-Roman',
        fontSize: scaling.moderateScale(12),
        fontWeight: '500',
        color: colour.darkGrey
    },
    imagePlace: {
        position: 'absolute',
        right: 0,
        marginRight: scaling.moderateScale(10),
    },
    logo: {
        height: scaling.moderateScale(10),
        width: scaling.moderateScale(10),
        marginRight: scaling.moderateScale(10)
    },
    bankLogo: {
        height: scaling.moderateScale(28),
        width: scaling.moderateScale(79),
        marginRight: scaling.moderateScale(10),
    },
    contentPlace: {
        marginTop: scaling.moderateScale(5),
        marginBottom: scaling.moderateScale(10),
        paddingRight: width * 0.05,
    },
    contentData: {
        flex: -1,
        height: height* 0.09,
        flexDirection: 'row',
        marginBottom: scaling.moderateScale(5),
    },
    leftPart: {
        flex: -1,
        width: height * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: scaling.moderateScale(10),
    },
    circlePart: {
        height: height * 0.05,
        width: height * 0.05,
        backgroundColor: colour.lightPink,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    indexContent: {
        color: colour.red,
        fontFamily: 'Avenir-Roman',
        fontSize: scaling.moderateScale(14),
    },
    rightPart: {
        flex: 1,
        justifyContent: 'center',
    },
    contentText: {
        color: colour.veryDarkGrey,
        fontFamily: 'Avenir-Roman',
        fontSize: scaling.moderateScale(12),
        lineHeight: scaling.moderateScale(15)
    }

}

export default styles;