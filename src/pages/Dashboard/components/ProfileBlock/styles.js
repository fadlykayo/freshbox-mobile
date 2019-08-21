import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const style = {
  container: {
    flex: 1,
    jsutifyContent: 'flex-end'
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
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'pink',
      position: 'absolute',
      right: 20,
      top: 10,
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 20,
    }
  }
}

export default style