import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width } = Dimensions.get('window');

const styles = {
	container:{
		paddingTop: scaling.moderateScale(5),
		paddingHorizontal: width * 0.05,
		backgroundColor: colour.softRedTransparent
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