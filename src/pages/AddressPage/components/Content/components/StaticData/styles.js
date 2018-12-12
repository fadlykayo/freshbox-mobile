import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container:{
		backgroundColor: colour.white,
		flex: 1,
		paddingTop: height * 0.05,
		paddingHorizontal: scaling.moderateScale(30),
		marginBottom: height * 0.05,
	},
}

export default styles;