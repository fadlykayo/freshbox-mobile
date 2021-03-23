import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const style = {
  content: {
    flex: 1,
    borderRadius: 100
  },
  subcontainer: {
		part: (left) => ({
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			paddingHorizontal: width * 0.05,
			justifyContent: 'space-between',
			borderLeftWidth: 1,
			borderLeftColor: left ? colour.shadowRed : '',
		})
	},
  text: {
		title: {
			fontFamily: 'Avenir-Heavy',
			fontSize: scaling.moderateScale(15),
			color: colour.white,
		},
	},
  whiteBackground: {
    // flex: 1,
    backgroundColor: colour.white,
    // height: height,
    // width: width,
    // position: 'absolute',
    // bottom: 0,
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
  },
  spacer: {
    height: 0
  },
  scrollView: {
    flex: 1,
    backgroundColor: colour.white
  },
  productList: {
    outerContainer: {
      // marginVertical: 10,
      // marginHorizontal: 5,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    rowContainer: {
      flex: -1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: 15,
      // borderWidth: 1,
      justifyContent: 'space-between'
      // paddingHorizontal: scaling.moderateScale(5)
    },
    textBold: {
      fontFamily: 'Avenir-Heavy',
      fontSize: scaling.moderateScale(16),
      color: colour.darkGrey,
    },
    textBoldSmall: {
      fontFamily: 'Avenir-Heavy',
      fontSize: scaling.moderateScale(14),
      color: colour.red,
    }
  },
  modal: {
		container: {
			flex: 1, 
			backgroundColor: 'black', 
			opacity: 0.7, 
			justifyContent: 'center', 
			alignItems: 'center',
		},
		containerIcon: {
			marginHorizontal: 20,
			alignItems: 'flex-end',
			marginTop: 20,
			position: 'absolute',
			right: 0,
		},
		card: {
			backgroundColor: 'white',
			position: 'absolute',
			top: 100,
			alignItems: 'center',
			borderRadius: 10,
			marginHorizontal: scaling.moderateScale(40),
			paddingBottom: 40,
		},
		content: {
			justifyContent: 'center',
			alignItems: 'center',
			paddingHorizontal: 20,
		},
		imageWrapper: {
			alignItems: 'center',
			justifyContent: 'center',
		},
		image: {
			height: 93,
			width: 115,
			marginTop: 40,
		},
		textContainer: {
			marginTop: 20,
			paddingBottom: 20,
		},
		title: {
			fontFamily: 'Avenir-Heavy',
			fontSize: scaling.moderateScale(14),
			color: colour.red,
			marginHorizontal: 8,
			textAlign: 'left',
      marginBottom: 5
			
		},
		text: {
			fontFamily: 'Avenir-Book',
			fontSize: scaling.moderateScale(12),
			color: '#888888',
			fontWeight: '400',
			marginHorizontal: 10,
			textAlign: 'left',
			lineHeight: scaling.moderateScale(16),
		},
		textBottom: {
			fontFamily: 'Avenir-Book',
			fontSize: scaling.moderateScale(14),
			color: '#888888',
			fontWeight: '400',
			// marginTop : 100,
			marginHorizontal: 20,
			marginTop: 25,
			textAlign: 'center'
		},
		textBold: {
			fontFamily: 'Avenir-Heavy',
			fontSize: scaling.moderateScale(12),
			color: colour.darkGrey,
			fontWeight: '400',
			// marginTop : 100,
			marginHorizontal: 10,
			textAlign: 'center',
			lineHeight: scaling.moderateScale(16),
		},
		button: {
			container: {
				width: scaling.moderateScale(140),
				height: scaling.moderateScale(30),
				borderRadius: 20,
				marginTop: 10,
			},
			fontButton:  scaling.moderateScale(12)
		},
		buttonWrapper: {
			alignSelf: 'flex-end'
		}
	}
}

export default style;