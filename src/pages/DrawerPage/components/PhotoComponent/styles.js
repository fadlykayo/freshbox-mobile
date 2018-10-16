import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');


const styles = {
    topComponent: {
      	height: height * 0.28,
      	alignItems: 'center',
      	paddingLeft: width * 0.05,
      	paddingRight: width * 0.05,
      	flexDirection: 'row',
	},
	dummyPhoto: {
        height: width * 0.2,
        width: width * 0.2,
        marginBottom: width* 0.05,
    },
    photo: {
        height: width * 0.19,
        width: width * 0.19,
        borderRadius: 200,
        borderColor: colour.white,
        marginRight: width* 0.05,
    },
	userName: {
		fontFamily: 'Avenir-Heavy',
		fontSize: scaling.moderateScale(14),
		fontWeight: '500',
		color: colour.darkGrey,
		marginBottom: scaling.moderateScale(3),
	},
	userEmail: {
		fontFamily: 'Avenir-Book',
		fontSize: scaling.moderateScale(12),
		fontWeight: '400',
		color: colour.darkGrey
	},
    middleComponent: {
      	flex: 1,
	},
	selectedPage: {
		height: height * 0.085,
		justifyContent: 'center',
		borderLeftWidth: 5,
		borderLeftColor: colour.red,
		paddingLeft: width * 0.05,
	},
	selectedText: {
		fontFamily: 'Avenir-Book',
		fontSize: scaling.moderateScale(16),
		fontWeight: '400',
		color: colour.red
	},
	unselectedPage: {
		height: height * 0.085,
		justifyContent: 'center',
		paddingLeft: width * 0.05,
		borderLeftWidth: 5,
		borderLeftColor: colour.white,
	},
	unselectedText: {
		fontFamily: 'Avenir-Book',
		fontSize: scaling.moderateScale(16),
		fontWeight: '400',
		color: colour.darkGrey
	},
    bottomComponent: {
      	flex: -1,
      	height: height * 0.12,
		padding: width * 0.05,
		justifyContent: 'center',
	},
	logOutText: {
		fontFamily: 'Avenir-Book',
		fontSize: scaling.moderateScale(16),
		fontWeight: '400',
		color: colour.darkGrey
	},
    navItemStyle: {
     	padding: 10
    },
    navSectionStyle: {
      	backgroundColor: 'lightgrey'
    },
    sectionHeadingStyle: {
      	paddingVertical: 10,
      	paddingHorizontal: 5
    },
    footerContainer: {
      	padding: 20,
      	backgroundColor: 'lightgrey'
    }
  };

export default styles