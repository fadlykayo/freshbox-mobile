import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width } = Dimensions.get('window');

const styles = {
	container:{
		marginTop: scaling.moderateScale(2),
		paddingHorizontal: width * 0.05,
		backgroundColor: colour.softRedTransparent,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text:{
		notes:{
			fontFamily: 'Avenir-Book',
			fontSize: scaling.moderateScale(11),
			color: colour.red,
		}
	}
}

export default styles;