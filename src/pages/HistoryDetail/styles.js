import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
    },
    topComponent: {
        flex: 1,
        height: height * 0.5,
        backgroundColor: colour.veryLightGrey,
        padding: width * 0.05,
    },
    middleComponent: {
        flex: -1,
        backgroundColor: colour.orange
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
    bottomComponent: {
        flex: 1,
        height: height * 0.3,
        backgroundColor: colour.grey
    }
}

export default styles;