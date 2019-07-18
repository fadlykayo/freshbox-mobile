import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width } = Dimensions.get('window');

const styles = {
	container:{
		margin: scaling.moderateScale(10),
		paddingHorizontal: width * 0.05,
		paddingVertical: scaling.moderateScale(5),
		backgroundColor: colour.softRedTransparent,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		borderRadius: 5,
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