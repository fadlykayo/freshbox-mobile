import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';
const { height, width } = Dimensions.get('window');

const style = {
  container: {
    height: height * 0.25,
    width: width,
    backgroundColor: colour.red,
  },
  user: {
    content: {
      flex: 1,
      paddingHorizontal: 15,
      paddingVertical: 20,
    },
    text: {
      fontFamily: 'Avenir-Roman',
      fontSize: 20,
      color: colour.white,
    },
    textBold: {
      fontFamily: 'Avenir-Heavy',
      fontSize: 20,
      color: colour.white,
    }
  },
  picture: {
    container: {
      width: 50,
      height: 50,
      borderRadius: 25,
      // backgroundColor: 'pink',
      position: 'absolute',
      right: 25,
      top: 10,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 25,
    }
  },
  bottom: {
    whiteRound: {
      height: height * 0.1,
      backgroundColor: colour.white,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    }
  }
}

export default style