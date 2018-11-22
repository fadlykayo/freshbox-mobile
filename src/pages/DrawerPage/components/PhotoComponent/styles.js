import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');


const styles = {
    container: {
		flex: -1,
      	height: height * 0.28,
      	alignItems: 'center',
      	paddingHorizontal: width * 0.05,
      	flexDirection: 'row',
	},
    photo: {
        real: {
			height: width * 0.2,
        	width: width * 0.2,
        	borderRadius: 200,
        	marginRight: width * 0.05,
		},
		dummy: {
			height: width * 0.2,
        	width: width * 0.2,
        	marginRight: width* 0.05,
		}
	},
	user: {
		name: {
			fontFamily: 'Avenir-Black',
			fontSize: scaling.moderateScale(14),
			color: colour.darkGrey,
			marginBottom: scaling.moderateScale(3),
		},
		email: {
			fontFamily: 'Avenir-Medium',
			fontSize: scaling.moderateScale(12),
			color: colour.darkGrey
		}
	},
	text: {
		place: {
			flex: 1,
		}
	},
    
};

export default styles