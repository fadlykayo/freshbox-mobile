import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container:{
		flex: 1,
		backgroundColor: colour.veryLightGrey,
    },
  	cartContainer: {
		flex: 1,
		paddingVertical: scaling.moderateScale(10),
		paddingLeft: width * 0.05
	},
}

export default styles;