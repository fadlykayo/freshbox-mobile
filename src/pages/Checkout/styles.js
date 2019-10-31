import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container:{
		flex: 1,
		marginVertical: width * 0.02,
		backgroundColor: colour.backgroundLightGrey,
		// paddingHorizontal: scaling.moderateScale(30),
	},
	subcontainer:{
		label:{
			width: width * 0.9,
		},
		bottom:{
			height: 120,
			backgroundColor: colour.white,
			paddingTop: scaling.moderateScale(5),
			paddingHorizontal: scaling.moderateScale(30),
		},
		buttonDate:{
			height: width * 0.1,
			justifyContent: 'center',
			// borderBottomColor: colour.mediumGrey,
			// borderBottomWidth: 1,
		},
		icon:{
			position: 'absolute',
			right: 0,
		},
		voucher: {
			container: {
				paddingTop: scaling.moderateScale(5),
				// flexDirection: 'row',
				paddingHorizontal: scaling.moderateScale(30),
				backgroundColor: colour.white,
			},
			buttonRight: {
				position: 'absolute',
				right: 0,
			}
		},
		totalprice: {
			marginTop:10,
		},
		paymentMethod: {
			// marginTop:10,
			backgroundColor: colour.backgroundLightGrey,
			// padding: 20
			paddingTop: 10,
			paddingBottom: 20,
		},
		paymentText: {
			paddingTop: 20,
			paddingHorizontal: scaling.moderateScale(10),
			backgroundColor: colour.white,
		}
	},
	paymentText: {
		fontFamily: 'Avenir-Heavy',
		fontSize: scaling.moderateScale(12),
		color: colour.grey,
		paddingLeft: scaling.moderateScale(20)
	},
	text:{
		label:{
			fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(12),
			color: colour.grey,
			marginBottom: scaling.moderateScale(5),
		},
		date:{
			fontFamily: 'Avenir-Book',
			fontSize: scaling.moderateScale(13),
			color: '#9A9A9A'
		},
		dateChoosen:{
			fontFamily: 'Avenir-Book',
			fontSize: scaling.moderateScale(13),
			color: '#515151'
		},
		confirmDate: {
			fontFamily: 'Avenir-Medium',
			fontSize: scaling.moderateScale(11),
			color: '#9A9A9A'
		},
		confirmPerson: {
			marginTop: 5,
			fontFamily: 'Avenir-Medium',
			fontSize: scaling.moderateScale(11),
			color: '#9A9A9A'
		},
		methods: {
			fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(13),
			color: colour.darkGrey,
			fontWeight: 'bold',
    },
    codText: {
        fontFamily: 'Avenir-Roman',
        fontSize: scaling.moderateScale(10),
        color: '#9A9A9A'
    }
	},
	icon:{
		height: scaling.moderateScale(12),
		width: scaling.moderateScale(12),
	},
	bank: {
		bca: {
			height: scaling.moderateScale(20),
			width: scaling.moderateScale(61),
			// backgroundColor: 'blue', 
			marginRight: 10,
		},
		mandiri: {
			height: scaling.moderateScale(34),
			width: scaling.moderateScale(51),
			// backgroundColor: 'blue', 
			marginRight: 10,
		},
		bri: {
			height: scaling.moderateScale(20),
			width: scaling.moderateScale(20),
			// backgroundColor: 'blue', 
			marginRight: 10,
		},
		gopay: {
			height: scaling.moderateScale(20),
			width: scaling.moderateScale(70),
			// backgroundColor: 'blue', 
			// marginRight: 10,
			marginRight: 5
		},
		visa: {
			height: scaling.moderateScale(20),
			width: scaling.moderateScale(49),
			// backgroundColor: 'blue', 
			marginRight: 10,
		},
		master: {
			height: scaling.moderateScale(25),
			width: scaling.moderateScale(55),
			// backgroundColor: 'blue', 
			marginRight: 10,
		},
	},
	radioContainer: {
        width: width,
        flex: -1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
				paddingVertical: scaling.moderateScale(20),
				paddingHorizontal: scaling.moderateScale(30),
				backgroundColor: colour.white,
				// borderBottomWidth: 1,
    },
    radioOuter: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colour.red,
    },
    radioInner: (status) => ({
        height: 12,
        width: 12,
        borderRadius: 5,
        backgroundColor: status ? colour.red  : 'white'
    }),

}

export default styles;