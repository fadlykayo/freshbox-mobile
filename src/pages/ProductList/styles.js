import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container:{
		backgroundColor: colour.veryLightGrey,
		flex: 1,
		paddingTop: width * 0.01,
    },
  	cartContainer: {
		flex: 1,
		paddingTop: width * 0.02,
		paddingLeft: width * 0.05,
		paddingBottom: height * 0.08,
	},
}

export default styles;