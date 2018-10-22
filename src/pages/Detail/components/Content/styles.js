import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    contentContainer: {
      	flex: 3,
    },
    fontTitle: {
		fontFamily: 'Avenir-Light',
		fontWeight: 'bold',
		fontSize: scaling.moderateScale(14),
		marginBottom: scaling.moderateScale(3),
    },
    fontCategory: {
		fontFamily: 'Avenir-Light',
		fontSize: scaling.moderateScale(11),
		color: colour.lightGrey,
		marginBottom: scaling.moderateScale(5),
    },
    fontPrice: {
		fontFamily: 'Avenir-Light',
		fontSize: scaling.moderateScale(11),
		color: colour.lightGrey,
		marginBottom: scaling.moderateScale(5),
    },
    fontPack: {
		fontFamily: 'Avenir-Light',
		fontSize: scaling.moderateScale(11),
		fontWeight: 'normal',
		color: colour.lightGrey,
		marginBottom: scaling.moderateScale(5),
	},
}

export default styles;