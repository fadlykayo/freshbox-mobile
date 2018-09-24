import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
    },
    middleComponent: {
        flex: -1,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
    },
    eachContainer: {
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
	},
}

export default styles;