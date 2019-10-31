import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container: (dashboard) => ({
		flex: 1,
		flexDirection: 'row',
		height: scaling.moderateScale(50),
		maxHeight: scaling.moderateScale(50),
		alignItems: 'center',
		justifyContent: 'flex-end',
		backgroundColor: dashboard ? colour.white : colour.red,
		paddingRight: width * 0.05,
	}),
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
		search: {
			width: scaling.moderateScale(14),
			height: scaling.moderateScale(14),
			marginRight: scaling.moderateScale(15),
		},
		menu: {
			width: scaling.moderateScale(16),
			height: scaling.moderateScale(14),
		},
		clear: {
			width: scaling.moderateScale(20),
			height: scaling.moderateScale(20),
		}
	},
	clear: {
		place: {
			width: scaling.moderateScale(25),
			height: scaling.moderateScale(25),
			justifyContent: 'center',
			alignItems: 'center'
		},
	},
	title:{
		fontFamily: 'Avenir-Heavy',
		fontSize: scaling.moderateScale(16),
		color: colour.darkGrey,
	},
	subcontainer: {
		search: (dashboard) => ({
			backgroundColor: dashboard ? colour.mediumLightGrey : colour.white,
			width: width * 0.8,
			height: scaling.moderateScale(35),
			borderRadius: 100,
			alignItems: 'center',
			flexDirection: 'row',
			paddingLeft: scaling.moderateScale(15),
		}),
	},
	textinput: {
		fontFamily: 'Avenir-Book',
		fontSize: scaling.moderateScale(14),
		width: width * 0.58,
		color: colour.darkGrey,
		paddingHorizontal: 0,
    	paddingVertical: scaling.moderateScale(8),
	}
}

export default styles;