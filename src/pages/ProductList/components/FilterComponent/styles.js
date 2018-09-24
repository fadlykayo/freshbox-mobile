import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container:{
		flex: 1,
		height: scaling.moderateScale(50),
		maxHeight: scaling.moderateScale(50),
		borderBottomWidth: 1,
		borderBottomColor: colour.white,
		backgroundColor: colour.darkRed,
	},
	partContainer: {
    	flex:1,
    	flexDirection: 'row',
    	alignItems: 'center',
  	},
  	eachContainer: {
    	flex: 1,
    	flexDirection: 'row',
    	alignItems: 'center',
    	paddingLeft: width * 0.05,
    	justifyContent: 'space-between',
    	paddingRight: width * 0.05,
  	},
  	icon:{
		width: scaling.moderateScale(15),
    	height: scaling.moderateScale(15),
	},
  	categoryText: {
    	fontFamily: 'Avenir-Heavy',
		fontSize: scaling.moderateScale(15),
    	color: colour.white
  	},
  	filterByPriceText: {
    	fontFamily: 'Avenir-Heavy',
		fontSize: scaling.moderateScale(15),
    	color: colour.white
  	}
}

export default styles;