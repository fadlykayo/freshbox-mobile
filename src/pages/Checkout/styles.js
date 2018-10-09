import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container:{
		backgroundColor: colour.veryLightGrey,
		flex: 1,
		marginTop: width * 0.02,
		marginBottom: width * 0.02,
	},
	content:{
        justifyContent: 'center',
	},
	topComponent: {
		flex: 2,
		backgroundColor: colour.white,
		padding: width * 0.05,
		borderBottomColor: colour.lightGrey,
		borderBottomWidth: 1,
	},
	bottomComponent: {
		flex: 1,
		backgroundColor: colour.white,
		padding: width * 0.05,
		justifyContent: 'center',
		alignItems: 'center',
	},
	datePlace: {
		width: width * 0.9,
		height: width * 0.1,
		justifyContent: 'center',
		borderBottomColor: colour.lightGrey,
		borderBottomWidth: 1,
		paddingLeft: width* 0.02,
	},
	dateImage: {
		position: 'absolute',
		right: 0,
		marginRight: width* 0.03,
	},
	textLabelPlace: {
		width: width * 0.9,
		paddingLeft: width* 0.02,
	},
	textLabel: {
		fontFamily: 'Avenir-Heavy',
		fontWeight: '500',
		fontSize: scaling.moderateScale(11),
		color: colour.grey,
		marginBottom: scaling.moderateScale(5),
		
	},
	textDate: {
		fontFamily: 'Avenir-Book',
		fontWeight: '400',
		fontSize: scaling.moderateScale(14),
		color: colour.lightGrey
	},
	date: {
		color: colour.darkGrey
	},
	logo: {
		height: scaling.moderateScale(15),
		width: scaling.moderateScale(15) 
	},
	staticText: {
		fontFamily: 'Avenir-Heavy',
		fontWeight: '500',
		fontSize: scaling.moderateScale(12),
		color: colour.grey,
		marginBottom: scaling.moderateScale(10),
	},
	addressText: {
		fontFamily: 'Avenir-Book',
		fontSize: scaling.moderateScale(12),
		fontWeight: '400',
		color: colour.darkGrey,
		marginBottom: scaling.moderateScale(10),
	},
	nameAddressText: {
		color: colour.grey
	},
	buttonOtherAddress: {
		marginTop: scaling.moderateScale(10),
		width: width * 0.9,
		height: width * 0.12,
		borderColor: colour.red,
		borderWidth: 1,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: scaling.moderateScale(6),
	},
	otherAddressText: {
		color: colour.red
	}
}

export default styles;