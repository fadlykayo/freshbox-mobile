import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    addressPlace: {
        height: height * 0.25,
        paddingTop: width* 0.05,
        paddingBottom: width * 0.05,
        marginLeft: width* 0.05,
        marginRight: width* 0.05,
        paddingRight: width* 0.03,
        borderBottomWidth: 1,
        borderBottomColor: colour.lightGrey,
        flexDirection: 'row',
    },
    leftPart: {
        flex: 1,
    },
    rightPart: {
        flex: -1,
        width: width * 0.2,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    iconPen: {
        position: 'absolute',
        right: 0,
        top: 0,
        paddingRight: width* 0.03,
        paddingTop: width* 0.06,
    },
    logoPen: {
        height: width* 0.04,
        width: width * 0.04
    },
    buttonSelected: {
        borderRadius: 100,
        borderWidth: 1.5,
        borderColor: colour.red,
        height: width * 0.045,
        width: width * 0.045,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerButton: {
        backgroundColor: colour.red,
        height: width* 0.025,
        width: width* 0.025,
        borderRadius: 100,
    },
    receiverText: {
		fontFamily: 'Avenir-Heavy',
		fontWeight: '500',
		fontSize: scaling.moderateScale(12),
		color: colour.darkGrey,
		marginBottom: scaling.moderateScale(7),
	},
	addressText: {
		fontFamily: 'Avenir-Book',
		fontSize: scaling.moderateScale(12),
		fontWeight: '400',
		color: colour.darkGrey,
		marginBottom: scaling.moderateScale(7),
	},
	nameAddressText: {
		color: colour.grey
    },
    priority: {
        color: colour.red,
        fontSize: scaling.moderateScale(10)
    },
}

export default styles