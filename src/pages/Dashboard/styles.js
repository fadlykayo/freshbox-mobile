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
  },
  spacer: {
    height: height * 0.02
  },
  scrollView: {
    flex: 1,
    backgroundColor: colour.red
  },
  productList: {
    outerContainer: {
      marginVertical: 10,
      marginHorizontal: 5,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      marginVertical: 10,
    },
    textBold: {
      fontFamily: 'Avenir-Heavy',
      fontSize: 17,
      color: colour.darkGrey,
    },
    textBoldSmall: {
      fontFamily: 'Avenir-Heavy',
      fontSize: 15,
      color: colour.red,
    }
  }
}

export default style;