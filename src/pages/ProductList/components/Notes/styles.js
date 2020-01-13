import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width } = Dimensions.get('window');

const styles = {
	container:{
		// position: 'absolute',
		marginHorizontal: 20,
		marginTop: 10,
		paddingVertical: scaling.moderateScale(10),
		paddingHorizontal: scaling.moderateScale(15),
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
			marginLeft: scaling.moderateScale(10)
		}
	}
}

export default styles;