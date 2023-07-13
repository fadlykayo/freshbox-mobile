import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container: {
		flex: 1,
		paddingHorizontal: scaling.moderateScale(30),
		marginVertical: width * 0.05,
	},
	content: {
		flex: 1,
	},
	subcontainer: {
		middle: {
		},
		bottom: {
			flex: -1,
			paddingHorizontal: scaling.moderateScale(30),
			marginBottom: width * 0.025,
		}
	},
	image: {
		width: width,
		height: (height - scaling.moderateScale(50)) / 2,
	},
	imageContainer: {
		flex: -1,
		width: width,
		height: (height - scaling.moderateScale(50)) / 2,
	}
};

export default styles;