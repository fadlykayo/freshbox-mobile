import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    contentContainer: {
      	flex: 3,
    },
    fontTitle: {
		fontFamily: 'Avenir-Heavy',
		fontWeight: '500',
		fontSize: scaling.moderateScale(14),
		marginBottom: scaling.moderateScale(3),
    },
    fontCategory: {
		fontFamily: 'Avenir-Roman',
		fontSize: scaling.moderateScale(10),
		color: colour.lightGrey,
		marginBottom: scaling.moderateScale(5),
    },
    fontPrice: {
		fontFamily: 'Avenir-Heavy',
		fontSize: scaling.moderateScale(12),
		color: colour.lightGrey,
		marginBottom: scaling.moderateScale(5),
    },
    fontPack: {
		fontFamily: 'Avenir-Roman',
		fontSize: scaling.moderateScale(10),
		fontWeight: 'normal',
		color: colour.lightGrey,
		marginBottom: scaling.moderateScale(5),
	},
	fontDescription: {
		fontFamily: 'Avenir-Roman',
		fontSize: scaling.moderateScale(11),
		color: colour.lightGrey,
		marginBottom: scaling.moderateScale(5),
	}
}

export default styles;