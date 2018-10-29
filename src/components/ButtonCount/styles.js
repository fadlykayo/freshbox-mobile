import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container:{
		base:{
			position: 'absolute',
			right: 0,
			bottom: 0,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			borderWidth: 1,
			borderRadius: 100,
			marginRight: scaling.moderateScale(10),
			marginBottom: scaling.moderateScale(10),
		},
		add:{
			backgroundColor: colour.red,
			borderColor: colour.white,
			paddingHorizontal: scaling.moderateScale(15),
			paddingVertical: scaling.moderateScale(5),
		},
		counter:{
			backgroundColor: colour.white,
			borderColor: colour.lightGrey,
		}
	},
	subcontainer:{
		button:{
			paddingHorizontal: scaling.moderateScale(15),
			paddingVertical: scaling.moderateScale(5),
		}
	},
	text:{
		add:{
			fontFamily: 'Avenir-Medium',
			fontSize: scaling.moderateScale(12),
			color: colour.white,
		},
		counter:{
			fontFamily: 'Avenir-Medium',
			fontSize: scaling.moderateScale(12),
			color: colour.darkGrey,
		},
		button:{
			fontFamily: 'Avenir-Medium',
			fontSize: scaling.moderateScale(14),
			color: colour.red,
		}
	},
}

export default styles;