import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container: {
		flex: -1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth : 1,
		borderColor: colour.mediumGrey,
		backgroundColor: colour.white,
		paddingVertical: width * 0.1,
		paddingRight: width * 0.05,
		marginLeft: width * 0.05,
	},
}

export default styles;