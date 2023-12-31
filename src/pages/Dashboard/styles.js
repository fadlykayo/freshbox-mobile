import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const style = {
  content: {
    flex: 1,
    borderRadius: 100
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
  }
}

export default style;