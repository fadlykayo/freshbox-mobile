import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width } = Dimensions.get('window');

const styles = {
    container: {
		alignItems: 'center',
		justifyContent: 'center',
		height: scaling.moderateScale(50),
		width: width * 0.9,
		borderWidth: 1,
		borderRadius: scaling.moderateScale(8),
		borderColor: colour.white,
		backgroundColor: colour.red,
		paddingLeft: width * 0.05,
		paddingRight: width * 0.05,
    },
    staticText: {
		fontFamily: 'Avenir-Black',
        fontSize: scaling.moderateScale(14),
        color: colour.white
    },
}

export default styles;