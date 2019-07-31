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
			height: 100,
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
		}
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
			color: colour.lightGrey
		},
		dateChoosen:{
			fontFamily: 'Avenir-Book',
			fontSize: scaling.moderateScale(13),
			color: colour.darkGrey
		},
		confirmDate: {
			fontFamily: 'Avenir-Medium',
			fontSize: scaling.moderateScale(11),
			color: '#E52546'
		}
	},
	icon:{
		height: scaling.moderateScale(15),
		width: scaling.moderateScale(14) 
	},
}

export default styles;