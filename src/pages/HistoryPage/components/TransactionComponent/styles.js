import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: height * 0.2,
		borderBottomWidth : 0.5,
		borderColor: colour.lightGrey,
		backgroundColor: colour.white,
		paddingTop: width * 0.05,
		paddingBottom: width * 0.05,
		paddingRight: width * 0.05,
		marginLeft: width * 0.05,
	},
}

export default styles;